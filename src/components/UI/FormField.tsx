import React from 'react';

interface FormFieldProps {
  id: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'date' | 'time';
  value: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  options?: string[];
  required?: boolean;
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  type,
  value,
  onChange,
  placeholder = '',
  options = [],
  required = false,
  className = '',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newValue = type === 'number' ? parseFloat(e.target.value) : e.target.value;
    onChange(newValue);
  };

  return (
    <div className={`mb-4 ${className}`}>
      <label 
        htmlFor={id} 
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {type === 'select' ? (
        <select
          id={id}
          value={value.toString()}
          onChange={handleChange}
          required={required}
          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-white p-2 border"
        >
          <option value="">Select {label}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          type={type}
          value={value.toString()}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
          min={type === 'number' ? 0 : undefined}
          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2 border"
        />
      )}
    </div>
  );
};

export default FormField;