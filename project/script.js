document.addEventListener("DOMContentLoaded", () => {
  const pictures = document.querySelectorAll(".picture");

  // клик по карточке: открыть её, затемнить остальные и (если клик не по слову) закрыть определения внутри
  pictures.forEach(pic => {
    pic.addEventListener("click", (e) => {
      // клик по слову или по кнопке "Закрыть" не трогаем активность карточки тут
      const isTermClick = e.target.classList.contains("term-label");
      const isCloseClick = e.target.classList.contains("close-btn");
      if (isCloseClick) return; // это обработаем отдельно

      // активировать текущую карточку и затемнить остальные
      pictures.forEach(p => {
        p.classList.remove("active");
        p.classList.remove("dimmed");
      });
      pic.classList.add("active");
      pictures.forEach(p => {
        if (p !== pic) p.classList.add("dimmed");
      });

      // если кликнули НЕ по слову — закрыть все определения внутри этой карточки
      if (!isTermClick) {
        pic.querySelectorAll(".term.active").forEach(t => t.classList.remove("active"));
      }
    });

    // кнопка "Закрыть" внутри карточки
    const closeBtn = pic.querySelector(".close-btn");
    if (closeBtn) {
      closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        pic.classList.remove("active");
        pictures.forEach(p => p.classList.remove("dimmed"));
        // закрыть все определения
        document.querySelectorAll(".term.active").forEach(t => t.classList.remove("active"));
      });
    }
  });

  // аккордеон для терминов: клик по слову открывает его определение
  document.querySelectorAll(".term").forEach(term => {
    const label = term.querySelector(".term-label");

    label.addEventListener("click", (e) => {
      e.stopPropagation();

      // карточка, в которой находится слово
      const parentPicture = term.closest(".picture");

      // если карточка не активна, активируем её и затемняем остальные
      if (!parentPicture.classList.contains("active")) {
        const pictures = document.querySelectorAll(".picture");
        pictures.forEach(p => {
          p.classList.remove("active");
          p.classList.remove("dimmed");
        });
        parentPicture.classList.add("active");
        pictures.forEach(p => {
          if (p !== parentPicture) p.classList.add("dimmed");
        });
      }

      // закрыть все остальные определения внутри этой карточки
      parentPicture.querySelectorAll(".term.active").forEach(t => t.classList.remove("active"));

      // открыть текущее
      term.classList.add("active");
    });
  });

  // клик вне карточек закрывает всё
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".picture")) {
      pictures.forEach(p => {
        p.classList.remove("active");
        p.classList.remove("dimmed");
      });
      document.querySelectorAll(".term.active").forEach(t => t.classList.remove("active"));
    }
  });
});
