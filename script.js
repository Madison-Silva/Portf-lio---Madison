// ===== Efeito de digitação no título =====
const typingText = document.querySelector(".typing");
const textArray = ["Desenvolvedor Frontend", "Criador de Interfaces", "Entusiasta de Tecnologia"];
let textIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textIndex].length) {
    typingText.textContent = textArray[textIndex].substring(0, charIndex + 1);
    charIndex++;
    setTimeout(type, 100);
  } else {
    setTimeout(erase, 2000);
  }
}

function erase() {
  if (charIndex > 0) {
    typingText.textContent = textArray[textIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, 50);
  } else {
    textIndex = (textIndex + 1) % textArray.length;
    setTimeout(type, 500);
  }
}

document.addEventListener("DOMContentLoaded", type);
