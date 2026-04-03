/**
 * Cloudflare Worker – obsługa zamówień CEMBORKA przez Resend.
 *
 * Jak wdrożyć (jednorazowo, ~5 minut):
 *  1. Załóż konto na https://workers.cloudflare.com (darmowe)
 *  2. Utwórz nowy Worker (przycisk "+ Create")
 *  3. Wklej cały ten plik i kliknij "Deploy"
 *  4. Wejdź w zakładkę Settings → Variables i dodaj 2 zmienne środowiskowe:
 *       RESEND_API_KEY  →  re_xxxxxxxxxxxx       (klucz z resend.com)
 *       MAIL_TO         →  twoj@email.pl         (Twoj adres odbiorcy)
 *  5. Skopiuj URL Workera (np. https://cemborka-order.nazwauzytkownika.workers.dev)
 *  6. Wklej go w js/data.js:
 *       ORDER_FORM_CONFIG.endpoint = 'https://cemborka-order.nazwauzytkownika.workers.dev'
 *  7. Gotowe – formularz zacznie wysyłać maile przez Resend.
 *
 * Kiedy kolega skończy backend w Go:
 *  - Zmień tylko ORDER_FORM_CONFIG.endpoint na nowy URL.
 *  - Worker i reszta JS nie wymaga żadnych zmian.
 *
 * Darmowy limit Cloudflare Workers: 100 000 żądań dziennie.
 * Darmowy limit Resend: 3 000 maili miesięcznie.
 */

const ALLOWED_ORIGINS = [
  'http://127.0.0.1:5500',
  'http://localhost:5500',
  'http://127.0.0.1:8080',
  'http://localhost:8080',
  'http://192.168.0.191:5500'
];

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const corsHeaders = buildCorsHeaders(origin, ALLOWED_ORIGINS);

    // Preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405, corsHeaders);
    }

    // Parsuj payload z formularza
    let order;
    try {
      order = await request.json();
    } catch {
      return json({ error: 'Invalid JSON body' }, 400, corsHeaders);
    }

    // Walidacja podstawowych pól
    if (!order.customerName?.trim() || !order.customerEmail?.trim()) {
      return json({ error: 'Missing required fields' }, 400, corsHeaders);
    }

    // Klucz API i adres odbiorcy ze zmiennych środowiskowych Workera
    const apiKey = env.RESEND_API_KEY;
    const mailTo = env.MAIL_TO;

    if (!apiKey || !mailTo) {
      console.error('Missing env vars: RESEND_API_KEY or MAIL_TO');
      return json({ error: 'Server misconfiguration' }, 500, corsHeaders);
    }

    const emailHTML = buildEmailHTML(order);

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Adres nadawcy – musi być zweryfikowana domena w Resend.
        // Do testów możesz użyć: onboarding@resend.dev
        from: 'CEMBORKA <onboarding@resend.dev>',
        // from: 'CEMBORKA <zamowienia@cemborka.pl>',
        to: [mailTo],
        subject: `Nowe zamówienie CEMBORKA – ${order.customerName}`,
        html: emailHTML,
      }),
    });

    if (!resendResponse.ok) {
      const err = await resendResponse.json().catch(() => ({}));
      console.error('Resend error:', err);
      return json({ error: 'Failed to send email' }, 502, corsHeaders);
    }

    return json({ ok: true }, 200, corsHeaders);
  },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function buildCorsHeaders(origin, allowed) {
  // Jeśli lista allowed jest pusta – przepuszczamy wszystko (ok na etapie dewelopmentu).
  const allowOrigin = allowed.length === 0 || allowed.includes(origin)
    ? (origin || '*')
    : allowed[0];

  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
  };
}

function json(data, status, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...extraHeaders },
  });
}

function buildEmailHTML(o) {
  const itemsHTML = (o.orderItems || [])
    .map(
      (item) =>
        `<tr>
          <td style="padding:.35rem .5rem;border-bottom:1px solid #c9a98a">${item.lp}.</td>
          <td style="padding:.35rem .5rem;border-bottom:1px solid #c9a98a">${escHtml(item.modelLabel)}</td>
          <td style="padding:.35rem .5rem;border-bottom:1px solid #c9a98a;text-align:center">${item.quantity} szt.</td>
        </tr>`
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="pl">
<head><meta charset="UTF-8"></head>
<body style="font-family:sans-serif;color:#321B0B;background:#FBDFCB;padding:2rem">
  <h1 style="font-size:1.5rem;font-weight:400;border-bottom:1px solid #321B0B;padding-bottom:.5rem;margin-bottom:1.5rem">
    Nowe zamówienie CEMBORKA
  </h1>

  <h2 style="font-size:1rem;font-weight:600;margin:1.5rem 0 .5rem">Dane klienta</h2>
  <p style="margin:.25rem 0"><strong>Imię i Nazwisko:</strong> ${escHtml(o.customerName)}</p>
  <p style="margin:.25rem 0"><strong>E-mail:</strong> ${escHtml(o.customerEmail)}</p>
  <p style="margin:.25rem 0"><strong>Telefon:</strong> ${escHtml(o.customerPhone)}</p>
  <p style="margin:.25rem 0"><strong>Adres / Paczkomat:</strong> ${escHtml(o.customerAddress)}</p>

  <h2 style="font-size:1rem;font-weight:600;margin:1.5rem 0 .5rem">Dostawa</h2>
  <p style="margin:.25rem 0">${escHtml(o.deliveryLabel)}</p>

  <h2 style="font-size:1rem;font-weight:600;margin:1.5rem 0 .5rem">Zamówione produkty</h2>
  <table style="border-collapse:collapse;width:100%;margin-top:.5rem">
    <thead>
      <tr>
        <th style="padding:.35rem .5rem;border-bottom:1px solid #c9a98a;text-align:left">#</th>
        <th style="padding:.35rem .5rem;border-bottom:1px solid #c9a98a;text-align:left">Model</th>
        <th style="padding:.35rem .5rem;border-bottom:1px solid #c9a98a;text-align:center">Ilość</th>
      </tr>
    </thead>
    <tbody>${itemsHTML}</tbody>
  </table>
</body>
</html>`;
}

function escHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
