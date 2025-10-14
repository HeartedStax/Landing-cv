/* === Maquina de escribir en el HERO === */
const typed = ["Arturo Casas Chavarria"];
let i = 0;
let txt = "";
const speed = 120;
function type(){
  if(i < typed[0].length){
    txt += typed[0].charAt(i);
    document.getElementById("typed-name").textContent = txt;
    i++;
    setTimeout(type, speed);
  }
}
type();

/* === Relleno de barras de progreso al hacer scroll === */
const observer = new IntersectionObserver(entries=>{
  entries.forEach(ent=>{
    if(ent.isIntersecting){
      const bar = ent.target;
      bar.style.width = bar.dataset.level + "%";
      observer.unobserve(bar);
    }
  });
},{threshold:0.5});
document.querySelectorAll(".progress-bar").forEach(bar=>observer.observe(bar));

/* === Toggle claro/oscuro === */
const switcher = document.getElementById("themeSwitch");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
const storedTheme = localStorage.getItem("theme");

function applyTheme(theme){
  const value = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = value;
  if(switcher){
    switcher.checked = value === "dark";
  }
}

applyTheme(storedTheme || (prefersDark.matches ? "dark" : "light"));

if(switcher){
  switcher.addEventListener("change", event=>{
    const theme = event.target.checked ? "dark" : "light";
    applyTheme(theme);
    localStorage.setItem("theme", theme);
  });
}

prefersDark.addEventListener("change", event=>{
  if(!localStorage.getItem("theme")){
    applyTheme(event.matches ? "dark" : "light");
  }
});

/* === Placeholder para contacto === */
/* === Envío de contacto con Formspree === */
(() => {
  const form = document.getElementById("formContacto");
  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]');

  // helper para mensajes (alert Bootstrap si lo usas; si no, queda texto plano)
  function showMessage(text, ok = true) {
    let box = form.querySelector(".form-msg");
    if (!box) {
      box = document.createElement("div");
      box.className = "form-msg mt-3";
      form.appendChild(box);
    }
    box.innerHTML = text;
    box.className = "form-msg mt-3 " + (ok ? "alert alert-success" : "alert alert-danger");
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // deshabilitar botón para evitar doble envío
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.dataset.prev = submitBtn.textContent;
      submitBtn.textContent = "Enviando...";
    }

    try {
      const res = await fetch(form.action, {
        method: form.method, // "POST"
        body: new FormData(form),
        headers: { "Accept": "application/json" }
      });

      // Leer respuesta por si hay errores detallados
      const raw = await res.text();
      let data = {};
      try { data = JSON.parse(raw); } catch {}

      if (res.ok) {
        showMessage("¡Mensaje enviado correctamente! Te contactaré pronto 🤝", true);
        form.reset();
      } else {
        // Mensajes comunes de Formspree (dominio, activación, validación)
        const hint = data?.errors?.map(e => e.message).join(" • ") || raw || "Error desconocido";
        showMessage("No se pudo enviar el formulario. " + hint, false);
        console.error("Formspree error:", res.status, raw);
      }
    } catch (err) {
      showMessage("Error de red. Verifica tu conexión e inténtalo de nuevo.", false);
      console.error(err);
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = submitBtn.dataset.prev || "Enviar";
      }
    }
  });
})();
