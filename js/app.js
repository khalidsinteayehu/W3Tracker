// Main Application
class W3Drop {
    constructor() {
        this.projects = [];
        this.init();
    }

    // Initialize the application
    init() {
        this.loadProjects();
        this.renderStats();
        this.renderProjects();
        this.setupEventListeners();
    }

    // Load projects from localStorage or initialize with dummy data
    loadProjects() {
        const storedProjects = localStorage.getItem('w3drop_projects');
        if (storedProjects) {
            this.projects = JSON.parse(storedProjects);
        } else {
            this.projects = projectsData;
            this.saveProjects();
        }
    }

    // Save projects to localStorage
    saveProjects() {
        localStorage.setItem('w3drop_projects', JSON.stringify(this.projects));
    }

    // Calculate statistics
    calculateStats() {
        const today = new Date();
        const activeProjects = this.projects.filter(project => {
            const deadline = new Date(project.deadline);
            return project.status === 'Started' && deadline >= today;
        }).length;

        const finishedProjects = this.projects.filter(project => 
            project.status === 'Finished'
        ).length;

        const missedProjects = this.projects.filter(project => 
            project.status === 'Missed'
        ).length;

        const totalTasks = this.projects.reduce((sum, project) => 
            sum + project.tasks.length, 0);

        const completedTasks = this.projects.reduce((sum, project) => 
            sum + project.tasks.filter(task => task.status === 'Completed').length, 0);

        let dailyRate = 0;
        if (this.projects.length > 0) {
            const totalRate = this.projects.reduce((sum, project) => {
                return sum + (project.interaction.current / project.interaction.total);
            }, 0);
            dailyRate = Math.round((totalRate / this.projects.length) * 100);
        }

        return {
            totalProjects: this.projects.length,
            activeProjects,
            finishedProjects,
            missedProjects,
            dailyRate,
            tasksDone: `${completedTasks}/${totalTasks}`
        };
    }

    // Render statistics panel
    renderStats() {
        const stats = this.calculateStats();
        const statsPanel = document.getElementById('statsPanel');
        
        statsPanel.innerHTML = `
            <div class="stat-card">
                <div class="stat-value">${stats.totalProjects}</div>
                <div class="stat-label">Total Projects</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${stats.activeProjects}</div>
                <div class="stat-label">Active</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${stats.finishedProjects}</div>
                <div class="stat-label">Finished</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${stats.missedProjects}</div>
                <div class="stat-label">Missed</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${stats.dailyRate}%</div>
                <div class="stat-label">Daily Rate</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${stats.tasksDone}</div>
                <div class="stat-label">Tasks Done</div>
            </div>
        `;
    }

    // Determine project status
    getProjectStatus(project) {
        const today = new Date();
        const deadline = new Date(project.deadline);
        
        if (today > deadline) {
            return project.interaction.current >= project.interaction.total ? 'Finished' : 'Missed';
        }
        return 'Started';
    }

    // Update project status
    updateProjectStatus(project) {
        project.status = this.getProjectStatus(project);
        return project;
    }

    // Render all projects
    renderProjects() {
        const projectsGrid = document.getElementById('projectsGrid');
        projectsGrid.innerHTML = '';
        
        if (this.projects.length === 0) {
            projectsGrid.innerHTML = `
                <div class="empty-state">
                    <h3>No projects found</h3>
                    <p>Add your first Web3 quest to get started!</p>
                </div>
            `;
            return;
        }

        this.projects.forEach(project => {
            const updatedProject = this.updateProjectStatus(project);
            const projectEl = document.createElement('div');
            projectEl.className = 'project-card';
            projectEl.innerHTML = this.generateProjectHTML(updatedProject);
            projectsGrid.appendChild(projectEl);

            // Add event listeners to buttons
            const checkInBtn = projectEl.querySelector('.check-in-btn');
            if (checkInBtn) {
                checkInBtn.addEventListener('click', () => this.handleCheckIn(project.id));
            }

            const editBtn = projectEl.querySelector('.edit-btn');
            if (editBtn) {
                editBtn.addEventListener('click', () => this.showEditProjectModal(project.id));
            }

            const deleteBtn = projectEl.querySelector('.delete-btn');
            if (deleteBtn) {
                deleteBtn.addEventListener('click', () => this.handleDeleteProject(project.id));
            }
        });
    }

