import React from 'react';
import { PredictionResult } from '../types';
import Card from './UI/Card';
import Badge from './UI/Badge';
import { Clock, AlertTriangle, Info } from 'lucide-react';
import { formatDate, formatTime } from '../utils/dateUtils';

interface HistoryTableProps {
  history: PredictionResult[];
  onSelectPrediction: (prediction: PredictionResult) => void;
}

const HistoryTable: React.FC<HistoryTableProps> = ({ 
  history, 
  onSelectPrediction 
}) => {
  if (history.length === 0) {
    return (
      <Card className="w-full text-center p-8">
        <Info size={24} className="mx-auto mb-2 text-blue-500" />
        <h3 className="text-lg font-medium text-gray-700">No prediction history yet</h3>
        <p className="text-gray-500 mt-1">
          Make your first prediction to see it appear here
        </p>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Prediction History</h2>
        <div className="flex items-center text-gray-500 text-sm">
          <Clock size={16} className="mr-1" />
          <span>{history.length} predictions</span>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date & Time
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Weather
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Severity
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Confidence
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {history.map((prediction) => {
              const date = new Date(prediction.timestamp);
              const confidencePercent = Math.round(prediction.confidence * 100);
              
              return (
                <tr key={prediction.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-800">{formatDate(date)}</div>
                    <div className="text-xs text-gray-500">{formatTime(date)}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-800">{prediction.conditions.location}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-800">{prediction.conditions.weather}</div>
                    <div className="text-xs text-gray-500">{prediction.conditions.roadCondition} roads</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <SeverityBadge severity={prediction.severity} />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      {confidencePercent < 60 && (
                        <AlertTriangle size={14} className="text-yellow-500 mr-1" />
                      )}
                      <span className="text-sm text-gray-800">{confidencePercent}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right">
                    <button
                      onClick={() => onSelectPrediction(prediction)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-150"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

const SeverityBadge: React.FC<{ severity: PredictionResult['severity'] }> = ({ severity }) => {
  const variants: Record<string, { variant: 'info' | 'warning' | 'error' | 'success', label: string }> = {
    Minor: { variant: 'info', label: 'Minor' },
    Moderate: { variant: 'warning', label: 'Moderate' },
    Severe: { variant: 'error', label: 'Severe' },
    Critical: { variant: 'error', label: 'Critical' },
  };
  
  const { variant, label } = variants[severity];
  
  return (
    <Badge variant={variant}>
      {label}
    </Badge>
  );
};

export default HistoryTable;