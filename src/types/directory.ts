export interface DirectoryConfig {
  path: string;
  description?: string;
  patterns?: string[];
  fileTypes?: string[];
  files?: string[];
  children?: DirectoryConfig[];
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}