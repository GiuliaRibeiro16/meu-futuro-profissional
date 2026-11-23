// 1) Tema claro/escuro (lembra a escolha do visitante)
const raiz = document.documentElement;
const temaBtn = document.getElementById("temaBtn");

function aplicarTema(tema) {
  raiz.setAttribute("data-tema", tema);
  temaBtn.textContent = tema === "escuro" ? "Tema claro" : "Tema escuro";
  try { localStorage.setItem("tema", tema); } catch (e) {}
}
let salvo = null;
try { salvo = localStorage.getItem("tema"); } catch (e) {}
aplicarTema(salvo || "claro");
temaBtn.addEventListener("click", () => {
  aplicarTema(raiz.getAttribute("data-tema") === "escuro" ? "claro" : "escuro");
});

// 2) Menu no celular
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
menuBtn.addEventListener("click", () => {
  const aberto = menu.classList.toggle("aberto");
  menuBtn.setAttribute("aria-expanded", aberto);
});
menu.querySelectorAll("a").forEach(link =>
  link.addEventListener("click", () => {
    menu.classList.remove("aberto");
    menuBtn.setAttribute("aria-expanded", "false");
  })
);

// 3) Linha do tempo interativa
document.querySelectorAll(".etapa").forEach(botao => {
  botao.addEventListener("click", () => {
    const texto = botao.nextElementSibling;
    const aberto = texto.classList.toggle("aberto");
    botao.setAttribute("aria-expanded", aberto);
  });
});

// 4) Metas com barra de progresso
const caixas = document.querySelectorAll(".metas input");
const barra = document.getElementById("barra");
const preenchida = document.getElementById("barraPreenchida");
const textoProgresso = document.getElementById("progressoTexto");

function atualizarProgresso() {
  const feitas = document.querySelectorAll(".metas input:checked").length;
  const pct = Math.round((feitas / caixas.length) * 100);
  preenchida.style.width = pct + "%";
  barra.setAttribute("aria-valuenow", pct);
  textoProgresso.textContent = feitas + " de " + caixas.length + " metas concluídas";
}
caixas.forEach(c => c.addEventListener("change", atualizarProgresso));
