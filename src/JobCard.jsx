import "./app.css";
import React from "react";

function JobCard({ title, company, location, jobType }) {

  return (
    <div className="job-card">

      <h2>{title}</h2>

      <p>{company}</p>

      <p>{location}</p>

      <p className="badge">{jobType}</p>

    </div>
  );
}

export default JobCard;