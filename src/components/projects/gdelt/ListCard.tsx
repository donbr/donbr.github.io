import React, { useState } from 'react';

interface ListCardProps {
  title: string;
  items: string[] | any[];
  type?: 'simple' | 'enhanced';
}

const ListCard: React.FC<ListCardProps> = ({ title, items, type = 'simple' }) => {
  const [showAll, setShowAll] = useState(false);
  
  if (!items || items.length === 0) {
    return null;
  }
  
  const displayedItems = showAll ? items : items.slice(0, 10);
  
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <h3 className="font-semibold text-gray-700 mb-2">{title}</h3>
      <div className="space-y-2">
        {displayedItems.map((item, idx) => {
          if (type === 'simple') {
            return (
              <div key={idx} className="text-gray-700">
                {item}
              </div>
            );
          } else if (type === 'enhanced') {
            return (
              <div
                key={idx}
                className="flex justify-between text-gray-700 border-b pb-1"
              >
                <span>{(item as any).name || (item as any).theme || (item as any).quote}</span>
                <span className="text-gray-500">Offset: {(item as any).offset}</span>
              </div>
            );
          }
          return null;
        })}
      </div>
      {items.length > 10 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-blue-500 text-sm mt-2"
        >
          {showAll ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
};

export default ListCard;