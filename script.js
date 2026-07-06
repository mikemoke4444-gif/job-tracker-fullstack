// Initialization
document.addEventListener('DOMContentLoaded', () => {
    UI.setDefaultDate();
    initApp();

    // Attach Event Listeners
    document.getElementById('job-form').addEventListener('submit', handleFormSubmit);
    document.getElementById('search-input').addEventListener('input', initApp);
    document.getElementById('filter-status').addEventListener('change', initApp);
    document.getElementById('sort-order').addEventListener('change', initApp);
});

function initApp() {
    let jobs = Storage.getJobs();

    // 1. Filter by Search Query
    const searchQuery = document.getElementById('search-input').value.toLowerCase();
    if (searchQuery) {
        jobs = jobs.filter(job => 
            job.company.toLowerCase().includes(searchQuery) || 
            job.position.toLowerCase().includes(searchQuery)
        );
    }

    // 2. Filter by Status Dropdown
    const filterStatus = document.getElementById('filter-status').value;
    if (filterStatus !== 'all') {
        jobs = jobs.filter(job => job.status === filterStatus);
    }

    // 3. Sort Order
    const sortOrder = document.getElementById('sort-order').value;
    jobs.sort((a, b) => {
        return sortOrder === 'newest' 
            ? new Date(b.date) - new Date(a.date) 
            : new Date(a.date) - new Date(b.date);
    });

    UI.renderJobList(jobs);
}

// Create or Update Form Actions
function handleFormSubmit(e) {
    e.preventDefault();

    const id = document.getElementById('job-id').value;
    const company = document.getElementById('company').value;
    const position = document.getElementById('position').value;
    const status = document.getElementById('status').value;
    const date = document.getElementById('date-applied').value;

    const jobData = { id: id || Date.now().toString(), company, position, status, date };

    if (id) {
        Storage.updateJob(jobData);
    } else {
        Storage.addJob(jobData);
    }

    UI.clearForm();
    initApp();
}

// Global actions exposed to modern buttons generated inside cards
window.deleteJob = function(id) {
    if (confirm('Are you sure you want to remove this application?')) {
        Storage.deleteJob(id);
        initApp();
    }
};

window.editJob = function(id) {
    const jobs = Storage.getJobs();
    const jobToEdit = jobs.find(job => job.id === id);

    if (jobToEdit) {
        document.getElementById('job-id').value = jobToEdit.id;
        document.getElementById('company').value = jobToEdit.company;
        document.getElementById('position').value = jobToEdit.position;
        document.getElementById('status').value = jobToEdit.status;
        document.getElementById('date-applied').value = jobToEdit.date;

        document.getElementById('submit-btn').textContent = 'Update Job';
        document.getElementById('company').focus();
    }
};
