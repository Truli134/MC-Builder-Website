const NAV_ITEMS = [
  { key: "home", label: "Home", href: "./index.html" },
  { key: "our-story", label: "Our Story", href: "./our-story.html" },
  { key: "services", label: "Services", href: "./services.html" },
  { key: "portfolio", label: "Portfolio", href: "./portfolio.html" },
  { key: "vendor-portal", label: "Vendor Portal", href: "./vendor-portal.html" },
  { key: "contact", label: "Contact", href: "./contact.html" }
];

const getHeaderMarkup = (activePage) => `
  <header class="site-header" id="siteHeader">
    <div class="container header-inner">
      <a class="logo" href="./index.html" aria-label="MC Builders home">
        <img
          class="logo-img"
          src="./mc-logo.png"
          alt=""
          width="40"
          height="40"
          decoding="async"
        />
        <span class="logo-text">Builders, Inc.</span>
      </a>
      <button
        class="mobile-menu-toggle"
        id="mobileMenuToggle"
        type="button"
        aria-expanded="false"
        aria-controls="primaryNav"
        aria-label="Toggle navigation menu"
      >
        <span></span><span></span><span></span>
      </button>
      <nav aria-label="Primary">
        <ul class="nav-links" id="primaryNav">
          ${NAV_ITEMS.map(
            (item) =>
              `<li><a class="${item.key === activePage ? "active" : ""}" href="${item.href}">${item.label}</a></li>`
          ).join("")}
        </ul>
      </nav>
    </div>
  </header>
`;

const getFooterMarkup = () => `
  <footer class="site-footer">
    <div class="container footer-grid">
      <div>
        <p class="footer-logo">
          <img class="footer-logo-img" src="./mc-logo.png" alt="" width="36" height="36" decoding="async" />
          <span>MC Builders, Inc.</span>
        </p>
        <p>#BuildingTogether</p>
        <p>Est. 2021 · CSLB No. 1089787</p>
      </div>
      <div>
        <p><strong>Navigation</strong></p>
        <p>
          <a href="./index.html">Home</a> ·
          <a href="./our-story.html">Our Story</a> ·
          <a href="./services.html">Services</a> ·
          <a href="./portfolio.html">Portfolio</a> ·
          <a href="./vendor-portal.html">Vendor Portal</a> ·
          <a href="./contact.html">Contact</a>
        </p>
        <p>
          <a href="./privacy.html">Privacy Policy</a> ·
          <a href="./terms.html">Terms of Use</a>
        </p>
      </div>
      <div>
        <p><strong>Contact</strong></p>
        <p><a href="tel:+19098688853">909-868-8853</a></p>
        <p><a href="mailto:contact@mcbuildersinc.net">contact@mcbuildersinc.net</a></p>
        <p><a href="https://www.instagram.com/mc.builders.inc/" target="_blank" rel="noopener noreferrer">Instagram: @mc.builders.inc</a></p>
      </div>
    </div>
    <div class="container footer-bottom">
      <p>© <span id="year"></span> MC Builders, Inc. All rights reserved.</p>
    </div>
  </footer>
`;

const page = document.body.dataset.page || "";
const headerMount = document.getElementById("site-header");
const footerMount = document.getElementById("site-footer");

if (headerMount) {
  headerMount.innerHTML = getHeaderMarkup(page);
}

if (footerMount) {
  footerMount.innerHTML = getFooterMarkup();
}
