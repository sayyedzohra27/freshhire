import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJobs } from '../context/JobsContext';

const CATEGORY_OPTIONS = [
  'Software Development',
  'Sales & Marketing',
  'Customer Support',
  'Operations',
  'Design',
  'Human Resources',
  'Content & Media',
  'Finance & Accounts',
];

const initialState = {
  title: '',
  company: '',
  category: CATEGORY_OPTIONS[0],
  type: 'Full-time',
  location: '',
  experience: 'Fresher',
  salaryMin: '',
  salaryMax: '',
  openings: '1',
  description: '',
  responsibilities: '',
  requirements: '',
};

function validate(values) {
  const errors = {};
  if (!values.title.trim()) errors.title = 'Job title is required.';
  if (!values.company.trim()) errors.company = 'Company name is required.';
  if (!values.location.trim()) errors.location = 'Location is required.';
  if (!values.salaryMin || Number(values.salaryMin) <= 0) errors.salaryMin = 'Enter a minimum salary.';
  if (!values.salaryMax || Number(values.salaryMax) <= 0) errors.salaryMax = 'Enter a maximum salary.';
  if (
    values.salaryMin &&
    values.salaryMax &&
    Number(values.salaryMax) < Number(values.salaryMin)
  ) {
    errors.salaryMax = 'Maximum salary should be greater than minimum.';
  }
  if (!values.description.trim()) errors.description = 'A short description helps candidates decide.';
  return errors;
}

