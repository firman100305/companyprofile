
        (function () {
          var btn = document.getElementById("scrollTopBtn");
          if (!btn) return;

          function toggleBtn() {
            if (window.scrollY > 300) {
              btn.classList.add("is-visible");
            } else {
              btn.classList.remove("is-visible");
            }
          }

          window.addEventListener("scroll", toggleBtn, { passive: true });
          toggleBtn();

          btn.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
          });
        })();
