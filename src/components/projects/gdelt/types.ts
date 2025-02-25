export interface GdeltLocation {
    type: number;
    name: string;
    countryCode: string;
    adminCode?: string;
    coords?: {
      lat: number;
      lon: number;
    };
  }
  
  export interface GdeltCount {
    type: string;
    count: number;
    object?: string;
    location?: string;
  }
  
  export interface GdeltTone {
    score: number;
    positive: number;
    negative: number;
    polarity: number;
    activityRefDensity: number;
    selfRefDensity: number;
    wordCount: number;
  }
  
  export interface GdeltMetadata {
    id: string;
    sourceCommonName: string;
    date: string;
    sourceColl: number;
    documentIdentifier: string;
    quotations?: string[];
  }
  
  export interface GdeltV1 {
    counts: GdeltCount[];
    themes: string[];
    locations: GdeltLocation[];
    persons: string[];
    organizations: string[];
    tone: GdeltTone;
  }
  
  export interface GdeltEnhancedItem {
    theme?: string;
    name?: string;
    type?: number;
    countryCode?: string;
    adminCode?: string;
    offset: number;
  }
  
  export interface GdeltV2 {
    enhancedThemes: GdeltEnhancedItem[];
    enhancedLocations: GdeltEnhancedItem[];
    enhancedPersons: GdeltEnhancedItem[];
    enhancedOrganizations: GdeltEnhancedItem[];
    gcam: {
      wordCount: number;
      [key: string]: number;
    };
  }
  
  export interface GdeltQuotation {
    offset: number;
    length: number;
    quote: string;
  }
  
  export interface GdeltAmount {
    amount: number;
    object: string;
    offset: number;
  }
  
  export interface GdeltV2_1 {
    quotations: GdeltQuotation[];
    allNames: string[];
    amounts: GdeltAmount[];
  }
  
  export interface GdeltRecord {
    metadata: GdeltMetadata;
    v1: GdeltV1;
    v2?: GdeltV2;
    v2_1?: GdeltV2_1;
  }
  
  export interface GdeltData {
    [id: string]: GdeltRecord;
  }