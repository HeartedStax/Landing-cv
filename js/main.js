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
document.getElementById("formContacto").addEventListener("submit", event=>{
  event.preventDefault();
  alert("Gracias por tu mensaje, Arturo te contactara pronto!");
  event.target.reset();
});
