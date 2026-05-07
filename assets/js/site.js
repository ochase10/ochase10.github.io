// Central site JS: header scroll handling, external links, and research-tile expand behavior
(function(){
  'use strict';

  const HEADER_SCROLL_THRESHOLD = 60;

  function onScroll() {
    const header = document.getElementById('main-header');
    if (!header) return;
    if (window.scrollY > HEADER_SCROLL_THRESHOLD) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }

  // Throttle helper
  function throttle(fn, wait){
    let last = 0;
    return function(){
      const now = Date.now();
      if (now - last >= wait){ fn(); last = now; }
    };
  }

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

      // Ensure starting collapsed state has explicit maxHeight for predictable animation
      if (!section.classList.contains('expanded')){
        content.style.maxHeight = getComputedStyle(content).getPropertyValue('max-height');
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
          content.style.maxHeight = getCollapsedMaxHeight(content) || '3.2rem';
          section.classList.remove('expanded');
          content.classList.remove('expanded');
          content.setAttribute('aria-hidden','true');
          section.setAttribute('aria-expanded','false');
        }
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

  document.addEventListener('DOMContentLoaded', function(){
    // initial behaviors
    onScroll();
    enhanceExternalLinks();
    setupResearchTiles();

    // attach scroll listener
    window.addEventListener('scroll', throttle(onScroll, 100));
  });

})();
