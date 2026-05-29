import React, { useState } from 'react';
function JobCard({ title, company, location, jobType }) {
  const [saveJob, setSaveJob] = useState(false);
  return (
    <div className="job-card">
      <h3>{title}</h3>
      <p className="company">{company}</p>
      <p className="location">{location}</p>
      <span className={`badge ${jobType.toLowerCase()}`}>{jobType}</span>
      <button
  className={saveJob ? "saved-btn" : "btn"}
  onClick={() => setSaveJob(!saveJob)}
>
  {saveJob ? "Saved" : "Save Job"}
</button>


    </div>
  );
}

export default JobCard;
