// Create particles
function createParticles() {
const container = document.querySelector('.particles');
for (let i = 0; i < 50; i++) {
const particle = document.createElement('div');
particle.className = 'particle';
particle.style.left = Math.random() * 100 + 'vw';
particle.style.animationDelay = Math.random() * 15 + 's';
particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
container.appendChild(particle);
}
}

// Loader
window.addEventListener('load', () => {
createParticles();
setTimeout(() => {
document.getElementById('loader').style.opacity = '0';
setTimeout(() => {
    document.getElementById('loader').style.display = 'none';
}, 500);
}, 1500);

// Initialize chart only if on index.html and canvas exists
if (document.getElementById('myBarChart')) {
    createChart();
}

// Initialize FAQ only if on features.html
if (document.querySelector('.faq-container')) {
    initializeFaq();
}

// Initialize Gallery Modal only if on portfolio.html
if (document.querySelector('.gallery-grid')) {
    initializeGalleryModal();
}
});


// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
document.body.classList.toggle('light-mode');
// Update chart colors on theme change if chart exists
if (typeof myBarChart !== 'undefined') { // Check if myBarChart is defined
    updateChartColors();
}
});

// Mobile menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
navLinks.classList.toggle('active');
});

// Ripple effect
document.querySelectorAll('.ripple').forEach(btn => {
btn.addEventListener('click', function(e) {
const circle = document.createElement('span');
circle.className = 'ripple-circle';
const rect = this.getBoundingClientRect();
const size = Math.max(rect.width, rect.height);
circle.style.width = circle.style.height = size + 'px';
circle.style.left = (e.clientX - rect.left - size / 2) + 'px';
circle.style.top = (e.clientY - rect.top - size / 2) + 'px';
this.appendChild(circle);
setTimeout(() => circle.remove(), 600);
});
});

// Scroll animations
const observer = new IntersectionObserver(entries => {
entries.forEach(entry => {
if (entry.isIntersecting) {
    entry.target.classList.add('visible');
}
});
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => {
observer.observe(el);
});

// Chart.js Integration (only if canvas exists on the page)
let myBarChart;

function createChart() {
const ctx = document.getElementById('myBarChart');
if (!ctx) return; // Exit if canvas not found (e.g., on other pages)

const isLightMode = document.body.classList.contains('light-mode');
const textColor = isLightMode ? '#676565' : '#ffffff'; // --text from CSS
const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();

myBarChart = new Chart(ctx.getContext('2d'), {
    type: 'bar',
    data: {
    labels: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024'],
    datasets: [{
        label: 'Projects Completed',
        data: [12, 19, 15, 22],
        backgroundColor: [
        'rgba(139, 92, 246, 0.6)', // var(--accent) with opacity
        'rgba(102, 126, 234, 0.6)', // A complementary color
        'rgba(139, 92, 246, 0.6)',
        'rgba(102, 126, 234, 0.6)'
        ],
        borderColor: [
        'rgba(139, 92, 246, 1)',
        'rgba(102, 126, 234, 1)',
        'rgba(139, 92, 246, 1)',
        'rgba(102, 126, 234, 1)'
        ],
        borderWidth: 1
    }]
    },
    options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
        labels: {
            color: textColor
        }
        },
        tooltip: {
            backgroundColor: accentColor,
            titleColor: 'white',
            bodyColor: 'white',
            callbacks: {
                label: function(context) {
                    let label = context.dataset.label || '';
                    if (label) {
                        label += ': ';
                    }
                    if (context.parsed.y !== null) {
                        label += context.parsed.y + ' projects';
                    }
                    return label;
                }
            }
        }
    },
    scales: {
        y: {
        beginAtZero: true,
        ticks: {
            color: textColor
        },
        grid: {
            color: 'rgba(255, 255, 255, 0.1)' // Light grid lines
        }
        },
        x: {
        ticks: {
            color: textColor
        },
        grid: {
            color: 'rgba(255, 255, 255, 0.1)'
        }
        }
    }
    }
});
}

function updateChartColors() {
if (myBarChart) {
    const isLightMode = document.body.classList.contains('light-mode');
    const textColor = isLightMode ? '#676565' : '#ffffff';
    const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();

    myBarChart.options.plugins.legend.labels.color = textColor;
    myBarChart.options.plugins.tooltip.backgroundColor = accentColor;
    myBarChart.options.scales.y.ticks.color = textColor;
    myBarChart.options.scales.x.ticks.color = textColor;
    myBarChart.options.scales.y.grid.color = isLightMode ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)';
    myBarChart.options.scales.x.grid.color = isLightMode ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)';

    // Update dataset background and border colors if desired based on theme
    // For simplicity, keeping them static for now, but you could define light/dark versions
    // myBarChart.data.datasets[0].backgroundColor = [...];
    // myBarChart.data.datasets[0].borderColor = [...];

    myBarChart.update();
}
}


// Scroll to top
const scrollBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
scrollBtn.style.display = window.scrollY > 500 ? 'block' : 'none';
});

scrollBtn.addEventListener('click', () => {
window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Smooth scrolling for nav links (updated to handle external pages too)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function(e) {
// Check if the link is on the current page
if (this.hostname === window.location.hostname && this.pathname === window.location.pathname) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
// For links to other pages, default behavior handles navigation
});
});


// FAQ Accordion (for features.html)
function initializeFaq() {
document.querySelectorAll('.faq-question').forEach(item => {
    item.addEventListener('click', () => {
        const answer = item.nextElementSibling;
        const icon = item.querySelector('span');

        // Close all other open FAQs
        document.querySelectorAll('.faq-question.active').forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
                otherItem.nextElementSibling.style.maxHeight = null;
                otherItem.querySelector('span').style.transform = 'rotate(0deg)';
            }
        });

        // Toggle current FAQ
        item.classList.toggle('active');
        if (answer.style.maxHeight) {
            answer.style.maxHeight = null;
            icon.style.transform = 'rotate(0deg)';
        } else {
            answer.style.maxHeight = answer.scrollHeight + "px";
            icon.style.transform = 'rotate(45deg)';
        }
    });
});
}

// Image Gallery Modal (for portfolio.html)
function initializeGalleryModal() {
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const closeBtn = document.getElementsByClassName('close-button')[0];

document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', () => {
        modal.style.display = 'flex';
        modalImg.src = img.src;
    });
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) { // Close when clicking outside the image
        modal.style.display = 'none';
    }
});
}