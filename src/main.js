// src/main.js
// Единый JS для всех страниц: бургер-меню + подсветка активного пункта + безопасное закрытие по клику/ESC

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".nav");
  const navMenu = document.querySelector(".nav-menu");
  const burger = document.querySelector(".nav-burger");

  // Если на странице нет хедера (на всякий) — просто выходим
  if (!navMenu || !burger) return;

  // -----------------------------
  // Active link (подсветка текущей страницы)
  // -----------------------------
  setActiveNavLink(navMenu);

  // -----------------------------
  // Burger open/close
  // -----------------------------
  const OPEN_CLASS = "is-open";

  const openMenu = () => {
    navMenu.classList.add(OPEN_CLASS);
    burger.setAttribute("aria-expanded", "true");
  };

  const closeMenu = () => {
    navMenu.classList.remove(OPEN_CLASS);
    burger.setAttribute("aria-expanded", "false");
  };

  const toggleMenu = () => {
    if (navMenu.classList.contains(OPEN_CLASS)) closeMenu();
    else openMenu();
  };

  burger.addEventListener("click", (e) => {
    e.preventDefault();
    toggleMenu();
  });

  // Закрываем меню при клике по пункту
  navMenu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      closeMenu();
    });
  });

  // Закрываем при клике вне меню
  document.addEventListener("click", (e) => {
    const clickedInsideNav =
      nav.contains(e.target) || navMenu.contains(e.target) || burger.contains(e.target);

    if (!clickedInsideNav) closeMenu();
  });

  // Закрываем по ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Если повернули экран / ресайз — закрываем (чтобы не было “залипания”)
  window.addEventListener("resize", () => {
    closeMenu();
  });

  // -----------------------------
  // Helpers
  // -----------------------------
  function setActiveNavLink(menuEl) {
    // Текущий путь
    // На GitHub Pages часто путь выглядит как /repo-name/battle.html
    const path = window.location.pathname;
    const currentFile = (path.split("/").pop() || "").toLowerCase();

    // Считаем index по умолчанию
    const normalizedCurrent = currentFile === "" ? "index.html" : currentFile;

    const links = menuEl.querySelectorAll("a");
    links.forEach((link) => {
      link.classList.remove("active");

      const href = (link.getAttribute("href") || "").toLowerCase();

      // Берём только имя файла из href (battle.html, rating.html, index.html)
      const hrefFile = (href.split("/").pop() || "").split("?")[0].toLowerCase();

      // Если ссылка ведёт на index без имени файла (например "./" или "/") — тоже считаем index
      const normalizedHref =
        hrefFile === "" || hrefFile === "." ? "index.html" : hrefFile;

      if (normalizedHref === normalizedCurrent) {
        link.classList.add("active");
      }
    });
  }
});
