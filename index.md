---
layout: default
title: Home
header_subtitle: NSF GRFP Fellow in Astronomy at the University of Texas at Austin
---

<!-- Hero Section -->
<section class="hero-section">
    <div class="hero-content">
        <div class="hero-image">
            <img src="assets/images/headshot.jpg" alt="Owen Chase" class="profile-img">
        </div>
        <div class="hero-text">
            <h1 class="hero-title">Owen Chase</h1>
            <p class="hero-subtitle">NSF GRFP Fellow in Astronomy</p>
            <p class="hero-description">Working at the intersection of big data and theory to understand the past, present, and future of the cosmos</p>
        </div>
    </div>
    <div class="contact-section">
        <div class="contact-links">
            <a href="https://ui.adsabs.harvard.edu/public-libraries/gQi7T4KZQ_WK4oebPVY8-g" target="_blank" rel="noopener noreferrer">
                <img src="assets/images/ads_icon.svg" alt="ADS" />
            </a>
            <a href="https://github.com/ochase10" target="_blank" rel="noopener noreferrer">
                <img src="assets/images/github_icon.png" alt="GitHub" /> 
            </a>
            <a href="https://www.linkedin.com/in/owen-chase-86503622a/" target="_blank" rel="noopener noreferrer">
                <img src="assets/images/linkedin_icon.png" alt="LinkedIn" />
            </a>
        </div>
        <div class="contact-email">
            owen.chase [at] utexas.edu
        </div>
    </div>
    <div class="scroll-indicator">
        <div class="scroll-arrow"></div>
    </div>
</section>

<!-- Research/About Section -->
<section id="research-section" class="research-section">
    <div class="research-content">
        <h2 class="research-title">About Me</h2>
        
        <div class="research-text">
            <p class="text-line">My name is Owen Chase, and I am currently a third year PhD candidate and NSF Graduate Research Fellow in the Department of Astronomy at UT Austin where I am co-advised by Drs. Julian Muñoz and Karl Gebhardt.</p>

            <p class="text-line">I graduated summa cum laude from the Penn State Schreyer Honors College and Eberly College of Science in 2022 to recieve Bachelor of Science degrees in Astronomy and Statistics. </p>            
                        
            <p class="text-line">My primary research interests are cosmology, large-scale structure, and astrostatistics. I am interested in the issues facing &Lambda;CDM cosmology and how modern and future large galaxy surveys can inform improved theories of cosmology. </p>
            
            <p class="text-line">I am a member of the Hobby-Eberly Telescope Dark Energy Experiment (<a href="https://hetdex.org" target="_blank">HETDEX</a>) collaboration. Our goal is to achieve percent level cosmological parameter constraints using the BAO signal in our catalog of more than 1M Lyman-α emitting galaxies at intermediate redshifts.</p>

            <p class="text-line">When I'm not searching for deep truths about the universe, I try to fill my life with joy, rest, and personal growth. I enjoy getting active with a number of sports including tennis, soccer, and bouldering. I'm always willing to try a new food spot (or return to an old favorite). I love movies and TV, some of my favorites being <em>Everything, Everywhere, All at Once</em>, <em>Dodgeball</em>, <em>Severance</em>, and <em>Invincible</em>. I also can't resist a good documentary. A life goal of mine is to visit all 50 states and every continent.</p>

            
        </div>
    </div>
</section>

<script>
// Dynamic header shrinking on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const scrollY = window.scrollY;
    
    if (scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Research section fade animation on scroll - reversible
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const section = entry.target;
        const textLines = section.querySelectorAll('.text-line');
        
        if (entry.isIntersecting) {
            // Entering viewport - fade in
            section.classList.add('fade-in');
            
            // Animate text lines with stagger
            textLines.forEach((line, index) => {
                setTimeout(() => {
                    line.style.opacity = '1';
                    line.style.transform = 'translateY(0)';
                }, index * 200 + 300); // Shorter delay since no wipe animation
            });
        } else {
            // Leaving viewport - fade out
            section.classList.remove('fade-in');
            
            // Reset text lines
            textLines.forEach((line) => {
                line.style.opacity = '0';
                line.style.transform = 'translateY(30px)';
            });
        }
    });
}, observerOptions);

// Observe research section
const researchSection = document.getElementById('research-section');
if (researchSection) {
    observer.observe(researchSection);
}

// Smooth scroll for arrow
document.querySelector('.scroll-indicator').addEventListener('click', function() {
    document.getElementById('research-section').scrollIntoView({
        behavior: 'smooth'
    });
});

// Hide scroll arrow when past hero section
window.addEventListener('scroll', function() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const heroSection = document.querySelector('.hero-section');
    
    if (scrollIndicator && heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        
        if (window.scrollY > heroBottom - 100) {
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