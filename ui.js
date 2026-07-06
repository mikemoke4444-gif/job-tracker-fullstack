const UI = {
    renderJobList(jobs) {
        const jobListContainer = document.getElementById('job-list');
        jobListContainer.innerHTML = '';

        if (jobs.length === 0) {
            jobListContainer.innerHTML = `
                <div class="empty-state">
                    <h3>No applications yet.</h3>
                    <p>Fill out the form to track your first job application!</p>
                </div>
            `;
            this.updateStats([]);
            return;
        }

        jobs.forEach(job => {
            const card = document.createElement('div');
            card.className = 'job-card';
            card.innerHTML = `
                <div>
                    <h2>${job.company}</h2>
                    <p><strong>${job.position}</strong></p>
                    <p>Applied: ${new Date(job.date).toLocaleDateString('en-GB')}</p>
                    <span class="badge ${job.status}">${job.status}</span>
                </div>
                <div class="card-actions">
                    <button class="btn-edit" onclick="editJob('${job.id}')">Edit</button>
                    <button class="btn-delete" onclick="deleteJob('${job.id}')">Delete</button>
                </div>
            `;
            jobListContainer.appendChild(card);
        });

        this.updateStats(jobs);
    },

    updateStats(jobs) {
        const stats = { applied: 0, interview: 0, offer: 0, rejected: 0 };
        
        jobs.forEach(job => {
            if (stats[job.status] !== undefined) {
                stats[job.status]++;
            }
        });

        document.getElementById('count-applied').textContent = stats.applied;
        document.getElementById('count-interview').textContent = stats.interview;
        document.getElementById('count-offer').textContent = stats.offer;
        document.getElementById('count-rejected').textContent = stats.rejected;
    },

    clearForm() {
        document.getElementById('job-form').reset();
        document.getElementById('job-id').value = '';
        document.getElementById('submit-btn').textContent = 'Add Job';
        this.setDefaultDate();
    },

    setDefaultDate() {
        // Sets today's date formatted perfectly for input elements (YYYY-MM-DD)
        document.getElementById('date-applied').value = new Date().toISOString().split('T')[0];
    }
};
