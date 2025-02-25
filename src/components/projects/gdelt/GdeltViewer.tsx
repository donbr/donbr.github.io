import React from 'react';
import { formatGdeltDate, truncateString } from '@/lib/utils';
import { useGdeltViewer } from './useGdeltViewer';
import MapView from './MapView';
import ListCard from './ListCard';
import QuotationCard from './QuotationCard';
import ToneAnalysis from './ToneAnalysis';

const GdeltViewer: React.FC = () => {
  const {
    records,
    selectedRecord,
    setSelectedRecord,
    activeTab,
    setActiveTab,
    activeVersion,
    setActiveVersion,
    searchTerm,
    setSearchTerm,
    isLoading,
    error,
    filteredRecordKeys
  } = useGdeltViewer();

  // Tooltips for version tabs
  const versionTooltips: Record<string, string> = {
    v1: "Basic record data",
    v2: "Enhanced data with offsets",
    v2_1: "Includes quotations and additional metadata",
  };
  
  // Render metadata as a grid table
  const renderMetadataGrid = (metadata: any) => (
    <div className="overflow-x-auto">
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(metadata).map(([key, value]) => {
          if (key === "quotations") return null; // Skip quotations, handled separately
          
          return (
            <div key={key} className="text-gray-700">
              <span className="font-semibold">{key}:</span>{" "}
              {key === "documentIdentifier" ? (
                <a
                  href={value as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  {value as string}
                </a>
              ) : (
                <span>{key === 'date' ? formatGdeltDate(value as string) : value as string}</span>
              )}
            </div>
          );
        })}
      </div>
      
      {metadata.quotations && <QuotationCard quotations={metadata.quotations} />}
    </div>
  );
  
  // Render content based on the active tab
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="bg-red-100 text-red-700 p-4 rounded-md">
          <h3 className="font-bold">Error Loading Data</h3>
          <p>{error}</p>
        </div>
      );
    }
    
    if (!selectedRecord) return <p>Select a record to view details</p>;
    
    const record = records[selectedRecord];
    const versionData = record[activeVersion as keyof typeof record];
    
    if (!versionData) {
      return (
        <div className="p-4 bg-yellow-100 text-yellow-800 rounded-md">
          Data for {activeVersion} is not available for this record.
        </div>
      );
    }
    
    switch (activeTab) {
      case "metadata":
        return renderMetadataGrid(record.metadata);
        
      case "themes":
        if (activeVersion === "v1") {
          return (
            <div className="flex flex-wrap gap-2">
              {record.v1.themes.map((theme: string, idx: number) => (
                <span
                  key={idx}
                  className="bg-gray-100 px-2 py-1 rounded text-gray-700 cursor-pointer"
                >
                  #{theme}
                </span>
              ))}
            </div>
          );
        } else if (activeVersion === "v2" && record.v2?.enhancedThemes) {
          return (
            <div className="flex flex-wrap gap-2">
              {record.v2.enhancedThemes.map((item: any, idx: number) => (
                <span
                  key={idx}
                  className="bg-gray-100 px-2 py-1 rounded text-gray-700 cursor-pointer"
                >
                  #{item.theme} (Offset: {item.offset})
                </span>
              ))}
            </div>
          );
        } else {
          // Fallback to v1 themes
          return (
            <div className="flex flex-wrap gap-2">
              {record.v1.themes.map((theme: string, idx: number) => (
                <span
                  key={idx}
                  className="bg-gray-100 px-2 py-1 rounded text-gray-700 cursor-pointer"
                >
                  #{theme}
                </span>
              ))}
            </div>
          );
        }
        
      case "entities":
        if (activeVersion === "v1") {
          return (
            <>
              <ListCard title="Persons" items={record.v1.persons} />
              <ListCard title="Organizations" items={record.v1.organizations} />
            </>
          );
        } else if (activeVersion === "v2" && record.v2) {
          return (
            <>
              <ListCard
                title="Enhanced Persons"
                items={record.v2.enhancedPersons || []}
                type="enhanced"
              />
              <ListCard
                title="Enhanced Organizations"
                items={record.v2.enhancedOrganizations || []}
                type="enhanced"
              />
            </>
          );
        } else if (activeVersion === "v2_1" && record.v2_1) {
          return (
            <>
              <ListCard
                title="Quotations"
                items={record.v2_1.quotations || []}
                type="enhanced"
              />
              <ListCard title="All Names" items={record.v2_1.allNames || []} />
              <ListCard
                title="Amounts"
                items={record.v2_1.amounts || []}
                type="enhanced"
              />
            </>
          );
        }
        return <p>No entity data available for this version.</p>;
        
      case "tone":
        return <ToneAnalysis tone={record.v1.tone} />;
        
      case "map":
        return record.v1.locations ? (
          <MapView locations={record.v1.locations} />
        ) : (
          <p className="text-gray-700">No location data available.</p>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg">
        {/* Left Sidebar: Record List & Search */}
        <div
          className="w-full md:w-64 p-4 bg-gray-50 border-r overflow-y-auto"
          style={{ maxHeight: "80vh" }}
        >
          <h2 className="font-bold text-gray-700 mb-4">Records</h2>
          <input
            type="text"
            placeholder="Search by source or date..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded mb-4 text-gray-700"
          />
          
          {filteredRecordKeys.map((id) => {
            const rec = records[id];
            const primaryLocation =
              rec.v1.locations && rec.v1.locations.length > 0
                ? rec.v1.locations[0].name
                : "No location";
                
            return (
              <div
                key={id}
                onClick={() => {
                  setSelectedRecord(id);
                  setActiveTab("metadata");
                }}
                className={`cursor-pointer p-2 mb-2 rounded ${
                  selectedRecord === id
                    ? "bg-blue-100 border-l-4 border-blue-500"
                    : "hover:bg-gray-100"
                }`}
              >
                <h3 className="font-semibold text-gray-800">
                  {rec.metadata.sourceCommonName}
                </h3>
                <p className="text-sm text-gray-600">{formatGdeltDate(rec.metadata.date)}</p>
                <p className="text-xs text-gray-500">
                  Location: {truncateString(primaryLocation, 20)}
                </p>
              </div>
            );
          })}
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 p-6">
          {/* Version Selector Tabs */}
          <div className="mb-4 border-b">
            <div className="flex">
              {["v1", "v2", "v2_1"].map((version) => (
                <button
                  key={version}
                  onClick={() => setActiveVersion(version)}
                  className={`px-4 py-2 ${
                    activeVersion === version
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                  title={versionTooltips[version]}
                >
                  {version}
                </button>
              ))}
            </div>
          </div>
          
          {/* Content Tabs */}
          <div className="sticky top-0 bg-white z-10 border-b mb-4">
            {["metadata", "themes", "entities", "tone", "map"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 ${
                  activeTab === tab
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          
          {/* Content Area */}
          <div>{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default GdeltViewer;