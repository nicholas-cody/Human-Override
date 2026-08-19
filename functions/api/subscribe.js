export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const email = String(body?.email || "").trim().toLowerCase();

    if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email) || email.length > 254) {
      return json({ error: "Please enter a valid email address." }, 400);
    }

    if (!context.env.DB) {
      return json({ error: "Mailing-list database is not configured." }, 503);
    }

    await context.env.DB.prepare(`
      INSERT INTO subscribers (email, created_at, status)
      VALUES (?, datetime('now'), 'active')
      ON CONFLICT(email) DO UPDATE SET status='active'
    `).bind(email).run();

    return json({
      ok: true,
      message: "You're on the list. Thank you for adding your voice."
    }, 200);
  } catch {
    return json({ error: "Unable to subscribe right now." }, 500);
  }
}

export function onRequestGet() {
  return json({ ok: true, endpoint: "Human Override mailing-list signup" }, 200);
}

function json(data, status) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff"
    }
  });
}
