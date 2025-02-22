/**
 * Security utility functions for CSP and SRI
 */

/**
 * Gets the SRI hash for a script
 * @param scriptUrl URL of the script
 * @returns SRI hash or undefined if not found
 */
export function getScriptIntegrity(scriptUrl: string): string | undefined {
  return window.scriptHashes?.[scriptUrl];
}

/**
 * Validates a script URL against CSP rules
 * @param url Script URL to validate
 * @returns True if URL is allowed by CSP
 */
export function isUrlAllowedByCSP(url: string): boolean {
  // Extract domain from URL
  let domain = '';
  try {
    domain = new URL(url).hostname;
  } catch (e) {
    // Handle relative URLs
    if (url.startsWith('/')) {
      return true;
    }
    return false;
  }
  
  // List of allowed domains from CSP
  const allowedDomains = [
    'cdnjs.cloudflare.com',
    'unpkg.com',
    window.location.hostname
  ];
  
  return allowedDomains.some(allowed => domain === allowed || domain.endsWith(`.${allowed}`));
}

/**
 * Safely loads a script with CSP validation and SRI when available
 * @param url Script URL
 * @returns Promise that resolves when script is loaded
 */
export function loadScriptSafely(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!isUrlAllowedByCSP(url)) {
      reject(new Error(`Script URL "${url}" is not allowed by CSP`));
      return;
    }
    
    const script = document.createElement('script');
    script.src = url;
    
    // Add integrity check if available
    const integrity = getScriptIntegrity(url);
    if (integrity) {
      script.integrity = integrity;
      script.crossOrigin = 'anonymous';
    }
    
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script "${url}"`));
    
    document.body.appendChild(script);
  });
}

// Add type definition for script hashes
declare global {
  interface Window {
    scriptHashes?: Record<string, string>;
  }
}
