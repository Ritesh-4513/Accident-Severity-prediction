export interface AccidentCondition {
  id: string;
  name: string;
  type: 'select' | 'text' | 'number' | 'time' | 'date';
  options?: string[];
  placeholder?: string;
  required?: boolean;
}

export interface PredictionResult {
  id: string;
  timestamp: string;
  severity: 'Minor' | 'Moderate' | 'Severe' | 'Critical';
  confidence: number;
  conditions: Record<string, string | number>;
}

export type SeverityLevel = 'Minor' | 'Moderate' | 'Severe' | 'Critical';

export interface SeverityInfo {
  color: string;
  textColor: string;
  description: string;
}