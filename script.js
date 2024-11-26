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
        console.log('Button clicked');
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
        // Extract the video ID from the URL
        const videoIdMatch = url.match(/(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        if (videoIdMatch && videoIdMatch[1]) {
            const videoId = videoIdMatch[1];
            console.log('Extracted Video ID:', videoId);

            // Create an iframe element to embed the video
            const iframe = document.createElement('iframe');
            iframe.width = '560';
            iframe.height = '315';
            iframe.src = `https://www.youtube.com/embed/${videoId}`;
            iframe.frameBorder = '0';
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            iframe.allowFullscreen = true;

            // Note: Downloading YouTube videos directly using native code is not possible due to YouTube's terms of service.
            // However, for educational purposes, here's a conceptual example of how it might look:

            // Attempt to download the video as MP4 using native code
            const downloadVideo = (videoId) => {
                const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
                const a = document.createElement('a');
                a.href = videoUrl;
                a.download = `${videoId}.mp4`;
                document.body.appendChild(a);
                
                /*a.click();
                document.body.removeChild(a);*/
                alert('Attempted to download the video. Note: This is a conceptual example.');
            };

            // Call the download function
            downloadVideo(videoId);
        } else {
            alert('Failed to extract video ID. Please check the URL and try again.');
        }
    });

    // Reset validation styling when input changes
    urlInput.addEventListener('input', function() {
        this.style.borderColor = 'rgba(255, 255, 255, 0.3)';
    });
});
