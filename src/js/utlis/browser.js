import breakpoints from '@/scss/config/_breakpoints.scss';

const isMobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i);
const isTablet = navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/Tablet/i);
const isTouchDevice = isMobile || isTablet;
const hasNativeTabbar = /iP(ad|hone|od).+Version\/[\d.]+.*Safari/i.test(navigator.userAgent) && isMobile;
const isBot = /googlebot|mediapartners|adsbot|apis-google|slurp|bingbot|teoma|baiduspider|applebot|voilabot|ia_archiver|facebookexternalhit|facebot|twitterbot|linkedinbot|outbrain|pinterest|rogerbot|prerender/i.test(navigator.userAgent || navigator.vendor || window.opera);
const isPrerender = navigator.userAgent === 'prerender';
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
const inapp = {
  instagram: /Instagram/i.test(navigator.userAgent),
  facebook: /faceBook/i.test(navigator.userAgent),
  googlenews: /googleNews/i.test(navigator.userAgent),
};
const support = {
  hashChange: detectIE(),
};

const resetDeviceCategory = () => {
  const app = document.querySelector('#app');
  if (window.innerWidth >= parseInt(breakpoints['bp-desktop'])) {
    app.classList.remove('dc-desktop');
    app.classList.remove('dc-mobile');
    window.deviceCategory = 'desktop';
    if (typeof vm !== 'undefined') {
      vm.$config.deviceCategory = 'desktop';
    }
    app.classList.add('dc-desktop');
  } else {
    app.classList.remove('dc-desktop');
    app.classList.remove('dc-mobile');
    window.deviceCategory = 'mobile';
    if (typeof vm !== 'undefined') {
      vm.$config.deviceCategory = 'mobile';
    }
    app.classList.add('dc-mobile');
  }
};

export default {
  resetDeviceCategory,
  isBot,
  isMobile,
  isTablet,
  isTouchDevice,
  inapp,
  hasNativeTabbar,
  isPrerender,
  support,
  isSafari,
};

function detectIE() {
  const ua = navigator.userAgent;
  const msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  const trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    const rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }

  const edge = ua.indexOf('Edge/');
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }
}
