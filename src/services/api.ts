import { PredictionResult } from '../types';
import { mockHistoryData } from '../data/mockData';

// Simulate API call to predict accident severity
export const predictAccidentSeverity = async (conditions: Record<string, string | number>): Promise<PredictionResult> => {
  // In a real app, this would be an API call to the backend model
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      // Generate a mock prediction based on conditions
      const severityOptions: PredictionResult['severity'][] = ['Minor', 'Moderate', 'Severe', 'Critical'];
      
      // Simplified mock logic to determine severity based on conditions
      let severityIndex = 0;
      
      // Weather affects severity
      if (conditions.weather === 'Snow' || conditions.weather === 'Fog') {
        severityIndex += 2;
      } else if (conditions.weather === 'Rain') {
        severityIndex += 1;
      }
      
      // Road condition affects severity
      if (conditions.roadCondition === 'Icy') {
        severityIndex += 2;
      } else if (conditions.roadCondition === 'Wet') {
        severityIndex += 1;
      }
      
      // Visibility affects severity
      const visibility = Number(conditions.visibilityMeters);
      if (visibility < 200) {
        severityIndex += 2;
      } else if (visibility < 500) {
        severityIndex += 1;
      }
      
      // Cap severity index at 3 (Critical)
      severityIndex = Math.min(severityIndex, 3);
      
      // Calculate confidence (random but weighted)
      const confidence = 0.7 + (Math.random() * 0.25);
      
      // Create prediction result
      const result: PredictionResult = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        severity: severityOptions[severityIndex],
        confidence,
        conditions: {...conditions},
      };
      
      resolve(result);
    }, 1500); // 1.5 seconds delay to simulate processing
  });
};

// Get prediction history
export const getPredictionHistory = async (): Promise<PredictionResult[]> => {
  // In a real app, this would fetch from the backend
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockHistoryData]);
    }, 500);
  });
};

// Save prediction to history
export const savePrediction = async (prediction: PredictionResult): Promise<boolean> => {
  // In a real app, this would save to the backend
  return new Promise((resolve) => {
    setTimeout(() => {
      mockHistoryData.unshift(prediction);
      resolve(true);
    }, 300);
  });
};