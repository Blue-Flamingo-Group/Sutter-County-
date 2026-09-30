// Measure G endorsement form.
// Receives the form on the page, sends one notification email to the campaign
// inbox via Resend, and never exposes that address to the browser.
// Environment: RESEND_API_KEY, ENDORSE_TO, ENDORSE_FROM (see README).

const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/;

function wantsJson(req) {
  var accept = String(req.headers["accept"] || "");
  var ctype = String(req.headers["content-type"] || "");
  return accept.indexOf("application/json") !== -1 || ctype.indexOf("application/json") !== -1;
}

function finish(req, res, ok, code) {
  if (wantsJson(req)) {
    res.setHeader("Cache-Control", "no-store");
    return res.status(code).json({ ok: ok });
  }
  // No-JS fallback: bounce back to the form with a status flag.
  res.setHeader("Location", "/?endorse=" + (ok ? "ok" : "error") + "#endorse");
  return res.status(303).end();
}

function field(body, key, max) {
  return String(body[key] || "").trim().slice(0, max);
}

module.exports = async function (req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end();
  }
  var body = req.body || {};
  if (typeof body === "string") { try { body = JSON.parse(body); } catch (e) { body = {}; } }

  var name = field(body, "name", 120);
  var city = field(body, "city", 120);
  var email = field(body, "email", 254);
  var phone = field(body, "phone", 40);
  var title = field(body, "title", 160);
  var why = field(body, "why", 1000);
  var consent = body.consent === "on" || body.consent === true || body.consent === "true";
  var trap = field(body, "website", 200);

  // Honeypot: real visitors never see this field. Bots fill it. Pretend success.
  if (trap) return finish(req, res, true, 200);
  if (!name || !city || !consent || !EMAIL_RE.test(email)) return finish(req, res, false, 400);

  var key = process.env.RESEND_API_KEY, to = process.env.ENDORSE_TO, from = process.env.ENDORSE_FROM;
  if (!key || !to || !from) return finish(req, res, false, 500);

  var text =
    "New Measure G endorsement.\n\n" +
    "Name: " + name + "\n" +
    "City / Community: " + city + "\n" +
    "Email: " + email + "\n" +
    (phone ? "Phone: " + phone + "\n" : "") +
    (title ? "Title / Organization: " + title + "\n" : "") +
    (why ? "\nWhy I support Measure G:\n" + why + "\n" : "") +
    "\nConsent: gave permission to be contacted about publicly listing the endorsement.\n" +
    "\nSubmitted from safesutteryesong.com on " + new Date().toISOString() + ".\n" +
    "Reply to this message to write to them directly.";

  try {
    var r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Authorization": "Bearer " + key, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: from,
        to: [to],
        reply_to: email,
        subject: "Measure G endorsement: " + name + (title ? ", " + title : "") + " (" + city + ")",
        text: text
      })
    });
    if (!r.ok) return finish(req, res, false, 502);
    return finish(req, res, true, 200);
  } catch (e) {
    return finish(req, res, false, 502);
  }
};
