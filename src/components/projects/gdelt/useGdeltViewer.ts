import { useState, useEffect } from 'react';
import { GdeltData, GdeltRecord } from './types';
import gdeltData from '@/data/gdelt-gkg.json';

export interface UseGdeltViewerResult {
  records: GdeltData;
  selectedRecord: string | null;
  setSelectedRecord: (id: string | null) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeVersion: string;
  setActiveVersion: (version: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isLoading: boolean;
  error: string | null;
  filteredRecordKeys: string[];
}

export function useGdeltViewer(): UseGdeltViewerResult {
  const [records, setRecords] = useState<GdeltData>({});
  const [selectedRecord, setSelectedRecord] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("metadata");
  const [activeVersion, setActiveVersion] = useState<string>("v1");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load records data
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        // In a real app, we would fetch this data from an API
        // For the demo, we're using the imported JSON data
        setRecords(gdeltData as GdeltData);
        
        // Select first record as default
        const firstKey = Object.keys(gdeltData)[0];
        setSelectedRecord(firstKey);
        setError(null);
      } catch (err) {
        console.error('Failed to load GDELT records:', err);
        setError(err instanceof Error ? err.message : 'Unknown error loading data');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Filter records based on search term
  const filteredRecordKeys = Object.keys(records).filter((id) => {
    const record = records[id];
    const source = record.metadata.sourceCommonName.toLowerCase();
    const date = record.metadata.date;
    return (
      source.includes(searchTerm.toLowerCase()) || 
      date.includes(searchTerm)
    );
  });

  return {
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
  };
}