// KA Talent Partners — shared behaviour

document.addEventListener('DOMContentLoaded', function () {
  var nav = document.querySelector('.navbar-ka');
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle('scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Close mobile nav after a link is tapped
  var navLinks = document.querySelectorAll('#kaNavbar .nav-link');
  var collapseEl = document.getElementById('kaNavbar');
  if (collapseEl && window.bootstrap) {
    var bsCollapse = window.bootstrap.Collapse.getOrCreateInstance(collapseEl, { toggle: false });
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        if (collapseEl.classList.contains('show')) {
          bsCollapse.hide();
        }
      });
    });
  }

  // Bootstrap form validation styling
  var forms = document.querySelectorAll('.needs-validation');
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });

  // Scroll-reveal for elements marked .reveal
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    if ('IntersectionObserver' in window) {
      var revealObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: .15, rootMargin: '0px 0px -40px 0px' });
      revealEls.forEach(function (el) { revealObserver.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    }
  }
});
