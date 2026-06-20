(function () {
  const page = document.body.dataset.page;
  const navLinks = document.querySelectorAll("[data-nav]");
  const menuButton = document.querySelector(".menu-toggle");
  const themeButton = document.querySelector(".theme-toggle");
  const storedTheme = localStorage.getItem("theme");

  if (storedTheme === "light") {
    document.body.classList.add("light");
  }

  navLinks.forEach((link) => {
    if (link.dataset.nav === page) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });

  menuButton?.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.remove("nav-open");
      menuButton?.setAttribute("aria-expanded", "false");
    });
  });

  themeButton?.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light");
    localStorage.setItem("theme", isLight ? "light" : "dark");
  });

  const form = document.querySelector("#contactForm");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const note = form.querySelector(".form-note");
    const data = new FormData(form);
    const subject = encodeURIComponent(`来自 ${data.get("name")} 的合作咨询`);
    const body = encodeURIComponent(
      `称呼：${data.get("name")}\n邮箱：${data.get("email")}\n方向：${data.get("topic")}\n\n${data.get("message")}`
    );
    if (note) {
      note.textContent = "已整理为邮件内容，正在打开本机邮箱。";
    }
    window.location.href = `mailto:hdc030514@163.com?subject=${subject}&body=${body}`;
  });
})();

  // 项目整张卡片可点击
  document.querySelectorAll(".project-card").forEach((card) => {
    const detailLink = card.querySelector('.card-actions a, .card-foot a[href*="-detail"], .card-foot a[href*="donation"], .card-foot a[href*="ai-assistant"]');
    if (!detailLink) return;
    card.style.cursor = "pointer";
    card.addEventListener("click", (e) => {
      if (e.target.closest("a")) return;
      const href = detailLink.getAttribute("href");
      if (href) window.location.href = href;
    });
  });


