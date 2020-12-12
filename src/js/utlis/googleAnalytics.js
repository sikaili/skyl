import loadScript from '@/js/utlis/loadScript';

const initGoogleAnalytics = () => {
  loadScript('https://www.googletagmanager.com/gtag/js?id=UA-143317718-5');
  window.dataLayer = window.dataLayer || [];
  window.gtag = (...theArgs) => {
    window.dataLayer.push(theArgs);
  };
  window.gtag('js', new Date());
  window.gtag('config', 'UA-143317718-5');
};

const sendEvent = (eventName = 'click') => {
  if (window.gtag) {
    window.gtag('event', eventName, { method: 'Google' });
  }
};

export { initGoogleAnalytics, sendEvent };
