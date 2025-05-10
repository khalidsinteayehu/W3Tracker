class ProjectDetail {
    constructor() {
        this.projectId = new URLSearchParams(window.location.search).get('id');
        this.projectManager = new ProjectManager();
        this.project = this.projectManager.getProjectById(parseInt(this.projectId));
        
        this.init();
    }

    init() {
        if (!this.project) {
            window.location.href = '../index.html';
            return;
        }

        this.renderProjectDetails();
        this.setupEventListeners();
    }

    renderProjectDetails() {
        document.getElementById('projectName').textContent = this.project.name;
        document.title = `W3Tracker - ${this.project.name}`;
        
        // Update progress
        const progress = this.calculateProgress();
        document.getElementById('progressFill').style.width = `${progress}%`;
        document.getElementById('progressText').textContent = `${progress}% Complete`;
    }

    calculateProgress() {
        // Your progress calculation logic here
        return Math.min(100, Math.floor((this.project.completedTasks / this.project.totalTasks) * 100));
    }

    setupEventListeners() {
        document.getElementById('calculateBtn').addEventListener('click', () => {
            this.estimateEarnings();
        });
    }

    estimateEarnings() {
        const rank = parseInt(document.getElementById('inputRank').value.replace(/\D/g,''));
        const supply = parseInt(document.getElementById('inputSupply').value.replace(/\D/g,''));
        
        if (!rank || !supply) {
            alert('Please enter valid numbers');
            return;
        }

        // Simple estimation formula - adjust as needed
        const estimatedTokens = supply / rank;
        const estimatedValue = estimatedTokens * (this.project.tokenPrice || 0.1);
        
        document.getElementById('earningsResult').innerHTML = `
            <p>Estimated Tokens: <strong>${estimatedTokens.toLocaleString()}</strong></p>
            <p>Estimated Value: <strong>$${estimatedValue.toLocaleString()}</strong></p>
        `;
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    new ProjectDetail();
});class ProjectDetail {
    constructor() {
        this.projectId = new URLSearchParams(window.location.search).get('id');
        this.projectManager = new ProjectManager();
        this.project = this.projectManager.getProjectById(parseInt(this.projectId));
        
        this.init();
    }

    init() {
        if (!this.project) {
            window.location.href = '../index.html';
            return;
        }

        this.renderProjectDetails();
        this.setupEventListeners();
    }

    renderProjectDetails() {
        document.getElementById('projectName').textContent = this.project.name;
        document.title = `W3Tracker - ${this.project.name}`;
        
        // Update progress
        const progress = this.calculateProgress();
        document.getElementById('progressFill').style.width = `${progress}%`;
        document.getElementById('progressText').textContent = `${progress}% Complete`;
    }

    calculateProgress() {
        // Your progress calculation logic here
        return Math.min(100, Math.floor((this.project.completedTasks / this.project.totalTasks) * 100));
    }

    setupEventListeners() {
        document.getElementById('calculateBtn').addEventListener('click', () => {
            this.estimateEarnings();
        });
    }

    estimateEarnings() {
        const rank = parseInt(document.getElementById('inputRank').value.replace(/\D/g,''));
        const supply = parseInt(document.getElementById('inputSupply').value.replace(/\D/g,''));
        
        if (!rank || !supply) {
            alert('Please enter valid numbers');
            return;
        }

        // Simple estimation formula - adjust as needed
        const estimatedTokens = supply / rank;
        const estimatedValue = estimatedTokens * (this.project.tokenPrice || 0.1);
        
        document.getElementById('earningsResult').innerHTML = `
            <p>Estimated Tokens: <strong>${estimatedTokens.toLocaleString()}</strong></p>
            <p>Estimated Value: <strong>$${estimatedValue.toLocaleString()}</strong></p>
        `;
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    new ProjectDetail();
});
