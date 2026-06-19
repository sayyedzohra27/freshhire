import { useState } from 'react';

const initialState = {
  fullName: '',
  email: '',
  phone: '',
  resumeName: '',
  coverNote: '',
};

function validate(values) {
  const errors = {};
  if (!values.fullName.trim()) errors.fullName = 'Enter your full name.';
  if (!values.email.trim()) {
    errors.email = 'Enter your email address.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Enter a valid email address.';
  }
  if (!values.phone.trim()) {
    errors.phone = 'Enter your phone number.';
  } else if (!/^[0-9]{10}$/.test(values.phone.replace(/\s/g, ''))) {
    errors.phone = 'Enter a valid 10-digit phone number.';
  }
  if (!values.resumeName) errors.resumeName = 'Upload your resume to continue.';
  return errors;
}

export default function ApplicationForm({ onSubmit }) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    setValues((prev) => ({ ...prev, resumeName: file ? file.name : '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(values);
    }
  };

  return (
    <form className="application-form" onSubmit={handleSubmit} noValidate>
      <div className="application-form__row">
        <div className={`field ${errors.fullName ? 'field--error' : ''}`}>
          <label className="field__label" htmlFor="fullName">
            Full name <span className="req">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            placeholder="e.g. Sayali Deshmukh"
            value={values.fullName}
            onChange={handleChange('fullName')}
          />
          {errors.fullName && <span className="field__error">{errors.fullName}</span>}
        </div>

        <div className={`field ${errors.phone ? 'field--error' : ''}`}>
          <label className="field__label" htmlFor="phone">
            Phone number <span className="req">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="10-digit mobile number"
            value={values.phone}
            onChange={handleChange('phone')}
          />
          {errors.phone && <span className="field__error">{errors.phone}</span>}
        </div>
      </div>

      <div className={`field ${errors.email ? 'field--error' : ''}`}>
        <label className="field__label" htmlFor="email">
          Email address <span className="req">*</span>
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={values.email}
          onChange={handleChange('email')}
        />
        {errors.email && <span className="field__error">{errors.email}</span>}
      </div>

      <div className={`field ${errors.resumeName ? 'field--error' : ''}`}>
        <label className="field__label">
          Resume <span className="req">*</span>
        </label>
        <label
          className={`application-form__file ${values.resumeName ? 'application-form__file--filled' : ''}`}
        >
          {values.resumeName || 'Click to upload your resume (PDF or DOCX)'}
          <input type="file" accept=".pdf,.doc,.docx" onChange={handleFile} />
        </label>
        {errors.resumeName && <span className="field__error">{errors.resumeName}</span>}
      </div>

      <div className="field">
        <label className="field__label" htmlFor="coverNote">
          Why should we consider you? (optional)
        </label>
        <textarea
          id="coverNote"
          placeholder="A couple of lines about why you're a good fit..."
          value={values.coverNote}
          onChange={handleChange('coverNote')}
        />
      </div>

      <button type="submit" className="btn btn--primary btn--lg btn--block">
        Submit Application
      </button>
    </form>
  );
}
