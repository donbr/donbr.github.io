import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import Layout from '@/components/layout/Layout';
import networkData from '@/data/gdelt-gkg.json';

declare global {
  interface Window {
    _leafletMap: L.Map | null;
  }
}

// Type definitions
interface Location {
  name: string;
  coords?: {
    lat: number;
    lon: number;
  };
}

interface MapViewProps {
  locations: Location[];
}

interface EnhancedItem {
  name?: string;
  theme?: string;
  quote?: string;
  offset?: number;
}

type ListItem = string | EnhancedItem;

interface ListCardProps {
  title: string;
  items: ListItem[];
  type?: 'simple' | 'enhanced';
}

interface QuotationCardProps {
  quotations: string[];
}

interface ToneAnalysisProps {
  tone?: {
    wordCount?: number;
    [key: string]: number | undefined;
  };
}

interface Metadata {
  sourceCommonName: string;
  date: string;
  documentIdentifier: string;
  quotations?: string[];
  [key: string]: unknown;
}

interface V1Data {
  themes: string[];
  persons: string[];
  organizations: string[];
  locations?: Location[];
}

interface V2Data {
  enhancedThemes: EnhancedItem[];
  enhancedPersons: EnhancedItem[];
  enhancedOrganizations: EnhancedItem[];
}

interface V2_1Data {
  quotations: EnhancedItem[];
  allNames: string[];
  amounts: EnhancedItem[];
}

interface GkgRecord {
  metadata: Metadata;
  v1: V1Data;
  v2?: V2Data;
  v2_1?: V2_1Data;
  [key: string]: unknown;
}

interface RecordCollection {
  [id: string]: GkgRecord;
}

// MapView component
const MapView: React.FC<MapViewProps> = ({ locations }) => {
  useEffect(() => {
    if (window._leafletMap) {
      window._leafletMap.remove();
    }

    const validLocations = locations.filter(loc => loc.coords);
    if (validLocations.length > 0) {
      const first = validLocations[0];
      const map = L.map("map").setView([first.coords!.lat, first.coords!.lon], 5);
      window._leafletMap = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      validLocations.forEach((loc) => {
        L.marker([loc.coords!.lat, loc.coords!.lon])
          .addTo(map)
          .bindPopup(`<strong>${loc.name}</strong>`);
      });
    }

    return () => {
      if (window._leafletMap) {
        window._leafletMap.remove();
        window._leafletMap = null;
      }
    };
  }, [locations]);

  return <div id="map" style={{ height: "400px" }} />;
};

