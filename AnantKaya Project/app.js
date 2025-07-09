// Only keep carousel and smooth scroll related logic. No extra scroll/section animations.

// Basic fade-in on scroll for sections (no GSAP, just IntersectionObserver)
document.addEventListener('DOMContentLoaded', function () {
  const fadeSections = document.querySelectorAll('.ak-smooth-section, .fade-section');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    fadeSections.forEach(section => {
      section.classList.add('section-init');
      observer.observe(section);
    });
  } else {
    // Fallback: show all
    fadeSections.forEach(section => section.classList.add('section-visible'));
  }

  // Modern engaging animation for carousel images (fade+scale+slide)
  const carousel = document.querySelector('.carousel');
  if (carousel) {
    carousel.addEventListener('slide.bs.carousel', function (e) {
      const next = e.relatedTarget;
      const imgs = next.querySelectorAll('img');
      imgs.forEach(img => {
        img.classList.remove('carousel-animate');
        // Force reflow for restart
        void img.offsetWidth;
        img.classList.add('carousel-animate');
      });
      // --- Mobile Hero Card Content Sync ---
      if (window.innerWidth <= 575.98) {
        updateMobileHeroCard(next);
      }
    });
    // Initial animation for first slide
    const firstImgs = carousel.querySelectorAll('.carousel-item.active img');
    firstImgs.forEach(img => img.classList.add('carousel-animate'));
    // Initial mobile hero card content
    if (window.innerWidth <= 575.98) {
      const active = carousel.querySelector('.carousel-item.active');
      updateMobileHeroCard(active);
    }
  }

  // Function: Sync hero card content for mobile below carousel
  function updateMobileHeroCard(slideElem) {
    if (!slideElem) return;
    var card = slideElem.querySelector('.hero-card-overlay');
    var mobileCard = document.getElementById('mobileHeroCard');
    if (card && mobileCard) {
      // Add fade-out, then update, then fade-in
      mobileCard.classList.remove('show');
      setTimeout(() => {
        mobileCard.innerHTML = card.innerHTML;
        mobileCard.classList.add('show');
      }, 180);
    }
  }
});
