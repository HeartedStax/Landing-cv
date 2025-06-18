/* === Máquina de escribir en el HERO === */
const typed = ["Arturo Casas Chavarría"];
let i=0, txt="", speed=120;
function type() {
  if (i < typed[0].length){
    txt += typed[0].charAt(i);
    document.getElementById("typed-name").textContent = txt;
    i++; setTimeout(type, speed);
  }
} type();

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
document.querySelectorAll('.progress-bar').forEach(bar=>observer.observe(bar));

/* === Toggle claro/oscuro === */
const switcher = document.getElementById('themeSwitch');
switcher.addEventListener('change', e=>{
  document.documentElement.dataset.theme = e.target.checked ? 'dark' : 'light';
});

/* === Placeholder para contacto === */
document.getElementById('formContacto').addEventListener('submit', e=>{
  e.preventDefault();
  alert("¡Gracias por tu mensaje, Arturo te contactará pronto!");
  e.target.reset();
});