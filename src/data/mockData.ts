import { AccidentCondition, PredictionResult } from '../types';

export const accidentConditions: AccidentCondition[] = [
  {
    id: 'weather',
    name: 'Weather Condition',
    type: 'select',
    options: ['Clear', 'Rain', 'Snow', 'Fog', 'Sleet', 'Hail'],
    required: true,
  },
  {
    id: 'time',
    name: 'Time of Day',
    type: 'time',
    required: true,
  },
  {
    id: 'date',
    name: 'Date',
    type: 'date',
    required: true,
  },
  {
    id: 'location',
    name: 'Location Type',
    type: 'select',
    options: ['Highway', 'Urban', 'Rural', 'Intersection', 'Bridge', 'Tunnel'],
    required: true,
  },
  {
    id: 'speedLimit',
    name: 'Speed Limit (mph)',
    type: 'number',
    required: true,
  },
  {
    id: 'trafficDensity',
    name: 'Traffic Density',
    type: 'select',
    options: ['Low', 'Medium', 'High'],
    required: true,
  },
  {
    id: 'roadCondition',
    name: 'Road Condition',
    type: 'select',
    options: ['Dry', 'Wet', 'Icy', 'Snow Covered', 'Under Construction'],
    required: true,
  },
  {
    id: 'visibilityMeters',
    name: 'Visibility (meters)',
    type: 'number',
    required: true,
  },
];

export const mockHistoryData: PredictionResult[] = [
  {
    id: '1',
    timestamp: '2025-03-15T09:23:45',
    severity: 'Moderate',
    confidence: 0.78,
    conditions: {
      weather: 'Rain',
      time: '09:23',
      date: '2025-03-15',
      location: 'Urban',
      speedLimit: 35,
      trafficDensity: 'Medium',
      roadCondition: 'Wet',
      visibilityMeters: 500,
    },
  },
  {
    id: '2',
    timestamp: '2025-03-12T18:05:12',
    severity: 'Severe',
    confidence: 0.92,
    conditions: {
      weather: 'Fog',
      time: '18:05',
      date: '2025-03-12',
      location: 'Highway',
      speedLimit: 65,
      trafficDensity: 'High',
      roadCondition: 'Wet',
      visibilityMeters: 150,
    },
  },
  {
    id: '3',
    timestamp: '2025-03-10T14:30:22',
    severity: 'Minor',
    confidence: 0.85,
    conditions: {
      weather: 'Clear',
      time: '14:30',
      date: '2025-03-10',
      location: 'Rural',
      speedLimit: 45,
      trafficDensity: 'Low',
      roadCondition: 'Dry',
      visibilityMeters: 1000,
    },
  },
];

export const severityInfoMap: Record<string, { color: string; textColor: string; description: string }> = {
  Minor: {
    color: 'bg-blue-100',
    textColor: 'text-blue-800',
    description: 'Minor injuries or property damage only',
  },
  Moderate: {
    color: 'bg-yellow-100',
    textColor: 'text-yellow-800',
    description: 'Non-life-threatening injuries requiring medical attention',
  },
  Severe: {
    color: 'bg-orange-100',
    textColor: 'text-orange-800',
    description: 'Serious injuries that may be life-threatening',
  },
  Critical: {
    color: 'bg-red-100',
    textColor: 'text-red-800',
    description: 'Life-threatening injuries with high risk of fatality',
  },
};