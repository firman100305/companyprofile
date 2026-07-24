/* ==========================================================
   Component — Vertical Dash Stepper (js)
   Menangani interaksi klik pada indikator dash & klik area kartu
   (atas/bawah) untuk berpindah antar paragraf deskripsi.
   Dipakai bersama css/components/stepper.css, pada kartu yang
   memiliki elemen [data-stepper] (Row 1 "Slide Left Panel" dan
   Row 2 "Diagonal Wipe Right").
   ========================================================== */

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
