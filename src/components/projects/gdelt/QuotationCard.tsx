import React from 'react';

interface QuotationCardProps {
  quotations?: string[];
}

const QuotationCard: React.FC<QuotationCardProps> = ({ quotations }) => {
  if (!quotations || quotations.length === 0) {
    return null;
  }
  
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <h3 className="font-semibold text-gray-700 mb-2">Key Quotations</h3>
      <div className="space-y-3">
        {quotations.map((quote, idx) => (
          <div key={idx} className="text-gray-700 italic border-l-4 border-gray-300 pl-4 py-1">
            "{quote}"
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuotationCard;