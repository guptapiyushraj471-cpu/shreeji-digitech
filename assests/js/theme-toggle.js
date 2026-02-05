/* ==========================================
   SHREEJI DIGITECH - THEME TOGGLE
   Dark/Light Mode Functionality
   Author: Piyush Gupta
   ========================================== */

(function() {
    'use strict';

    // Theme Toggle Elements
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const logoImg = document.getElementById('logo-img');
    if(document.documentElement.classList.contains("dark")){
 logo.src="assets/images/logo.png";
}else{
 logo.src="assets/images/logo.png";
}
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme on page load
    if (currentTheme === 'dark') {
        htmlElement.classList.add('dark');
        updateLogo('dark');
        updateThemeIcon('dark');
    } else {
        htmlElement.classList.remove('dark');
        updateLogo('light');
        updateThemeIcon('light');
    }

    // Theme Toggle Click Event
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            // Toggle dark class
            htmlElement.classList.toggle('dark');
            
            // Get current theme
            const isDark = htmlElement.classList.contains('dark');
            const theme = isDark ? 'dark' : 'light';
            
            // Save to localStorage
            localStorage.setItem('theme', theme);
            
            // Update logo and icon
            updateLogo(theme);
            updateThemeIcon(theme);
            
            // Add animation effect
            themeToggle.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                themeToggle.style.transform = 'rotate(0deg)';
            }, 300);
        });
    }

    /**
     * Update logo based on theme
     * @param {string} theme - Current theme (light/dark)
     */
    function updateLogo(theme) {
        if (logoImg) {
            if (theme === 'dark') {
                logoImg.src = 'assets/images/logo-light.png';
            } else {
                logoImg.src = 'assets/images/logo-light.png';
            }
        }
    }

    /**
     * Update theme toggle icon
     * @param {string} theme - Current theme (light/dark)
     */
    function updateThemeIcon(theme) {
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                if (theme === 'dark') {
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                } else {
                    icon.classList.remove('fa-sun');
                    icon.classList.add('fa-moon');
                }
            }
        }
    }

    // System preference detection (optional)
    if (window.matchMedia) {
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Only apply system preference if no saved preference exists
        if (!localStorage.getItem('theme')) {
            if (darkModeQuery.matches) {
                htmlElement.classList.add('dark');
                updateLogo('dark');
                updateThemeIcon('dark');
                localStorage.setItem('theme', 'dark');
            }
        }
        
        // Listen for system preference changes
        darkModeQuery.addEventListener('change', (e) => {
            // Only apply if user hasn't manually set a preference recently
            const lastManualChange = localStorage.getItem('lastManualThemeChange');
            const now = Date.now();
            
            if (!lastManualChange || (now - parseInt(lastManualChange)) > 86400000) { // 24 hours
                const newTheme = e.matches ? 'dark' : 'light';
                
                if (newTheme === 'dark') {
                    htmlElement.classList.add('dark');
                } else {
                    htmlElement.classList.remove('dark');
                }
                
                updateLogo(newTheme);
                updateThemeIcon(newTheme);
                localStorage.setItem('theme', newTheme);
            }
        });
    }

    // Save timestamp when user manually changes theme
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            localStorage.setItem('lastManualThemeChange', Date.now().toString());
        });
    }

})();