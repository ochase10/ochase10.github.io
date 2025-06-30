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
            <p class="hero-description">Exploring the cosmos through cosmology, large-scale structure, and astrostatistics</p>
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
            <p class="text-line">My name is Owen Chase, and I am currently a second-year student in the PhD program in the Department of Astronomy at UT Austin.</p>
            
            <p class="text-line">I am also a National Science Foundation Graduate Research Fellow.</p>
            
            <p class="text-line">I hold Bachelor of Science degrees in Astronomy and Statistics from Penn State University. I graduated summa cum laude from the Schreyer Honors College and Eberly College of Science in 2022.</p>
            
            <p class="text-line">My primary research interests are cosmology, large-scale structure, and astrostatistics.</p>
            
            <p class="text-line">I am currently working as a member of the Hobby-Eberly Telescope Dark Energy Experiment (<a href="https://hetdex.org" target="_blank">HETDEX</a>) collaboration. Our goal is to achieve percent level cosmological parameter constraints using the BAO signal in our catalog of >1M Lyman-α emitting galaxies.</p>
            
            <p class="text-line">I am co-advised by Drs. Julian Muñoz and Karl Gebhardt.</p>
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