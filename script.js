document.getElementById("year").textContent = new Date().getFullYear();

// These lines mirror the REAL console output from main_server.py's /verify
// route - replace with your own actual log lines if you want it to be
// exactly what your project prints.
const lines = [
  { text: "$ python main_server.py", cls: "dim" },
  { text: "2FA APPLICATION STARTED", cls: "dim" },
  { text: "", cls: "" },
  { text: "POST /verify", cls: "dim" },
  { text: "[kushal] password_ok=True otp_ok=True face_ok=False", cls: "fail" },
  { text: "  -> Verification Failed: face didn't match", cls: "fail" },
  { text: "", cls: "" },
  { text: "POST /verify", cls: "dim" },
  { text: "[kushal] password_ok=True otp_ok=True face_ok=True", cls: "ok" },
  { text: "  -> Login Successful", cls: "ok" },
];

const el = document.getElementById("terminal-body");
let lineIndex = 0;
let charIndex = 0;

function typeNextChar() {
  if (lineIndex >= lines.length) {
    // restart the loop after a pause, so the hero stays alive on longer visits
    setTimeout(() => {
      el.innerHTML = "";
      lineIndex = 0;
      charIndex = 0;
      typeNextChar();
    }, 2500);
    return;
  }

  const current = lines[lineIndex];
  const rendered = lines
    .slice(0, lineIndex)
    .map((l) => `<span class="${l.cls}">${l.text}</span>`)
    .join("\n");

  const partial = current.text.slice(0, charIndex);
  el.innerHTML =
    rendered +
    (lineIndex > 0 ? "\n" : "") +
    `<span class="${current.cls} cursor">${partial}</span>`;

  if (charIndex < current.text.length) {
    charIndex++;
    setTimeout(typeNextChar, 18 + Math.random() * 22);
  } else {
    lineIndex++;
    charIndex = 0;
    setTimeout(typeNextChar, current.text === "" ? 120 : 350);
  }
}

typeNextChar();
