$(document).ready(function () {
  // ===== NAVBAR SCROLL =====
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $("#navbar").addClass("scrolled");
    } else {
      $("#navbar").removeClass("scrolled");
    }

    // Scroll-up button
    if ($(this).scrollTop() > 500) {
      $(".scroll-up-btn").addClass("show");
    } else {
      $(".scroll-up-btn").removeClass("show");
    }
  });

  // Scroll to top
  $(".scroll-up-btn").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 600);
  });

  // ===== MOBILE MENU =====
  $("#menuToggle").click(function () {
    $("#navMenu").toggleClass("active");
    const icon = $(this).find("i");
    icon.toggleClass("fa-bars fa-times");
  });

  // Close menu on link click
  $(".menu li a").click(function () {
    $("#navMenu").removeClass("active");
    $("#menuToggle i").removeClass("fa-times").addClass("fa-bars");
  });

  // ===== TYPING ANIMATION =====
  const typingOptions = {
    strings: ["Founder of BinaryShield", "Cybersecurity Researcher", "VAPT Consultant", "Red Teamer"],
    typeSpeed: 80,
    backSpeed: 50,
    loop: true,
  };
  if ($(".typing2").length) {
    new Typed(".typing2", typingOptions);
  }

  // ===== COUNTER ANIMATION =====
  let countersAnimated = false;
  function animateCounters() {
    if (countersAnimated) return;
    const statsBar = $(".stats-bar");
    if (!statsBar.length) return;

    const statsTop = statsBar.offset().top;
    const windowBottom = $(window).scrollTop() + $(window).height();

    if (windowBottom > statsTop + 50) {
      countersAnimated = true;
      $(".stat-number").each(function () {
        const target = parseInt($(this).data("target"));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        const el = $(this);
        const interval = setInterval(function () {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(interval);
          }
          el.text(Math.floor(current));
        }, 16);
      });
    }
  }

  $(window).on("scroll", animateCounters);
  animateCounters(); // Check on load

  // ===== SCROLL REVEAL =====
  function revealOnScroll() {
    $(".section-header, .standard-card, .skill-category-card, .innovation-card, .timeline-item, .experience-card, .cert-card, .project-card, .about-grid, .contact-grid, .soft-skills-row").each(function () {
      if (!$(this).hasClass("reveal")) {
        $(this).addClass("reveal");
      }
      const elementTop = $(this).offset().top;
      const windowBottom = $(window).scrollTop() + $(window).height();
      if (windowBottom > elementTop + 60) {
        $(this).addClass("visible");
      }
    });
  }

  $(window).on("scroll", revealOnScroll);
  setTimeout(revealOnScroll, 100);

  // ===== PROJECT CAROUSEL =====
  $(".carousel").owlCarousel({
    margin: 20,
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
      0: { items: 1, nav: false },
      600: { items: 2, nav: false },
      1000: { items: 3, nav: false },
    },
  });

  // ===== FOOTER YEAR =====
  $("#year").text(new Date().getFullYear());

  // ===== EMAILJS =====
  try {
    emailjs.init("aEdbXaUrefSaC4JWZ");
  } catch (e) {
    console.error("EmailJS initialization failed:", e);
  }

  // Contact form
  $("#contactForm").on("submit", function (event) {
    event.preventDefault();
    emailjs.sendForm("service_tj8gght", "template_ahh0jsl", "#contactForm")
      .then(function () {
        alert("Email sent successfully!");
        document.getElementById("contactForm").reset();
      }, function () {
        alert("Failed to send email. Please try again.");
      });
  });

  // ===== SMOOTH SCROLLING =====
  $('a[href^="#"]').on("click", function (e) {
    e.preventDefault();
    var target = $(this.hash);
    if (target.length) {
      $("html, body").animate({ scrollTop: target.offset().top - 70 }, 500);
    }
  });

  // ===== CERTIFICATE SCROLL DRAG =====
  document.querySelectorAll(".certs-scroll").forEach(function (area) {
    let isDragging = false;
    let startX, scrollLeft;

    area.addEventListener("mousedown", function (e) {
      isDragging = true;
      startX = e.pageX - area.offsetLeft;
      scrollLeft = area.scrollLeft;
      area.style.cursor = "grabbing";
    });

    area.addEventListener("mouseleave", function () {
      isDragging = false;
      area.style.cursor = "grab";
    });

    area.addEventListener("mouseup", function () {
      isDragging = false;
      area.style.cursor = "grab";
    });

    area.addEventListener("mousemove", function (e) {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - area.offsetLeft;
      area.scrollLeft = scrollLeft - (x - startX) * 2;
    });
  });
});
