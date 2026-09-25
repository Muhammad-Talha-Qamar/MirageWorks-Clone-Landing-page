/* ============================================
   MIRAGE WORKS — Basic JavaScript
   Three jobs only:
   1) Mobile menu open / close
   2) Sticky header style on scroll
   3) Fade-in + number counters when you scroll
   ============================================ */

/* Wait until the page HTML is ready */
document.addEventListener("DOMContentLoaded", function () {

  /* ----- 1. Mobile menu ----- */
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");

  toggle.addEventListener("click", function () {
    var isOpen = links.classList.toggle("open");
    toggle.classList.toggle("open", isOpen);
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  // Close the menu when a link is clicked
  links.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      links.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    });
  });

  /* ----- 2. Header background after scroll ----- */
  var header = document.querySelector(".site-header");

  function updateHeader() {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  updateHeader();
  window.addEventListener("scroll", updateHeader);

  /* ----- 3. Reveal sections when they enter the screen ----- */
  var revealItems = document.querySelectorAll(".reveal");

  // IntersectionObserver watches elements as you scroll
  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach(function (item) {
    // Hero items already animate via CSS on load
    if (!item.closest(".hero")) {
      revealObserver.observe(item);
    } else {
      item.classList.add("visible");
    }
  });

  /* ----- 4. Count-up for the stats numbers ----- */
  var stats = document.querySelectorAll(".stat-number");
  var statsDone = false;

  function animateCount(el) {
    var target = Number(el.getAttribute("data-target"));
    var duration = 1400; // milliseconds
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutQuad — starts fast, ends smooth
      var eased = 1 - (1 - progress) * (1 - progress);
      el.textContent = Math.floor(eased * target);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(step);
  }

  var statsSection = document.querySelector(".stats");

  if (statsSection) {
    var statsObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !statsDone) {
            statsDone = true;
            stats.forEach(animateCount);
            statsObserver.unobserve(statsSection);
          }
        });
      },
      { threshold: 0.4 }
    );

    statsObserver.observe(statsSection);
  }

});
