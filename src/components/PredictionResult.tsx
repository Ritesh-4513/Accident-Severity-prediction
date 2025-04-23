import React from 'react';
import { PredictionResult, SeverityInfo } from '../types';
import Card from './UI/Card';
import { severityInfoMap } from '../data/mockData';
import { formatRelative } from '../utils/dateUtils';

interface PredictionResultProps {
  prediction: PredictionResult | null;
}

const PredictionResultComponent: React.FC<PredictionResultProps> = ({ prediction }) => {
  if (!prediction) return null;
  
  const severityInfo: SeverityInfo = severityInfoMap[prediction.severity];
  const confidencePercentage = Math.round(prediction.confidence * 100);
  
  return (
    <Card 
      className="mb-8 w-full max-w-3xl mx-auto transform transition-all duration-500 animate-fadeIn" 
      elevation="lg"
    >
      <div className="text-center mb-6">
        <span className="text-sm text-gray-500">Prediction made {formatRelative(new Date(prediction.timestamp))}</span>
      </div>
      
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Accident Severity Prediction</h2>
      
      <div className="mb-8">
        <div className={`${severityInfo.color} ${severityInfo.textColor} rounded-lg p-6 text-center mb-4`}>
          <h3 className="text-3xl font-bold mb-2">
            {prediction.severity} Severity
          </h3>
          <p className="text-lg">{severityInfo.description}</p>
        </div>
        
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-gray-700">Confidence Level:</span>
            <span className="font-bold text-gray-800">{confidencePercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className={`h-4 rounded-full ${getConfidenceColorClass(prediction.confidence)}`}
              style={{ width: `${confidencePercentage}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {getConfidenceDescription(prediction.confidence)}
          </p>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-6">
        <h4 className="font-medium text-lg mb-4 text-gray-700">Input Conditions:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(prediction.conditions).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <span className="text-gray-600">{formatConditionName(key)}:</span>
              <span className="font-medium text-gray-800">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

// Helper functions
const getConfidenceColorClass = (confidence: number): string => {
  if (confidence >= 0.9) return 'bg-green-500';
  if (confidence >= 0.7) return 'bg-blue-500';
  if (confidence >= 0.5) return 'bg-yellow-500';
  return 'bg-red-500';
};

const getConfidenceDescription = (confidence: number): string => {
  if (confidence >= 0.9) return 'Very high confidence in this prediction';
  if (confidence >= 0.7) return 'Good confidence in this prediction';
  if (confidence >= 0.5) return 'Moderate confidence in this prediction';
  return 'Low confidence in this prediction, consider additional factors';
};

const formatConditionName = (key: string): string => {
  // Convert camelCase to Title Case with spaces
  return key
    .replace(/([A-Z])/g, ' $1') // Insert a space before all capital letters
    .replace(/^./, (str) => str.toUpperCase()) // Capitalize the first letter
    .trim();
};

export default PredictionResultComponent;