    // Generate HTML for a single project
    generateProjectHTML(project) {
        const progressPercent = Math.round(
            (project.interaction.current / project.interaction.total) * 100
        );

        return `
            <div class="project-header">
                <div class="project-logo">${project.logo || project.name.substring(0, 2).toUpperCase()}</div>
                <h2 class="project-title">${project.name}</h2>
                <span class="project-status ${this.getStatusClass(project.status)}">${project.status}</span>
            </div>
            
            <div class="project-meta">
                ${this.generateMetaItems(project)}
            </div>
            
            <div class="progress-container">
                <div class="progress-label">
                    <span>Interaction:</span>
                    <span>${project.interaction.current}/${project.interaction.total} days</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progressPercent}%"></div>
                </div>
            </div>
            
            <div class="task-list">
                ${this.generateTasksHTML(project.tasks)}
            </div>
            
            <div class="project-actions">
                ${this.generateActionButtons(project)}
            </div>
        `;
    }

    // Generate meta items HTML
    generateMetaItems(project) {
        return `
            <div class="meta-item">
                <span class="meta-label">Deadline:</span>
                <span>${this.formatDate(project.deadline)}</span>
            </div>
            <div class="meta-item">
                <span class="meta-label">Started:</span>
                <span>${this.formatDate(project.startDate)}</span>
            </div>
            <div class="meta-item">
                <span class="meta-label">Fund Raised:</span>
                <span>${project.fundsRaised || 'N/A'}</span>
            </div>
            <div class="meta-item">
                <span class="meta-label">Your Rank:</span>
                <span>${project.rank || 'N/A'}</span>
            </div>
        `;
    }

    // Generate tasks HTML
    generateTasksHTML(tasks) {
        if (tasks.length === 0) {
            return '<div class="task-item">No tasks added yet</div>';
        }

        return tasks.map(task => `
            <div class="task-item">
                <span class="task-type">${task.type}</span>
                <span class="task-status ${this.getStatusClass(task.status)}">${task.status}</span>
            </div>
        `).join('');
    }

    // Generate action buttons based on project status
    generateActionButtons(project) {
        let buttons = '';
        
        if (project.status === 'Started') {
            buttons += `
                <button class="btn btn-primary check-in-btn">Check in Today</button>
                <button class="btn btn-secondary edit-btn">Edit</button>
            `;
        } else {
            buttons += `
                <button class="btn btn-secondary" style="flex: 2;">View Details</button>
            `;
        }
        
        buttons += `<button class="btn btn-danger delete-btn">Delete</button>`;
        return buttons;
    }

    // Get CSS class for status
    getStatusClass(status) {
        switch (status.toLowerCase()) {
            case 'started': return 'status-started';
            case 'completed': return 'status-completed';
            case 'missed': return 'status-missed';
            default: return 'status-not-started';
        }
    }

