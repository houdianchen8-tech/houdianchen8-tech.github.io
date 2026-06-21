(function () {
  const SELECTORS = {
    contactForm: "#contactForm",
    markdownBlock: ".markdown-content[data-markdown]",
    menuToggle: ".menu-toggle",
    navLink: "[data-nav]",
    projectCard: ".project-card",
    themeToggle: ".theme-toggle"
  };

  const LABELS = {
    sourceLink: "查看源码",
    projectDetail: "项目详情",
    themeToDark: "切换为深色主题",
    themeToLight: "切换为浅色主题",
    mailNote: "已整理为邮件内容，正在打开本机邮箱。"
  };

  const STORAGE_KEYS = {
    theme: "theme"
  };

  const body = document.body;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const menuButton = $(SELECTORS.menuToggle);
  const themeButton = $(SELECTORS.themeToggle);
  const contactForm = $(SELECTORS.contactForm);

  const readStorage = (key) => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  };

  const writeStorage = (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* Persistence is optional. */
    }
  };

  const isSafeMarkdownHref = (href) => {
    const value = href.trim();
    if (!value) return false;
    if (/^[a-z][a-z0-9+.-]*:/i.test(value)) {
      return /^(https?:|mailto:)/i.test(value);
    }
    return true;
  };

  const appendInlineMarkdown = (parent, text) => {
    const pattern = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`)/g;
    let lastIndex = 0;
    let match;

    while ((match = pattern.exec(text))) {
      if (match.index > lastIndex) {
        parent.append(document.createTextNode(text.slice(lastIndex, match.index)));
      }

      if (match[2]) {
        const href = match[3].trim();
        if (isSafeMarkdownHref(href)) {
          const link = document.createElement("a");
          link.textContent = match[2];
          link.href = href;
          if (/^https?:/i.test(href)) {
            link.target = "_blank";
            link.rel = "noreferrer";
          }
          parent.append(link);
        } else {
          parent.append(document.createTextNode(match[2]));
        }
      } else if (match[4]) {
        const strong = document.createElement("strong");
        strong.textContent = match[4];
        parent.append(strong);
      } else {
        const code = document.createElement("code");
        code.textContent = match[5];
        parent.append(code);
      }

      lastIndex = pattern.lastIndex;
    }

    if (lastIndex < text.length) {
      parent.append(document.createTextNode(text.slice(lastIndex)));
    }
  };

  const renderMarkdown = (markdown) => {
    const fragment = document.createDocumentFragment();
    const lines = markdown.replace(/\r\n?/g, "\n").split("\n");
    let paragraph = [];
    let list = null;

    const flushParagraph = () => {
      if (!paragraph.length) return;
      const p = document.createElement("p");
      appendInlineMarkdown(p, paragraph.join(" ").trim());
      fragment.append(p);
      paragraph = [];
    };

    const flushList = () => {
      if (!list) return;
      fragment.append(list);
      list = null;
    };

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) {
        flushParagraph();
        flushList();
        continue;
      }

      const heading = /^(#{1,2})\s+(.+)$/.exec(trimmed);
      if (heading) {
        flushParagraph();
        flushList();
        const title = document.createElement(`h${heading[1].length}`);
        appendInlineMarkdown(title, heading[2]);
        fragment.append(title);
        continue;
      }

      const unorderedItem = /^[-*]\s+(.+)$/.exec(trimmed);
      if (unorderedItem) {
        flushParagraph();
        if (!list || list.tagName !== "UL") {
          flushList();
          list = document.createElement("ul");
          list.className = "check-list";
        }
        const li = document.createElement("li");
        appendInlineMarkdown(li, unorderedItem[1]);
        list.append(li);
        continue;
      }

      paragraph.push(trimmed);
    }

    flushParagraph();
    flushList();
    return fragment;
  };

  const getMarkdownSource = (block) => {
    const template = $('template[type="text/markdown"], script[type="text/markdown"]', block);
    return template?.content?.textContent || template?.textContent || block.dataset.markdown || "";
  };

  const renderMarkdownBlocks = () => {
    $$(SELECTORS.markdownBlock).forEach((block) => {
      if (block.dataset.rendered === "true") return;

      const source = getMarkdownSource(block);
      if (!source.trim()) {
        block.classList.add("is-plain-text");
        block.dataset.rendered = "true";
        return;
      }

      block.replaceChildren(renderMarkdown(source));
      block.dataset.rendered = "true";
    });
  };

  const setMenu = (isOpen) => {
    body.classList.toggle("nav-open", isOpen);
    menuButton?.setAttribute("aria-expanded", String(isOpen));
  };

  const normalizeTheme = (theme) => (theme === "light" ? "light" : "dark");

  const setTheme = (theme) => {
    const nextTheme = normalizeTheme(theme);
    const isLight = nextTheme === "light";
    body.classList.toggle("light", isLight);
    themeButton?.setAttribute("aria-pressed", String(isLight));
    themeButton?.setAttribute("aria-label", isLight ? LABELS.themeToDark : LABELS.themeToLight);
  };

  const activateNavigation = () => {
    const currentPage = body.dataset.page;
    $$(SELECTORS.navLink).forEach((link) => {
      const isCurrent = link.dataset.nav === currentPage;
      link.classList.toggle("active", isCurrent);
      if (isCurrent) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  const getCardTarget = (card) => {
    const links = $$(".card-actions a[href], .card-foot a[href]", card);
    return links.find((link) => link.getAttribute("aria-label") !== LABELS.sourceLink);
  };

  const setupCards = () => {
    $$(SELECTORS.projectCard).forEach((card) => {
      const target = getCardTarget(card);
      const href = target?.getAttribute("href");
      if (!href || href === "#") return;

      const title = $("h3", card)?.textContent.replace(/\s+/g, " ").trim() || LABELS.projectDetail;
      card.classList.add("is-clickable");
      card.dataset.href = href;
      card.setAttribute("role", "link");
      card.setAttribute("tabindex", "0");
      card.setAttribute("aria-label", `${title}，查看详情`);
    });
  };

  const openCard = (card) => {
    const href = card?.dataset.href;
    if (href) {
      window.location.href = href;
    }
  };

  const shouldIgnoreCardTrigger = (target) => target.closest("a, button, input, select, textarea, label");

  const handleDocumentClick = (event) => {
    if (event.target.closest(SELECTORS.navLink)) {
      setMenu(false);
    }

    const card = event.target.closest(".project-card.is-clickable");
    if (!card || shouldIgnoreCardTrigger(event.target)) return;
    openCard(card);
  };

  const handleDocumentKeydown = (event) => {
    if (event.key === "Escape") {
      setMenu(false);
      return;
    }

    const card = event.target.closest(".project-card.is-clickable");
    if (!card || !["Enter", " "].includes(event.key)) return;
    event.preventDefault();
    openCard(card);
  };

  const getFormValue = (data, key) => String(data.get(key) || "").trim();

  const handleContactSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);
    const note = $(".form-note", form);
    const name = getFormValue(data, "name") || "访客";
    const email = getFormValue(data, "email");
    const topic = getFormValue(data, "topic");
    const message = getFormValue(data, "message");
    const subject = encodeURIComponent(`来自 ${name} 的合作咨询`);
    const bodyText = [
      `称呼：${name}`,
      `邮箱：${email}`,
      `方向：${topic}`,
      "",
      message
    ].join("\n");

    if (note) {
      note.textContent = LABELS.mailNote;
    }

    window.location.href = `mailto:hdc030514@163.com?subject=${subject}&body=${encodeURIComponent(bodyText)}`;
  };

  const bindEvents = () => {
    menuButton?.addEventListener("click", () => {
      setMenu(!body.classList.contains("nav-open"));
    });

    themeButton?.addEventListener("click", () => {
      const nextTheme = body.classList.contains("light") ? "dark" : "light";
      setTheme(nextTheme);
      writeStorage(STORAGE_KEYS.theme, nextTheme);
    });

    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("keydown", handleDocumentKeydown);
    contactForm?.addEventListener("submit", handleContactSubmit);
  };

  const init = () => {
    setTheme(readStorage(STORAGE_KEYS.theme));
    activateNavigation();
    renderMarkdownBlocks();
    setupCards();
    bindEvents();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
