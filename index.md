---
layout: default
title: Home
header_subtitle: NSF GRFP Fellow in Astronomy at the University of Texas at Austin
---

<!-- Hero Section -->
<section class="hero-section">
    <div class="hero-inner">
      <div class="hero-content">
          <div class="hero-image">
              <img src="assets/images/headshot.jpg" alt="Owen Chase" class="profile-img">
          </div>
          <div class="hero-text">
              <h1 class="hero-title">Owen Chase</h1>
              <p class="hero-subtitle">NSF GRFP Fellow in Astronomy</p>
              <p class="hero-description">Working at the intersection of big data and theory to understand the past, present, and future of the cosmos</p>
              <div class="hero-contact">
                <div class="contact-links">
                    <a href="https://ui.adsabs.harvard.edu/public-libraries/gQi7T4KZQ_WK4oebPVY8-g" target="_blank" rel="noopener noreferrer" title="View my ADS library">
                        <img src="assets/images/ads_icon.svg" alt="ADS" />
                    </a>
                    <a href="https://github.com/ochase10" target="_blank" rel="noopener noreferrer" title="GitHub profile">
                        <img src="assets/images/github_icon.png" alt="GitHub" /> 
                    </a>
                    <a href="https://www.linkedin.com/in/owen-chase-86503622a/" target="_blank" rel="noopener noreferrer" title="LinkedIn profile">
                        <img src="assets/images/linkedin_icon.png" alt="LinkedIn" />
                    </a>
                </div>
                <div class="contact-email">
                    owen.chase [at] utexas.edu
                </div>
              </div>
          </div>
      </div>
      <div class="scroll-indicator">
          <div class="scroll-arrow"></div>
      </div>
    </div>
</section>

<!-- Research/About Section -->
<section id="research-section" class="research-section">
    <div class="research-content">
        <h2 class="research-title">About Me</h2>
        
        <div class="research-text">
            <p class="text-line">My name is Owen Chase, and I am currently a third year PhD candidate and NSF Graduate Research Fellow in the Department of Astronomy at UT Austin where I am co-advised by Drs. Julian Muñoz and Karl Gebhardt.</p>

            <p class="text-line">I graduated summa cum laude from the Penn State Schreyer Honors College and Eberly College of Science in 2022 with Bachelor of Science degrees in Astronomy and Statistics.</p>            
                        
            <p class="text-line">My primary research interests are cosmology, large-scale structure, and astrostatistics. I am interested in the issues facing ΛCDM cosmology and how modern and future large galaxy surveys can inform improved theories of cosmology.</p>
            
            <p class="text-line">I am a member of the Hobby-Eberly Telescope Dark Energy Experiment (<a href="https://hetdex.org" target="_blank" rel="noopener noreferrer">HETDEX</a>) collaboration. Our goal is to achieve percent level cosmological parameter constraints using the BAO signal in our catalog of more than 1M Lyman-α emitting galaxies at intermediate redshifts.</p>

            <p class="text-line">When I'm not searching for deep truths about the universe, I try to fill my life with joy, rest, and personal growth. I enjoy getting active with sports including tennis, soccer, and bouldering. I'm always willing to try a new food spot (or return to an old favorite). I love movies and TV, some of my favorites being <em>Everything, Everywhere, All at Once</em>, <em>Dodgeball</em>, <em>Severance</em>, and <em>Invincible</em>. I also can't resist a good documentary. A life goal of mine is to visit all 50 states and every continent.</p>
        </div>
    </div>
</section>

<script>
// Research section fade animation on scroll
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const section = entry.target;
        const textLines = section.querySelectorAll('.text-line');
        
        if (entry.isIntersecting) {
            section.classList.add('fade-in');
            textLines.forEach((line, index) => {
                setTimeout(() => {
                    line.style.opacity = '1';
                    line.style.transform = 'translateY(0)';
                }, index * 100 + 150);
            });
        } else {
            section.classList.remove('fade-in');
            textLines.forEach((line) => {
                line.style.opacity = '0';
                line.style.transform = 'translateY(30px)';
            });
        }
    });
}, observerOptions);

const researchSection = document.getElementById('research-section');
if (researchSection) {
    observer.observe(researchSection);
}

// Smooth scroll for arrow
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function() {
        const researchSection = document.getElementById('research-section');
        if (researchSection) {
            researchSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Hide/show scroll arrow on scroll
window.addEventListener('scroll', function() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const heroSection = document.querySelector('.hero-section');
    
    if (scrollIndicator && heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const threshold = Math.max(heroBottom - 100, 0);
        
        if (window.scrollY > threshold) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.pointerEvents = 'auto';
        }
    }
});

// Ensure scroll indicator is visible on page load
window.addEventListener('load', function() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.pointerEvents = 'auto';
    }
});
</script>
