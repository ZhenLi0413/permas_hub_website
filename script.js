const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section[id]");
const screenshotImages = document.querySelectorAll(".screenshot-image");

function closeMenu() {
  navToggle.classList.remove("is-open");
  navLinks.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
}

navToggle.addEventListener("click", () => {
  const isOpen = navToggle.classList.toggle("is-open");
  navLinks.classList.toggle("is-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navItems.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      navItems.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  {
    rootMargin: "-45% 0px -45% 0px",
    threshold: 0
  }
);

sections.forEach((section) => observer.observe(section));

screenshotImages.forEach((image) => {
  if (image.complete && image.naturalWidth > 0) {
    image.classList.add("is-loaded");
    return;
  }

  image.addEventListener("load", () => {
    image.classList.add("is-loaded");
  });

  image.addEventListener("error", () => {
    image.removeAttribute("src");
  });
});
