// src/ga.js
import ReactGA from 'react-ga4';

const measurementId = "G-KNSZY2W3KB"; // Replace with your GA4 Measurement ID
ReactGA.initialize(measurementId);

export const trackPage = (page) => {
  ReactGA.send({ hitType: "pageview", page });
};

export const trackEvent = (category, action, label) => {
  ReactGA.event({
    category,
    action,
    label,
  });
};
