// Central site JS: header scroll handling, external links, and research-tile expand behavior
(function(){
  'use strict';

  // Header will be static; no scroll-driven class toggling.

  function enhanceExternalLinks(){
    document.querySelectorAll('a[href^="http"]').forEach(link => {
      try {
        const url = new URL(link.href);
        if (url.hostname !== location.hostname){
          link.setAttribute('target','_blank');
          link.setAttribute('rel','noopener noreferrer');
        }
      } catch (e) { /* ignore invalid URLs */ }
    });
  }

  function setupResearchTiles(){
    const sections = document.querySelectorAll('.research-tile');
    sections.forEach(section => {
      const header = section.querySelector('.tile-header');
      const content = section.querySelector('.tile-content');
      if (!content) return;

      // Capture and store the initial collapsed max-height (from CSS) for reliable collapse
      const initialCollapsed = getComputedStyle(content).getPropertyValue('max-height');
      if (!initialCollapsed || initialCollapsed === 'none'){
        content.dataset.collapsed = '3.2rem';
      } else {
        content.dataset.collapsed = initialCollapsed;
      }
      // Ensure starting collapsed state has explicit maxHeight for predictable animation
      if (!section.classList.contains('expanded')){
        content.style.maxHeight = content.dataset.collapsed;
      }

      // Toggle helper to expand/collapse section
      function toggleSection(){
        const expanded = section.classList.contains('expanded');
        if (!expanded){
          section.classList.add('expanded');
          content.classList.add('expanded');
          const h = content.scrollHeight;
          content.style.maxHeight = h + 'px';
          content.setAttribute('aria-hidden','false');
          section.setAttribute('aria-expanded','true');
        } else {
          // collapse
          const collapsedVal = content.dataset.collapsed || getCollapsedMaxHeight(content) || '3.2rem';
          content.style.maxHeight = collapsedVal;
          section.classList.remove('expanded');
          content.classList.remove('expanded');
          content.setAttribute('aria-hidden','true');
          section.setAttribute('aria-expanded','false');
        }
      }

      // Helper to recalculate height if tile is expanded
      function recalculateHeight(){
        if (section.classList.contains('expanded')){
          const h = content.scrollHeight;
          content.style.maxHeight = h + 'px';
        }
      }

      // Add ResizeObserver to recalculate height when content changes
      if (window.ResizeObserver){
        const resizeObserver = new ResizeObserver(() => {
          recalculateHeight();
        });
        resizeObserver.observe(content);
      }

      // Click anywhere on the tile toggles
      section.addEventListener('click', function(e){
        toggleSection();
      });

      if (header){
        // Prevent double-handling when header clicked; header click toggles as well
        header.addEventListener('click', function(e){
          e.stopPropagation();
          toggleSection();
        });

        // Keyboard support on header
        header.setAttribute('tabindex','0');
        header.addEventListener('keydown', function(e){
          if (e.key === 'Enter' || e.key === ' '){
            e.preventDefault();
            toggleSection();
          }
        });
      }
    });
  }

  function getCollapsedMaxHeight(content){
    // Read collapsed max-height from CSS; if it's 'none' return null
    const mh = getComputedStyle(content).getPropertyValue('max-height');
    if (mh === 'none') return null;
    return mh;
  }

  function setupCardStackNavigation(){
    const stack = document.querySelector('[data-card-stack]');
    if (!stack) return;

    const cards = Array.from(stack.querySelectorAll('[data-card]'));
    if (cards.length < 2) return;

    const firstCard = cards[0];
    const secondCard = cards[1];
    const scrollIndicator = document.querySelector('.scroll-indicator');
    let metrics = null;

    function isTextInputActive(){
      const el = document.activeElement;
      if (!el) return false;
      const tag = (el.tagName || '').toUpperCase();
      return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable;
    }

    function toPageY(el){
      return Math.round(window.scrollY + el.getBoundingClientRect().top);
    }

    function readStackRevealPx(){
      const raw = getComputedStyle(stack).getPropertyValue('--stack-reveal').trim();
      const parsed = Number.parseFloat(raw.replace('px', ''));
      return Number.isFinite(parsed) ? parsed : 56;
    }

    function isDesktop(){
      return window.matchMedia('(min-width: 769px)').matches;
    }

    function measure(){
      stack.style.setProperty('--stack-shift', '0px');
      stack.style.setProperty('--stack-pin', '0px');
      if (!isDesktop()){
        metrics = null;
        return;
      }

      const firstTop = toPageY(firstCard);
      const header = document.querySelector('header');
      const headerOffset = (header ? header.offsetHeight : 64) + 16;
      const reveal = readStackRevealPx();
      const maxShift = Math.max(0, Math.round(firstCard.offsetHeight - reveal));

      // Start stacking as soon as the first card reaches the sticky ceiling.
      // This keeps visible relative motion while both cards are pinned in-frame.
      const start = Math.max(0, firstTop - headerOffset);
      const end = start + maxShift;

      metrics = { start, end, maxShift, firstTop, headerOffset };
    }

    function render(){
      if (!metrics){
        stack.style.setProperty('--stack-shift', '0px');
        return;
      }

      const span = Math.max(1, metrics.end - metrics.start);
      const progress = Math.min(1, Math.max(0, (window.scrollY - metrics.start) / span));
      const shift = Math.round(metrics.maxShift * progress);
      const pin = Math.max(0, Math.round(window.scrollY - metrics.start));

      stack.style.setProperty('--stack-pin', pin + 'px');
      stack.style.setProperty('--stack-shift', shift + 'px');

      if (scrollIndicator){
        const shouldHide = progress > 0.08;
        scrollIndicator.style.opacity = shouldHide ? '0' : '1';
        scrollIndicator.style.pointerEvents = shouldHide ? 'none' : 'auto';
      }
    }

    function scrollToStacked(){
      if (!metrics) measure();
      if (!metrics) return;
      window.scrollTo({ top: metrics.end, behavior: 'smooth' });
    }

    function onKeyDown(e){
      const isDown = e.key === 'ArrowDown' || e.key === ' ' || e.code === 'Space';
      if (!isDown || isTextInputActive()) return;
      if (!metrics) measure();
      if (!metrics) return;

      const threshold = 10;
      if (window.scrollY < metrics.end - threshold){
        e.preventDefault();
        window.scrollTo({ top: metrics.end, behavior: 'smooth' });
      }
    }

    if (scrollIndicator){
      scrollIndicator.addEventListener('click', function(){
        scrollToStacked();
      });
    }

    const onScroll = () => render();
    const onResize = () => { measure(); render(); };

    window.addEventListener('keydown', onKeyDown, { passive: false });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    measure();
    render();
  }

  document.addEventListener('DOMContentLoaded', function(){
    // initial behaviors
    enhanceExternalLinks();
    setupResearchTiles();
    setupCardStackNavigation();
  });

})();
