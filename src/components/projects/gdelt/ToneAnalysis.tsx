import React from 'react';
import { GdeltTone } from './types';

interface ToneAnalysisProps {
  tone?: GdeltTone;
}

const ToneAnalysis: React.FC<ToneAnalysisProps> = ({ tone }) => {
  if (!tone) {
    return (
      <div className="bg-white p-4 rounded-lg shadow mb-4 text-gray-700">
        No tone data available for this version.
      </div>
    );
  }
  
  const renderBar = (value: number) => {
    const clamped = Math.max(Math.min(value, 10), -10);
    const normalized = ((clamped + 10) / 20) * 100;
    
    return (
      <div className="relative h-2 bg-gradient-to-r from-red-500 via-gray-200 to-blue-500 rounded">
        <div
          className="absolute"
          style={{
            left: normalized + "%",
            transform: "translateX(-50%)",
          }}
        >
          ▲
        </div>
      </div>
    );
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <h3 className="font-semibold text-gray-700 mb-4">Tone Analysis</h3>
      <p className="text-sm text-gray-600 mb-4">
        Metrics are scaled from -10 (negative) to +10 (positive). Higher
        polarity indicates more emotional intensity.
      </p>
      {Object.entries(tone).map(([key, value]) => {
        if (key === "wordCount") {
          return (
            <div key={key} className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700">{key}</span>
                <span className="text-gray-800">{value}</span>
              </div>
            </div>
          );
        }
        return (
          <div key={key} className="mb-3">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-700">{key}</span>
              <span className="text-gray-800">{value.toFixed(2)}</span>
            </div>
            {renderBar(value)}
          </div>
        );
      })}
    </div>
  );
};

export default ToneAnalysis;