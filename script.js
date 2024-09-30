
        // Color schemes
        const colorSchemes = {
            blue: {
                primary: '#4A90E2',
                secondary: '#50E3C2',
                accent: '#F5A623',
                background: '#F0F0F0',
                text: '#333333',
                cardBg: '#FFFFFF'
            },
            green: {
                primary: '#27AE60',
                secondary: '#2980B9',
                accent: '#F39C12',
                background: '#E8F5E9',
                text: '#1E3A1E',
                cardBg: '#FFFFFF'
            },
            red: {
                primary: '#E74C3C',
                secondary: '#3498DB',
                accent: '#F1C40F',
                background: '#FFEBEE',
                text: '#3E2723',
                cardBg: '#FFFFFF'
            },
            purple: {
                primary: '#8E44AD',
                secondary: '#2ECC71',
                accent: '#E67E22',
                background: '#F3E5F5',
                text: '#4A148C',
                cardBg: '#FFFFFF'
            }
        };

        // Theme toggle and color switcher
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const themeColors = document.getElementById('theme-colors');

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    const icon = themeToggle.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
    updateTheme(body.classList.contains('dark') ? 'dark' : 'light');
});

themeColors.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const color = e.target.getAttribute('data-color');
        setThemeColor(color);
    }
});

function setThemeColor(color) {
    const scheme = colorSchemes[color];
    if (!scheme) return;

    for (const [key, value] of Object.entries(scheme)) {
        document.documentElement.style.setProperty(`--${key}`, value);
    }

    // Update specific elements that might need additional styling
    updateTheme('light');
}

function updateTheme(theme) {
    const isDark = theme === 'dark';
    document.documentElement.style.setProperty('--background', isDark ? '#1A1A1A' : colorSchemes.blue.background);
    document.documentElement.style.setProperty('--text', isDark ? '#F0F0F0' : colorSchemes.blue.text);
    document.documentElement.style.setProperty('--cardBg', isDark ? '#2C2C2C' : colorSchemes.blue.cardBg);
}

        // Skills Chart
const ctx = document.getElementById('skillsChart').getContext('2d');
const skillsChart = new Chart(ctx, {
    type: 'radar',
    data: {
        labels: ['JavaScript', 'Angular', 'Node.js', 'SQL', 'Java Spring Boot', 'RESTful API'],
        datasets: [{
            label: 'Skills',
            data: [90, 85, 82, 85, 84 , 90],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scale: {
            ticks: {
                beginAtZero: true,
                max: 100
            }
        }
    }
});

        // Update chart colors when theme changes
function updateChartColors() {
    skillsChart.data.datasets[0].backgroundColor = `rgba(${hexToRgb(getComputedStyle(document.documentElement).getPropertyValue('--primary'))}, 0.2)`;
    skillsChart.data.datasets[0].borderColor = getComputedStyle(document.documentElement).getPropertyValue('--primary');
    skillsChart.update();
}
// Helper function to convert hex to rgb
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
}

        // Project Modal
        const projectButtons = document.querySelectorAll('.project-details');
        const modal = document.getElementById('project-modal');
        const closeModal = document.getElementById('close-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');
        const modalTech = document.getElementById('modal-tech');

        const projectDetails = {
            1: {
                title: 'Web Application',
                description: 'A full-stack web application built with Angular for the frontend and Java spring boot for the backend. Features include user authentication, sending emails.',
                tech: ['Angular', 'Node.js', 'MongoDB', 'REST API']
            },
            2: {
                title: 'Task Management App',
                description: 'A mobile application for task management, built using React Native. The app includes features such as task creation, due dates, priority levels, and push notifications.',
                tech: ['React Native', 'Redux', 'Firebase', 'Push Notifications']
            },
            3: {
                title: 'Data Visualization Dashboard',
                description: 'An interactive dashboard for data analysis, built using D3.js. The dashboard presents complex data sets in an easily understandable format with various chart types and filtering options.',
                tech: ['D3.js', 'JavaScript', 'HTML5', 'CSS3', 'REST API']
            }
        };

        projectButtons.forEach(button => {
            button.addEventListener('click', () => {
                const projectId = button.getAttribute('data-project');
                const project = projectDetails[projectId];
                modalTitle.textContent = project.title;
                modalDescription.textContent = project.description;
                modalTech.innerHTML = '<strong>Technologies used:</strong> ' + project.tech.join(', ');
                modal.classList.remove('hidden');
                modal.classList.add('flex');
            });
        });

        closeModal.addEventListener('click', () => {
            modal.classList.remove('flex');
            modal.classList.add('hidden');
        });

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('flex');
                modal.classList.add('hidden');
            }
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Initial theme setup
setThemeColor('blue');
updateChartColors();

// Update chart colors when theme changes
const observer = new MutationObserver(() => {
    updateChartColors();
});
observer.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] });

// Send email on form submission
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get the values from the form
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Create the request payload
    const payload = {
        name: name,
        email: email,
        message: message
    };

    // Make the POST request to your Spring Boot API
    fetch('http://localhost:8080/api/contact/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (response.ok) {
            return response.text(); // Return response text if message is successfully sent
        } else {
            throw new Error('Failed to send message'); // Handle failure scenario
        }
    })
    .then(data => {
        // Reset form fields after successful submission
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('message').value = '';

        // Show the success modal
        document.getElementById('success-modal').classList.remove('hidden');
    })
    .catch(error => {
        // Show the error modal
        document.getElementById('error-modal').classList.remove('hidden');
    });
});

// Close success modal
document.getElementById('close-success-modal').addEventListener('click', function() {
    document.getElementById('success-modal').classList.add('hidden');
});

// Close error modal
document.getElementById('close-error-modal').addEventListener('click', function() {
    document.getElementById('error-modal').classList.add('hidden');
});


