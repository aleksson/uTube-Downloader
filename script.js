document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add animation to CTA button
    const ctaButton = document.querySelector('.cta-button');
    ctaButton.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });

    // Add scroll animation for feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease-out';
        observer.observe(card);
    });

    // Add URL validation and handling
    const urlInput = document.querySelector('.url-input');
    const urlButton = document.querySelector('.url-button');

    urlButton.addEventListener('click', function() {
        const url = urlInput.value.trim();
        
        // Basic YouTube URL validation
        const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
        
        if (!youtubeRegex.test(url)) {
            urlInput.style.borderColor = '#ff4444';
            alert('Please enter a valid YouTube URL');
            return;
        }

        // Reset border color
        urlInput.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        
        // Here you can add your logic to handle the YouTube URL
        console.log('Valid YouTube URL:', url);
        // For example, you could extract the video ID and embed it
        // or redirect to the video page
    });

    // Reset validation styling when input changes
    urlInput.addEventListener('input', function() {
        this.style.borderColor = 'rgba(255, 255, 255, 0.3)';
    });
});
