import React, { useState } from "react";
import "./app.css";
import Header from "./components/Header";
import JobCard from "./components/JobCard";
import CompanyFooter from "./components/Footer";

function App() {
  const [searchJob, setSearchJob] = useState("");

  const jobsData = [

    {
      title: "Frontend Developer",
      company: "Google",
      location: "Pune",
      jobType: "Full Time"
    },

    {
      title: "Backend Developer",
      company: "Microsoft",
      location: "Mumbai",
      jobType: "Internship"
    },

    {
      title: "UI Designer",
      company: "Amazon",
      location: "Delhi",
      jobType: "Full Time"
    },

    {
      title: "React Developer",
      company: "Netflix",
      location: "Hyderabad",
      jobType: "Internship"
    },

    {
      title: "Software Engineer",
      company: "IBM",
      location: "Bangalore",
      jobType: "Full Time"
    }

  ];

  const FilteredJobs = jobsData.filter((job) =>
    job.title.toLowerCase().includes(searchJob.toLowerCase())
  );


  return (

    <div>

      <Header />
<input className="search-input"
type="text"
placeholder="Search Jobs ⌕"
value={searchJob}
onChange={(event) => setSearchJob(event.target.value)}
/>
      {
        FilteredJobs.map((job) => (

          <JobCard
            title={job.title}
            company={job.company}
            location={job.location}
            jobType={job.jobType}

          />

        ))
      }

      <CompanyFooter />

    </div>

  );
}

export default App;