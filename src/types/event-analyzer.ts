export interface TimeInfo {
  value: string;
  type: 'absolute' | 'relative';
  confidence: number;
}

export interface LocationInfo {
  value: string;
  type: 'city' | 'country' | 'address';
  coordinates?: [number, number];
  confidence: number;
}

export interface EntityInfo {
  value: string;
  type: string;
  confidence: number;
}

export interface IEventAnalyzer {
  analyze(text: string): Promise<EventAnalysis>;
  classifyEventType(text: string): string;
  extractTime(text: string): TimeInfo[];
  extractLocations(text: string): LocationInfo[];
  extractEntities(text: string): EntityInfo[];
}

export interface EventAnalysis {
  text: string;
  type: string;
  time: TimeInfo[];
  place: LocationInfo[];
  entities: EntityInfo[];
  relations: any[];
  confidence: number;
  severity: number;
  summary?: string;
}

export interface FormattedAnalysis extends EventAnalysis {
  confidence: string;
  summary: string;
}