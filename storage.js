const Storage = {
    STORAGE_KEY: 'job_tracker_applications',

    getJobs() {
        const jobs = localStorage.getItem(this.STORAGE_KEY);
        return jobs ? JSON.parse(jobs) : [];
    },

    saveJobs(jobs) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(jobs));
    },

    addJob(job) {
        const jobs = this.getJobs();
        jobs.push(job);
        this.saveJobs(jobs);
    },

    updateJob(updatedJob) {
        let jobs = this.getJobs();
        jobs = jobs.map(job => job.id === updatedJob.id ? updatedJob : job);
        this.saveJobs(jobs);
    },

    deleteJob(id) {
        let jobs = this.getJobs();
        jobs = jobs.filter(job => job.id !== id);
        this.saveJobs(jobs);
    }
};
