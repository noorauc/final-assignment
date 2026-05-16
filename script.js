// Dynamic GitHub API Integration
async function getRepos() {
    const container = document.getElementById('repos-container');
    try {
        const response = await fetch('https://api.github.com/users/noorwael/repos?sort=updated');
        
        if (!response.ok) {
            throw new Error(`HTTP Error Status: ${response.status}`);
        }
        
        const repos = await response.json();
        container.innerHTML = ''; // Clear spinner
        
        if (repos.length === 0) {
            container.innerHTML = '<p>No public repositories found.</p>';
            return;
        }

        // Create a sub-grid structure inside the container for premium layout
        const grid = document.createElement('div');
        grid.className = 'repo-grid';

        repos.slice(0, 3).forEach(repo => {
            const card = document.createElement('div');
            card.className = 'repo-card';
            card.innerHTML = `
                <h4>${escapeHTML(repo.name)}</h4>
                <p>${escapeHTML(repo.description || 'MICT Academic Engineering Project')}</p>
                <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" style="color:var(--accent); font-weight:600; text-decoration:none; font-size:0.9rem;">
                    Source Code <i class="fas fa-arrow-right" style="font-size:0.8rem; margin-left:4px;"></i>
                </a>
            `;
            grid.appendChild(card);
        });
        
        container.appendChild(grid);
    } catch (e) {
        console.error("API Fetch Error: ", e);
        container.innerHTML = '<p><i class="fas fa-exclamation-circle"></i> Failed to load live repositories. Please check back later!</p>';
    }
}

// Utility function to prevent XSS injection attacks
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}

// Optimized Theme Switcher Integration
const themeBtn = document.getElementById('dark-mode-btn');
const icon = themeBtn.querySelector('i');

themeBtn.onclick = () => {
    document.body.classList.toggle('dark-theme');
    if (document.body.classList.contains('dark-theme')) {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
};

// Back-to-Top Logic using CSS class toggle instead of style inject
const topBtn = document.getElementById('backToTop');
window.onscroll = () => {
    if (window.scrollY > 400) {
        topBtn.classList.add('show');
    } else {
        topBtn.classList.remove('show');
    }
};

topBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

// Initialize when DOM is parsed
document.addEventListener('DOMContentLoaded', getRepos);