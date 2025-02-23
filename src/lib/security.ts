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
    'cdn.jsdelivr.net',
    'unpkg.com',
    window.location.hostname
  ];
  
  return allowedDomains.some(allowed => domain === allowed || domain.endsWith(`.${allowed}`));
}

// Add type definition for script hashes
declare global {
  interface Window {
    scriptHashes?: Record<string, string>;
  }
}
