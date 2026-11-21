
const UNLOCK_DATE = new Date("2026-11-21T00:00:00-05:00");

const intro = document.getElementById("intro");
const gift = document.getElementById("gift");
const openGiftBtn = document.getElementById("openGiftBtn");
const lockMessage = document.getElementById("lockMessage");
const tinyNote = document.getElementById("tinyNote");
const mainContent = document.getElementById("main-content");
const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

let countdownInterval;

function updateCountdown() {
  const now = new Date();
  const remaining = UNLOCK_DATE.getTime() - now.getTime();

  if (remaining <= 0) {
    clearInterval(countdownInterval);
    document.getElementById("countdown").hidden = true;
    lockMessage.textContent = "¡Llegó el momento! Tu regalo está listo ♡";
    openGiftBtn.disabled = false;
    openGiftBtn.textContent = "ABRIR MI REGALO ♡";
    tinyNote.textContent = "Este pequeño mundo está hecho para ti.";
    return;
  }

  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((remaining / (1000 * 60)) % 60);
  const seconds = Math.floor((remaining / 1000) % 60);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

function openGift() {
  // BLOQUEO ACTIVADO: quita los // para volver a bloquear el regalo.
  // if (Date.now() < UNLOCK_DATE.getTime()) return;

  gift.classList.add("open");
  openGiftBtn.disabled = true;

  setTimeout(() => {
    intro.hidden = true;
    mainContent.hidden = false;
    musicBtn.hidden = false;
    window.scrollTo({ top: 0, behavior: "instant" });
  }, 850);
}

function toggleMusic() {
  if (music.paused) {
    music.play()
      .then(() => {
        musicBtn.textContent = "♫ PAUSAR MÚSICA";
      })
      .catch(() => {
        musicBtn.textContent = "♫ TOCA PARA ACTIVAR";
      });
  } else {
    music.pause();
    musicBtn.textContent = "♫ ACTIVAR MÚSICA";
  }
}

function toggleLetter() {
  const envelope = document.getElementById("envelope");
  const letter = document.getElementById("letter");

  envelope.classList.toggle("open");
  letter.hidden = !letter.hidden;
}

openGiftBtn.addEventListener("click", openGift);
musicBtn.addEventListener("click", toggleMusic);
document.getElementById("envelope").addEventListener("click", toggleLetter);

updateCountdown();
countdownInterval = setInterval(updateCountdown, 1000);
