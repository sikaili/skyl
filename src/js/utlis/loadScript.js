import browser from '@/js/utlis/browser';

export default function (src, force = false) {
  return new Promise(((resolve, reject) => {
    if (browser.isPrerender) {
      reject(src);
      return;
    }

    const existingEl = document.querySelector(`script[src="${src}"]`);
    if (existingEl && !force) {
      if (existingEl.classList.contains('is-loading')) {
        existingEl.addEventListener('load', resolve);
        existingEl.addEventListener('error', reject);
        existingEl.addEventListener('abort', reject);
      } else {
        resolve();
      }
      return;
    }

    const el = document.createElement('script');

    el.type = 'text/javascript';
    el.async = true;
    el.src = src;
    el.classList.add('is-loading');

    el.addEventListener('load', () => {
      el.classList.remove('is-loading');
      resolve();
    });
    el.addEventListener('error', reject);
    el.addEventListener('abort', reject);
    document.head.appendChild(el);
  }));
}