export default function PostJob() {
  const { addJob } = useJobs();
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  const [posted, setPosted] = useState(null);

  const handleChange = (field) => (e) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const addSkill = () => {
    const value = skillInput.trim();
    if (value && !skills.includes(value)) {
      setSkills((prev) => [...prev, value]);
    }
    setSkillInput('');
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addSkill();
    }
  };

  const removeSkill = (skill) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const newJob = addJob({
      title: values.title.trim(),
      company: values.company.trim(),
      category: values.category,
      type: values.type,
      location: values.location.trim(),
      experience: values.experience,
      salaryMin: Number(values.salaryMin),
      salaryMax: Number(values.salaryMax),
      openings: Number(values.openings) || 1,
      skills: skills.length ? skills : ['Communication'],
      description: values.description.trim(),
      responsibilities: values.responsibilities
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean),
      requirements: values.requirements
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean),
    });

    setPosted(newJob);
  };

  if (posted) {
    return (
      <div className="page-body container">
        <div className="post-job-form">
          <div className="application-form__success">
            <div className="application-form__success-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3>Job posted successfully</h3>
            <p>"{posted.title}" at {posted.company} is now live on FreshHire and visible to job seekers.</p>
            <div className="flex-gap-3 flex-center" style={{ marginTop: '1.5rem' }}>
              <button type="button" className="btn btn--outline" onClick={() => navigate('/jobs')}>
                View All Jobs
              </button>
              <button type="button" className="btn btn--primary" onClick={() => navigate(`/jobs/${posted.id}`)}>
                View Posting
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Post a Job</h1>
          <p>Reach freshers across Pune actively looking for their first role.</p>
        </div>
      </div>

      <div className="page-body container">
        <form className="post-job-form" onSubmit={handleSubmit} noValidate>
          <div className="post-job-form__section-title">Job basics</div>

          <div className="application-form__row">
            <div className={`field ${errors.title ? 'field--error' : ''}`}>
              <label className="field__label" htmlFor="title">Job title <span className="req">*</span></label>
              <input id="title" type="text" placeholder="e.g. Junior Frontend Developer" value={values.title} onChange={handleChange('title')} />
              {errors.title && <span className="field__error">{errors.title}</span>}
            </div>
            <div className={`field ${errors.company ? 'field--error' : ''}`}>
              <label className="field__label" htmlFor="company">Company name <span className="req">*</span></label>
              <input id="company" type="text" placeholder="e.g. Trinetra Softworks" value={values.company} onChange={handleChange('company')} />
              {errors.company && <span className="field__error">{errors.company}</span>}
            </div>
          </div>

          <div className="application-form__row">
            <div className="field">
              <label className="field__label" htmlFor="category">Category</label>
              <select id="category" value={values.category} onChange={handleChange('category')}>
                {CATEGORY_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div className="field">
              <label className="field__label" htmlFor="type">Job type</label>
              <select id="type" value={values.type} onChange={handleChange('type')}>
                <option>Full-time</option>
                <option>Internship</option>
                <option>Part-time</option>
                <option>Contract</option>
              </select>
            </div>
          </div>

          <div className="application-form__row">
            <div className={`field ${errors.location ? 'field--error' : ''}`}>
              <label className="field__label" htmlFor="location">Location <span className="req">*</span></label>
              <input id="location" type="text" placeholder="e.g. Hinjawadi, Pune" value={values.location} onChange={handleChange('location')} />
              {errors.location && <span className="field__error">{errors.location}</span>}
            </div>
            <div className="field">
              <label className="field__label" htmlFor="experience">Experience level</label>
              <select id="experience" value={values.experience} onChange={handleChange('experience')}>
                <option>Fresher</option>
                <option>0-1 years</option>
                <option>1-2 years</option>
              </select>
            </div>
          </div>

          <div className="post-job-form__section-title">Compensation & openings</div>

          <div className="application-form__row">
            <div className={`field ${errors.salaryMin ? 'field--error' : ''}`}>
              <label className="field__label" htmlFor="salaryMin">Minimum salary (₹/month) <span className="req">*</span></label>
              <input id="salaryMin" type="number" placeholder="e.g. 20000" value={values.salaryMin} onChange={handleChange('salaryMin')} />
              {errors.salaryMin && <span className="field__error">{errors.salaryMin}</span>}
            </div>
            <div className={`field ${errors.salaryMax ? 'field--error' : ''}`}>
              <label className="field__label" htmlFor="salaryMax">Maximum salary (₹/month) <span className="req">*</span></label>
              <input id="salaryMax" type="number" placeholder="e.g. 30000" value={values.salaryMax} onChange={handleChange('salaryMax')} />
              {errors.salaryMax && <span className="field__error">{errors.salaryMax}</span>}
            </div>
          </div>

          <div className="field" style={{ maxWidth: '240px' }}>
            <label className="field__label" htmlFor="openings">Number of openings</label>
            <input id="openings" type="number" min="1" value={values.openings} onChange={handleChange('openings')} />
          </div>

          <div className="post-job-form__section-title">Role details</div>

          <div className="field">
            <label className="field__label">Required skills</label>
            <div className="skills-input">
              {skills.map((skill) => (
                <span key={skill} className="tag tag--sprout">
                  {skill}
                  <button type="button" onClick={() => removeSkill(skill)} aria-label={`Remove ${skill}`}>×</button>
                </span>
              ))}
              <input
                type="text"
                placeholder={skills.length ? 'Add another skill...' : 'e.g. React, Communication'}
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleSkillKeyDown}
                onBlur={addSkill}
              />
            </div>
          </div>

          <div className={`field ${errors.description ? 'field--error' : ''}`}>
            <label className="field__label" htmlFor="description">Job description <span className="req">*</span></label>
            <textarea
              id="description"
              placeholder="Describe the role, the team, and what makes this a great first job..."
              value={values.description}
              onChange={handleChange('description')}
            />
            {errors.description && <span className="field__error">{errors.description}</span>}
          </div>

          <div className="field">
            <label className="field__label" htmlFor="responsibilities">Key responsibilities</label>
            <textarea
              id="responsibilities"
              placeholder={'One per line, e.g.\nBuild and style UI components\nFix bugs reported by QA'}
              value={values.responsibilities}
              onChange={handleChange('responsibilities')}
            />
          </div>

          <div className="field">
            <label className="field__label" htmlFor="requirements">Requirements</label>
            <textarea
              id="requirements"
              placeholder={'One per line, e.g.\nDegree in Computer Science or related field\nBasic understanding of JavaScript'}
              value={values.requirements}
              onChange={handleChange('requirements')}
            />
          </div>

          <button type="submit" className="btn btn--primary btn--lg btn--block">
            Post Job
          </button>
        </form>
      </div>
    </>
  );
}
