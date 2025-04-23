import React, { useState } from 'react';
import { AccidentCondition } from '../types';
import Button from './UI/Button';
import Card from './UI/Card';
import FormField from './UI/FormField';
import { AlertCircle } from 'lucide-react';

interface PredictionFormProps {
  conditions: AccidentCondition[];
  onSubmit: (formData: Record<string, string | number>) => void;
  isLoading: boolean;
}

const PredictionForm: React.FC<PredictionFormProps> = ({ 
  conditions, 
  onSubmit, 
  isLoading 
}) => {
  // Initialize form data with empty values
  const initialFormData = conditions.reduce((acc, condition) => {
    acc[condition.id] = condition.type === 'number' ? 0 : '';
    return acc;
  }, {} as Record<string, string | number>);

  const [formData, setFormData] = useState<Record<string, string | number>>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (id: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    
    // Clear error for this field if it exists
    if (errors[id]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    conditions.forEach((condition) => {
      if (condition.required) {
        const value = formData[condition.id];
        if (value === '' || (condition.type === 'number' && value === 0)) {
          newErrors[condition.id] = `${condition.name} is required`;
        }
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <Card className="mb-8 w-full max-w-3xl mx-auto transition-all duration-300">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Enter Accident Conditions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          {conditions.map((condition) => (
            <FormField
              key={condition.id}
              id={condition.id}
              label={condition.name}
              type={condition.type}
              value={formData[condition.id]}
              onChange={(value) => handleChange(condition.id, value)}
              placeholder={condition.placeholder}
              options={condition.options}
              required={condition.required}
            />
          ))}
        </div>
        
        {Object.keys(errors).length > 0 && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center text-red-600 mb-2">
              <AlertCircle size={16} className="mr-1" />
              <span className="font-medium">Please correct the following errors:</span>
            </div>
            <ul className="list-disc pl-5 text-sm text-red-600">
              {Object.values(errors).map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="mt-6">
          <Button 
            type="submit" 
            variant="primary" 
            size="lg" 
            isLoading={isLoading}
            fullWidth
          >
            Predict Accident Severity
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default PredictionForm;