// Platzhalter für späteren TikTok OAuth:
// Hier nur UI-Logik (Login simulieren, Generator freischalten)

const loginSection = document.getElementById("login-section");
const generatorSection = document.getElementById("generator-section");
const loginBtn = document.getElementById("tiktokLoginBtn");
const promptInput = document.getElementById("promptInput");
const sendPromptBtn = document.getElementById("sendPromptBtn");
const statusEl = document.getElementById("status");

// TODO: Trage hier deine echte n8n-Webhook-URL ein:
const N8N_WEBHOOK_URL = "https://DEIN-N8N-URL/webhook/suraflex-generator";

/**
 * Später:
 *  - window.location.href = "https://www.tiktok.com/auth/authorize?...";
 *  - und im Callback die UI freischalten.
 */
loginBtn.addEventListener("click", () => {
  // Aktuell nur Simulation:
  loginSection.classList.add("hidden");
  generatorSection.classList.remove("hidden");
});

/**
 * Prompt an dein n8n-Backend schicken
 */
sendPromptBtn.addEventListener("click", async () => {
  const prompt = promptInput.value.trim();

  if (!prompt) {
    statusEl.textContent = "Bitte gib einen Prompt ein.";
    return;
  }

  statusEl.textContent = "Prompt wird an SURAFLEX gesendet…";

  try {
    const res = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt,
        source: "suraflex-ui",
      }),
    });

    if (!res.ok) {
      throw new Error("HTTP " + res.status);
    }

    let data = null;
    try {
      data = await res.json();
    } catch (e) {
      // Falls dein n8n nur Text zurückgibt
    }

    statusEl.textContent =
      (data && (data.message || data.status)) ||
      "Prompt empfangen. Dein Loop wird generiert und veröffentlicht.";
  } catch (err) {
    console.error(err);
    statusEl.textContent =
      "Fehler beim Senden des Prompts. Bitte später erneut versuchen.";
  }
});
