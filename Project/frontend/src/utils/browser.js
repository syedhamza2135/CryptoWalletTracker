/**
 * Browser detection and feature support utilities
 */

// Detect browser type
export const getBrowserInfo = () => {
  const userAgent = navigator.userAgent;
  const isChrome = /Chrome/.test(userAgent) && /Google Inc/.test(navigator.vendor);
  const isFirefox = /Firefox/.test(userAgent);
  const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
  const isEdge = /Edg/.test(userAgent);
  const isIE = /MSIE|Trident/.test(userAgent);

  return {
    isChrome,
    isFirefox,
    isSafari,
    isEdge,
    isIE,
    userAgent
  };
};

// Detect device type
export const getDeviceInfo = () => {
  const userAgent = navigator.userAgent;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  const isTablet = /iPad/i.test(userAgent) || (isMobile && window.innerWidth > 767);
  const isDesktop = !isMobile && !isTablet;
  
  return {
    isMobile,
    isTablet,
    isDesktop,
    touchDevice: 'ontouchstart' in window,
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight
  };
};

// Feature detection
export const getFeatureSupport = () => {
  return {
    // Storage
    localStorage: (() => {
      try {
        const test = 'test';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
      } catch {
        return false;
      }
    })(),
    
    // Network
    fetch: 'fetch' in window,
    websockets: 'WebSocket' in window,
    
    // Graphics
    canvas: (() => {
      try {
        return !!document.createElement('canvas').getContext('2d');
      } catch {
        return false;
      }
    })(),
    
    // CSS Features
    cssGrid: CSS.supports('display', 'grid'),
    cssFlexbox: CSS.supports('display', 'flex'),
    cssCustomProperties: CSS.supports('--test', 'value'),
    
    // Modern APIs
    intersectionObserver: 'IntersectionObserver' in window,
    resizeObserver: 'ResizeObserver' in window,
    serviceWorker: 'serviceWorker' in navigator,
    
    // Input
    touch: 'ontouchstart' in window,
    pointerEvents: 'onpointerdown' in window,
  };
};

// Check if browser is supported
export const isSupportedBrowser = () => {
  const browser = getBrowserInfo();
  const features = getFeatureSupport();
  
  // Basic requirements
  const hasBasicSupport = 
    features.fetch &&
    features.localStorage &&
    features.cssFlexbox &&
    !browser.isIE;
    
  return hasBasicSupport;
};

// Get recommended browser message
export const getUnsupportedBrowserMessage = () => {
  const browser = getBrowserInfo();
  
  if (browser.isIE) {
    return {
      title: 'Internet Explorer is not supported',
      message: 'Please use a modern browser like Chrome, Firefox, Safari, or Edge for the best experience.',
      action: 'Switch Browser'
    };
  }
  
  return {
    title: 'Browser compatibility issue',
    message: 'Some features may not work properly in your current browser. Please update to the latest version.',
    action: 'Update Browser'
  };
};

// Environment detection
export const getEnvironmentInfo = () => {
  return {
    isDevelopment: import.meta.env.DEV,
    isProduction: import.meta.env.PROD,
    apiUrl: import.meta.env.VITE_API_URL,
    appVersion: import.meta.env.VITE_APP_VERSION,
    buildMode: import.meta.env.MODE,
  };
};

// Performance monitoring
export const getPerformanceInfo = () => {
  if (!('performance' in window)) return null;
  
  const navigation = performance.getEntriesByType('navigation')[0];
  
  return {
    loadTime: navigation?.loadEventEnd - navigation?.navigationStart,
    domContentLoaded: navigation?.domContentLoadedEventEnd - navigation?.navigationStart,
    firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime,
    firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime,
  };
};

// Debug info logger
export const logEnvironmentInfo = () => {
  if (!import.meta.env.DEV) return;
  
  const browser = getBrowserInfo();
  const device = getDeviceInfo();
  const features = getFeatureSupport();
  const environment = getEnvironmentInfo();
  const performance = getPerformanceInfo();
  
  console.group('🔧 Environment Information');
  console.log('Browser:', browser);
  console.log('Device:', device);
  console.log('Features:', features);
  console.log('Environment:', environment);
  console.log('Performance:', performance);
  console.log('Supported:', isSupportedBrowser());
  console.groupEnd();
};