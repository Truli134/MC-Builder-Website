const header = document.getElementById("siteHeader");
const year = document.getElementById("year");
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const navLinks = document.getElementById("primaryNav");

if (year) {
  year.textContent = String(new Date().getFullYear());
}

const setHeaderStyle = () => {
  if (!header) return;
  if (window.scrollY > 24) {
    header.classList.add("solid");
  } else {
    header.classList.remove("solid");
  }
};

window.addEventListener("scroll", setHeaderStyle);
setHeaderStyle();

if (mobileMenuToggle && header && navLinks) {
  const closeMobileMenu = () => {
    header.classList.remove("menu-open");
    mobileMenuToggle.setAttribute("aria-expanded", "false");
  };

  mobileMenuToggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("menu-open");
    mobileMenuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMobileMenu();
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileMenu();
    }
  });

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Node)) return;
    if (
      header.classList.contains("menu-open") &&
      !header.contains(target)
    ) {
      closeMobileMenu();
    }
  });
}

const revealElements = document.querySelectorAll("[data-reveal]");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((el) => observer.observe(el));

const filterButtons = document.querySelectorAll("[data-filter]");
const projectCards = document.querySelectorAll("[data-project-category]");
const portfolioEmptyState = document.getElementById("portfolio-empty-state");

if (filterButtons.length && projectCards.length) {
  const applyFilter = (filterValue) => {
    let visibleCount = 0;
    projectCards.forEach((card) => {
      const categories = (card.dataset.projectCategory || "")
        .split(",")
        .map((item) => item.trim());
      const showCard = filterValue === "all" || categories.includes(filterValue);
      card.classList.toggle("is-hidden", !showCard);
      if (showCard) visibleCount += 1;
    });

    if (portfolioEmptyState) {
      portfolioEmptyState.classList.toggle("visible", visibleCount === 0);
    }
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFilter = button.dataset.filter || "all";
      filterButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      applyFilter(selectedFilter);
    });
  });

  applyFilter("all");
}

const FORMSPREE_ENDPOINTS = {
  contact:
    window.MCBUILDERS_CONFIG?.formspreeEndpoints?.contact ||
    "https://formspree.io/f/your-contact-form-id",
  vendor:
    window.MCBUILDERS_CONFIG?.formspreeEndpoints?.vendor ||
    "https://formspree.io/f/your-vendor-form-id"
};

const forms = document.querySelectorAll("form[data-form-type]");

forms.forEach((form) => {
  const statusElement = form.querySelector(".form-status");
  form.addEventListener("input", () => {
    if (!statusElement) return;
    if (!form.checkValidity()) {
      statusElement.textContent = "Please complete all required fields.";
      statusElement.className = "form-status error";
      return;
    }
    statusElement.textContent = "";
    statusElement.className = "form-status";
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formType = form.dataset.formType || "";
    const endpoint = FORMSPREE_ENDPOINTS[formType];
    const submitButton = form.querySelector("button[type='submit']");

    if (!form.checkValidity()) {
      form.reportValidity();
      if (statusElement) {
        statusElement.textContent = "Please complete all required fields.";
        statusElement.className = "form-status error";
      }
      return;
    }

    if (!endpoint || endpoint.includes("your-")) {
      if (statusElement) {
        statusElement.textContent =
          "Form endpoint not configured yet. Replace the Formspree IDs in site-config.js.";
        statusElement.className = "form-status error";
      }
      return;
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form)
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      form.reset();
      if (statusElement) {
        statusElement.textContent = "Thanks! Your request has been submitted.";
        statusElement.className = "form-status success";
      }
    } catch (error) {
      if (statusElement) {
        statusElement.textContent =
          "Could not submit right now. Please try again or contact us directly.";
        statusElement.className = "form-status error";
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent =
          formType === "vendor" ? "Submit Interest" : "Submit Request";
      }
    }
  });
});