    // Format date for display
    formatDate(dateString) {
        if (!dateString) return 'N/A';
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    // Handle check-in
    handleCheckIn(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (!project) return;

        // Check if already checked in today
        const today = new Date().toISOString().split('T')[0];
        if (project.lastCheckin && project.lastCheckin.startsWith(today)) {
            alert('You already checked in today!');
            return;
        }

        // Update interaction
        project.interaction.current = Math.min(
            project.interaction.current + 1,
            project.interaction.total
        );
        
        // Update last check-in date
        project.lastCheckin = new Date().toISOString();
        
        // Update status
        project.status = this.getProjectStatus(project);
        
        this.saveProjects();
        this.renderStats();
        this.renderProjects();
    }

    // Handle project deletion
    handleDeleteProject(projectId) {
        if (confirm('Are you sure you want to delete this project?')) {
            this.projects = this.projects.filter(p => p.id !== projectId);
            this.saveProjects();
            this.renderStats();
            this.renderProjects();
        }
    }

    // Show add project modal
    showAddProjectModal() {
        const modal = document.getElementById('addProjectModal');
        modal.style.display = 'block';
        
        // Set default dates
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('startDate').value = today;
        
        // Close modal when clicking X
        document.querySelector('.close').addEventListener('click', () => {
            modal.style.display = 'none';
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
        
        // Handle form submission
        document.getElementById('projectForm').onsubmit = (e) => {
            e.preventDefault();
            this.handleAddProject();
        };
    }

    // Handle adding a new project
    handleAddProject() {
        const newProject = {
            id: this.projects.length > 0 ? Math.max(...this.projects.map(p => p.id)) + 1 : 1,
            name: document.getElementById('projectName').value,
            logo: document.getElementById('projectLogo').value,
            startDate: document.getElementById('startDate').value,
            deadline: document.getElementById('deadline').value,
            fundsRaised: document.getElementById('fundsRaised').value || '$0',
            rank: '#0',
            interaction: {
                current: 0,
                total: parseInt(document.getElementById('duration').value),
                lastCheckin: null
            },
            status: 'Started',
            tasks: []
        };

        this.projects.push(newProject);
        this.saveProjects();
        
        // Close modal and reset form
        document.getElementById('addProjectModal').style.display = 'none';
        document.getElementById('projectForm').reset();
        
        // Update UI
        this.renderStats();
        this.renderProjects();
    }

    // Show edit project modal
    showEditProjectModal(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (!project) return;

        const modal = document.getElementById('addProjectModal');
        modal.style.display = 'block';
        modal.querySelector('h2').textContent = 'Edit Project';
        
        // Fill form with project data
        document.getElementById('projectName').value = project.name;
        document.getElementById('projectLogo').value = project.logo;
        document.getElementById('startDate').value = project.startDate;
        document.getElementById('deadline').value = project.deadline;
        document.getElementById('duration').value = project.interaction.total;
        document.getElementById('fundsRaised').value = project.fundsRaised;
        
        // Handle form submission for edit
        document.getElementById('projectForm').onsubmit = (e) => {
            e.preventDefault();
            this.handleUpdateProject(projectId);
        };
    }

    // Handle updating a project
    handleUpdateProject(projectId) {
        const projectIndex = this.projects.findIndex(p => p.id === projectId);
        if (projectIndex === -1) return;

        this.projects[projectIndex] = {
            ...this.projects[projectIndex],
            name: document.getElementById('projectName').value,
            logo: document.getElementById('projectLogo').value,
            startDate: document.getElementById('startDate').value,
            deadline: document.getElementById('deadline').value,
            fundsRaised: document.getElementById('fundsRaised').value,
            interaction: {
                ...this.projects[projectIndex].interaction,
                total: parseInt(document.getElementById('duration').value)
            }
        };

        this.saveProjects();
        
        // Close modal and reset form
        document.getElementById('addProjectModal').style.display = 'none';
        document.getElementById('projectForm').reset();
        
        // Update UI
        this.renderStats();
        this.renderProjects();
    }

    // Set up event listeners
    setupEventListeners() {
        document.getElementById('addProjectBtn').addEventListener('click', () => {
            this.showAddProjectModal();
            // Reset form and title for adding new project
            document.getElementById('projectForm').reset();
            document.querySelector('#addProjectModal h2').textContent = 'Add New Project';
            document.getElementById('projectForm').onsubmit = (e) => {
                e.preventDefault();
                this.handleAddProject();
            };
        });
    }
  // Add this new method
  updateTaskStatus(projectId, taskId, newStatus) {
    const projects = this.getProjects();
    const project = projects.find(p => p.id === projectId);
    if (project) {
      const task = project.tasks.find(t => t.id === taskId);
      if (task) {
        task.status = newStatus;
        this.saveProjects(projects);
      }
    }
  }

  // Add this new method
  addTask(projectId, taskType) {
    const projects = this.getProjects();
    const project = projects.find(p => p.id === projectId);
    if (project) {
      const newTaskId = project.tasks.length > 0 
        ? Math.max(...project.tasks.map(t => t.id)) + 1 
        : 1;
      
      project.tasks.push({
        id: newTaskId,
        type: taskType,
        status: "Not Started"
      });
      this.saveProjects(projects);
      this.renderProjects();
    }
  }
}

// Initialize the application
const app = new W3Drop();
