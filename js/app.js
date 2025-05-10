// Projects data management
class ProjectManager {
    constructor() {
        this.projects = JSON.parse(localStorage.getItem('w3tracker_projects')) || [];
    }

    saveProjects() {
        localStorage.setItem('w3tracker_projects', JSON.stringify(this.projects));
    }

    getProjectById(id) {
        return this.projects.find(project => project.id === id);
    }
}

// DOM rendering
class ProjectRenderer {
    static renderProjectCard(project) {
        return `
            <a href="project.html?id=${project.id}" class="project-card">
                <div class="project-header">
                    <div class="project-logo">${project.logo || project.name.charAt(0)}</div>
                    <h2>${project.name}</h2>
                </div>
                <div class="project-meta">
                    <span class="meta-item">Rank: ${project.rank || 'N/A'}</span>
                    <span class="meta-item">Value: ${project.value || 'N/A'}</span>
                </div>
            </a>
        `;
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    const projectManager = new ProjectManager();
    const projectsGrid = document.getElementById('projectsGrid');
    
    // Render all projects
    projectManager.projects.forEach(project => {
        projectsGrid.innerHTML += ProjectRenderer.renderProjectCard(project);
    });
    
    // New project button
    document.getElementById('newProjectBtn').addEventListener('click', () => {
        // Open project creation modal
    });
});
