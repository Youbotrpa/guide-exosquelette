(function () {
  "use strict";

  const config = window.SITE_CONFIG || {};
  const links = window.AFFILIATE_LINKS || {};

  document.querySelectorAll("[data-site-name]").forEach((element) => {
    element.textContent = config.siteName || "Guide Exosquelette";
  });

  document.querySelectorAll("[data-affiliate-disclosure]").forEach((element) => {
    element.textContent = config.affiliateDisclosure || "";
  });

  document.querySelectorAll("[data-last-verified]").forEach((element) => {
    element.textContent = config.lastVerified || "";
  });

  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  document.querySelectorAll("[data-affiliate]").forEach((element) => {
    const key = element.getAttribute("data-affiliate");
    const url = links[key];

    if (!url) {
      element.setAttribute("aria-disabled", "true");
      element.removeAttribute("href");
      return;
    }

    element.setAttribute("href", url);
    element.setAttribute("target", "_blank");
    element.setAttribute("rel", "sponsored nofollow noopener");

    element.addEventListener("click", () => {
      const eventDetail = {
        event: "affiliate_click",
        product: element.dataset.product || key,
        merchant: element.dataset.merchant || key,
        page: document.body.dataset.page || "unknown"
      };

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(eventDetail);
      window.dispatchEvent(new CustomEvent("affiliate_click", { detail: eventDetail }));
    });
  });

  const menuButton = document.querySelector("[data-menu-button]");
  const menu = document.querySelector("[data-menu]");

  if (menuButton && menu) {
    const closeMenu = () => {
      menuButton.setAttribute("aria-expanded", "false");
      menu.hidden = true;
    };

    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      menu.hidden = isOpen;
    });

    menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
        closeMenu();
        menuButton.focus();
      }
    });

    window.addEventListener("resize", () => {
      if (window.matchMedia("(min-width: 800px)").matches) {
        menu.hidden = false;
        menuButton.setAttribute("aria-expanded", "false");
      } else if (menuButton.getAttribute("aria-expanded") !== "true") {
        menu.hidden = true;
      }
    });

    if (window.matchMedia("(max-width: 799px)").matches) {
      menu.hidden = true;
    }
  }
})();
