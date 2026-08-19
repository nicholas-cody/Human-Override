const CONFIG = {
  // Paste a Stripe Payment Link here when ready.
  donationUrl: ""
};

document.getElementById("year").textContent = new Date().getFullYear();

const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

menuButton.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});

navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

window.addEventListener("scroll", () => {
  const doc = document.documentElement;
  const max = doc.scrollHeight - doc.clientHeight;
  document.getElementById("progress").style.width = `${max > 0 ? (doc.scrollTop / max) * 100 : 0}%`;
}, { passive: true });

const signupForm = document.getElementById("signupForm");
const formStatus = document.getElementById("formStatus");

signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const submit = signupForm.querySelector("button[type=submit]");
  const email = signupForm.email.value.trim();

  submit.disabled = true;
  formStatus.className = "form-status";
  formStatus.textContent = "Adding your email…";

  try {
    const response = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || "Unable to subscribe right now.");
    formStatus.className = "form-status success";
    formStatus.textContent = data.message || "You're on the list. Thank you for adding your voice.";
    signupForm.reset();
  } catch (error) {
    formStatus.className = "form-status error";
    formStatus.textContent = "Mailing-list storage is not connected yet. Follow README.md to activate it on Cloudflare.";
  } finally {
    submit.disabled = false;
  }
});

const donationButton = document.getElementById("donationButton");
const donationNote = document.getElementById("donationNote");

if (CONFIG.donationUrl) {
  donationButton.href = CONFIG.donationUrl;
  donationButton.target = "_blank";
  donationNote.textContent = "Secure donation checkout opens in a new window.";
} else {
  donationButton.addEventListener("click", e => e.preventDefault());
}
