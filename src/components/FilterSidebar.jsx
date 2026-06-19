const SALARY_OPTIONS = [
  { value: 0, label: 'Any salary' },
  { value: 15000, label: '₹15k and above' },
  { value: 20000, label: '₹20k and above' },
  { value: 25000, label: '₹25k and above' },
  { value: 30000, label: '₹30k and above' },
];

function FilterGroup({ title, options, selected, onToggle }) {
  return (
    <div className="filter-sidebar__section">
      <span className="filter-sidebar__label">{title}</span>
      {options.map((opt) => (
        <label key={opt.name} className="filter-sidebar__option">
          <input
            type="checkbox"
            checked={selected.includes(opt.name)}
            onChange={() => onToggle(opt.name)}
          />
          {opt.name}
          <span className="filter-sidebar__count">{opt.count}</span>
        </label>
      ))}
    </div>
  );
}

export default function FilterSidebar({
  categories,
  jobTypes,
  experienceLevels,
  filters,
  onToggleCategory,
  onToggleType,
  onToggleExperience,
  onMinSalaryChange,
  onClear,
  className = '',
}) {
  return (
    <aside className={`filter-sidebar ${className}`}>
      <div className="filter-sidebar__head">
        <h3>Filters</h3>
        <button type="button" className="filter-sidebar__clear" onClick={onClear}>
          Clear all
        </button>
      </div>

      <FilterGroup
        title="Category"
        options={categories}
        selected={filters.category}
        onToggle={onToggleCategory}
      />
      <FilterGroup
        title="Job type"
        options={jobTypes}
        selected={filters.type}
        onToggle={onToggleType}
      />
      <FilterGroup
        title="Experience"
        options={experienceLevels}
        selected={filters.experience}
        onToggle={onToggleExperience}
      />

      <div className="filter-sidebar__section">
        <span className="filter-sidebar__label">Minimum salary</span>
        <select
          className="filter-sidebar__select"
          value={filters.minSalary}
          onChange={(e) => onMinSalaryChange(Number(e.target.value))}
        >
          {SALARY_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </aside>
  );
}
