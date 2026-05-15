document.addEventListener('DOMContentLoaded', () => {

  // Mobile hamburger menu
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
        nav.classList.remove('open');
      }
    });
  }

  // Header search - redirect to guides page
  const headerSearch = document.getElementById('headerSearch');
  if (headerSearch) {
    headerSearch.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const q = encodeURIComponent(headerSearch.value.trim());
        if (q) window.location.href = `/dynew/guides.html?q=${q}`;
      }
    });
  }

  // Guide filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const guideCards = document.querySelectorAll('.guide-card');
  if (filterBtns.length && guideCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        guideCards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Guide search
  const guideSearch = document.getElementById('guideSearch');
  if (guideSearch && guideCards.length) {
    const searchGuides = () => {
      const q = guideSearch.value.toLowerCase();
      guideCards.forEach(card => {
        const title = card.querySelector('h3')?.textContent?.toLowerCase() || '';
        const desc = card.querySelector('p')?.textContent?.toLowerCase() || '';
        const tags = card.dataset.category || '';
        if (title.includes(q) || desc.includes(q) || tags.includes(q)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    };
    guideSearch.addEventListener('input', searchGuides);
    // URL query parameter
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    if (q) {
      guideSearch.value = q;
      searchGuides();
    }
  }

  // Database search
  const dbSearch = document.getElementById('dbSearch');
  const dbRows = document.querySelectorAll('.db-row');
  if (dbSearch && dbRows.length) {
    dbSearch.addEventListener('input', () => {
      const q = dbSearch.value.toLowerCase();
      dbRows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(q) ? '' : 'none';
      });
    });
  }

  // Class detail search
  const classSearch = document.getElementById('classSearch');
  const classDetails = document.querySelectorAll('.class-detail');
  if (classSearch && classDetails.length) {
    classSearch.addEventListener('input', () => {
      const q = classSearch.value.toLowerCase();
      classDetails.forEach(d => {
        const text = d.textContent.toLowerCase();
        d.style.display = text.includes(q) ? '' : 'none';
      });
      const empty = document.getElementById('classEmpty');
      if (empty) {
        empty.style.display = Array.from(classDetails).some(d => d.style.display !== 'none') ? 'none' : '';
      }
    });
  }

  // Back to top
  const backTop = document.getElementById('backTop');
  if (backTop) {
    window.addEventListener('scroll', () => {
      backTop.classList.toggle('show', window.scrollY > 300);
    });
    backTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Set active nav
  const path = window.location.pathname;
  document.querySelectorAll('.nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && path.endsWith(href)) {
      a.classList.add('active');
    }
  });
});
