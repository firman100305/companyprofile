/* ==========================================================
   servicev2.js
   Dipisahkan dari inline <script> di servicev2.html
   ========================================================== */

// -- Scroll-to-top button (was: inline <script> inside <footer>) --
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

// -- Service card stepper interaction (was: inline <script> before </body>) --
        document.querySelectorAll('.svc-card').forEach((card) => {
            const scope = card.querySelector('[data-stepper]');
            if (!scope) return;

            const dashes = scope.querySelectorAll('.stepper-dash');
            const texts = scope.querySelectorAll('[data-step-text]');
            const total = dashes.length;
            let current = 0;

            function setStep(i) {
                current = i;
                dashes.forEach((d) => {
                    d.classList.toggle('active', d.getAttribute('data-hit') === String(i));
                });
                texts.forEach((t) => {
                    t.classList.toggle('active', t.getAttribute('data-step-text') === String(i));
                });
            }

            // klik langsung di dash tetap berfungsi (loncat ke step tsb)
            dashes.forEach((btn) => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    setStep(parseInt(btn.getAttribute('data-hit')));
                });
            });

            // klik di mana saja pada card -> maju/mundur berdasarkan posisi atas-bawah
            card.addEventListener('click', (e) => {
                if (!total) return;

                const rect = card.getBoundingClientRect();
                const relY = e.clientY - rect.top;
                const goNext = relY < rect.height / 2;

                const next = goNext ? (current + 1) % total : (current - 1 + total) % total;
                setStep(next);
            });

            setStep(0);
        });