// ListCard component
const ListCard: React.FC<ListCardProps> = ({ title, items, type = "simple" }) => {
  const [showAll, setShowAll] = useState(false);
  const displayedItems = showAll ? items : items.slice(0, 10);

  const renderItem = (item: ListItem, idx: number) => {
    if (typeof item === 'string') {
      return (
        <div key={idx} className="text-gray-700">
          {item}
        </div>
      );
    }
    return (
      <div key={idx} className="flex justify-between text-gray-700 border-b pb-1">
        <span>{item.name || item.theme || item.quote || ''}</span>
        {type === 'enhanced' && <span className="text-gray-500">Offset: {item.offset}</span>}
      </div>
    );
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <h3 className="font-semibold text-gray-700 mb-2">{title}</h3>
      <div className="space-y-2">
        {displayedItems.map((item, idx) => renderItem(item, idx))}
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

// QuotationCard component
const QuotationCard: React.FC<QuotationCardProps> = ({ quotations }) => {
  if (!quotations.length) return null;

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

// ToneAnalysis component
const ToneAnalysis: React.FC<ToneAnalysisProps> = ({ tone }) => {
  if (!tone) return (
    <div className="bg-white p-4 rounded-lg shadow mb-4 text-gray-700">
      No tone data available for this version.
    </div>
  );

  const renderBar = (value: number): React.ReactElement => {
    const clamped = Math.max(Math.min(value, 10), -10);
    const normalized = ((clamped + 10) / 20) * 100;
    return (
      <div className="relative h-2 bg-gradient-to-r from-red-500 via-gray-200 to-blue-500 rounded">
        <div
          className="absolute"
          style={{
            left: `${normalized}%`,
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
        Metrics are scaled from -10 (negative) to +10 (positive). Higher polarity indicates more emotional intensity.
      </p>
      {Object.entries(tone).map(([key, value]) => {
        if (key === "wordCount") {
          return (
            <div key={key} className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700">{key}</span>
                <span className="text-gray-800">{value ?? 0}</span>
              </div>
            </div>
          );
        }
        return (
          <div key={key} className="mb-3">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-700">{key}</span>
              <span className="text-gray-800">{(value ?? 0).toFixed(2)}</span>
            </div>
            {renderBar(value ?? 0)}
          </div>
        );
      })}
    </div>
  );
};

// Main component
const GdeltRecordViewer: React.FC = () => {
  const [records, setRecords] = useState<RecordCollection>({});
  const [selectedRecord, setSelectedRecord] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"metadata" | "themes" | "entities" | "tone" | "map">("metadata");
  const [activeVersion] = useState<"v1" | "v2" | "v2_1">("v1");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    try {
      setRecords(networkData);
      setSelectedRecord(Object.keys(networkData)[0]);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const filteredRecordKeys = Object.keys(records).filter((id) => {
    const rec = records[id];
    return (
      rec.metadata.sourceCommonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.metadata.date.includes(searchTerm)
    );
  });

  const renderMetadataGrid = (metadata: Metadata) => (
    <div className="overflow-x-auto">
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(metadata).map(([key, value]) => {
          if (key === "quotations") return null;
          return (
            <div key={key} className="text-gray-700">
              <span className="font-semibold">{key}:</span>{" "}
              {key === "documentIdentifier" ? (
                <a href={String(value)} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                  {String(value)}
                </a>
              ) : (
                <span>{String(value)}</span>
              )}
            </div>
          );
        })}
      </div>
      {metadata.quotations && <QuotationCard quotations={metadata.quotations} />}
    </div>
  );

  const renderContent = () => {
    if (!selectedRecord) return <p>Loading record...</p>;
    const record = records[selectedRecord];
    const versionData = record[activeVersion];

    switch (activeTab) {
      case "metadata":
        return renderMetadataGrid(record.metadata);
      case "themes":
        if (activeVersion === "v1") {
          return (
            <div className="flex flex-wrap gap-2">
              {(versionData as V1Data).themes.map((theme, idx) => (
                <span key={idx} className="bg-gray-100 px-2 py-1 rounded text-gray-700 cursor-pointer">
                  #{theme}
                </span>
              ))}
            </div>
          );
        } else if (activeVersion === "v2") {
          return (
            <div className="flex flex-wrap gap-2">
              {(versionData as V2Data).enhancedThemes.map((item, idx) => (
                <span key={idx} className="bg-gray-100 px-2 py-1 rounded text-gray-700 cursor-pointer">
                  #{item.theme} (Offset: {item.offset})
                </span>
              ))}
            </div>
          );
        }
        break;
      case "entities":
        if (activeVersion === "v1") {
          return (
            <>
              <ListCard title="Persons" items={(versionData as V1Data).persons} />
              <ListCard title="Organizations" items={(versionData as V1Data).organizations} />
            </>
          );
        } else if (activeVersion === "v2") {
          return (
            <>
              <ListCard title="Enhanced Persons" items={(versionData as V2Data).enhancedPersons} type="enhanced" />
              <ListCard title="Enhanced Organizations" items={(versionData as V2Data).enhancedOrganizations} type="enhanced" />
            </>
          );
        } else if (activeVersion === "v2_1") {
          return (
            <>
              <ListCard title="Quotations" items={(versionData as V2_1Data).quotations} type="enhanced" />
              <ListCard title="All Names" items={(versionData as V2_1Data).allNames} />
              <ListCard title="Amounts" items={(versionData as V2_1Data).amounts} type="enhanced" />
            </>
          );
        }
        break;
      case "tone":
        return <ToneAnalysis tone={(versionData as { tone?: ToneAnalysisProps['tone'] }).tone} />;
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
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">GDELT GKG Viewer</h1>
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-64 p-4 bg-gray-50 border-r overflow-y-auto" style={{ maxHeight: "80vh" }}>
              <h2 className="font-bold text-gray-700 mb-4">Records</h2>
              <input
                type="text"
                placeholder="Search by source or date..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                className="w-full p-2 border rounded mb-4 text-gray-700"
              />
              {filteredRecordKeys.map((id) => {
                const rec = records[id];
                const primaryLocation = rec.v1.locations?.[0]?.name || "No location";
                return (
                  <div
                    key={id}
                    onClick={() => {
                      setSelectedRecord(id);
                      setActiveTab("metadata");
                    }}
                    className={`cursor-pointer p-2 mb-2 rounded ${
                      selectedRecord === id ? "bg-blue-100 border-l-4 border-blue-500" : "hover:bg-gray-100"
                    }`}
                  >
                    <h3 className="font-semibold text-gray-800">{rec.metadata.sourceCommonName}</h3>
                    <p className="text-sm text-gray-600">{rec.metadata.date}</p>
                    <p className="text-xs text-gray-500">Location: {primaryLocation}</p>
                  </div>
                );
              })}
            </div>
            <div className="flex-1 p-6">
              <div className="sticky-tabs border-b mb-4">
                {(["metadata", "themes", "entities", "tone", "map"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 ${
                      activeTab === tab ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-700 hover:text-gray-900"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
              <div>{renderContent()}</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GdeltRecordViewer;
