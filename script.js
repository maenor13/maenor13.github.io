
document.addEventListener("DOMContentLoaded", () => {
  // Highlight the navigation link that corresponds to the current HTML page.
  const currentPage = document.body.dataset.page;
  document.querySelectorAll(".nav-links a").forEach(link => {
    const page = link.getAttribute("data-page");
    if (page === currentPage) link.classList.add("active");
  });

  // Reveal content progressively as the reader scrolls through the page.
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(element => observer.observe(element));

  // Display a small "back to top" control after the reader moves down the page.
  const topButton = document.querySelector(".top-link");
  if (topButton) {
    window.addEventListener("scroll", () => {
      topButton.classList.toggle("show", window.scrollY > 500);
    });
    topButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Keep external links safe when they open in a new tab.
  document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.rel = "noopener noreferrer";
  });
});
