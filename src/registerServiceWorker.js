/* eslint-disable no-console */

import { register } from 'register-service-worker';

if (process.env.NODE_ENV === 'production') {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      register(`${process.env.BASE_URL}service-worker.js`, {
        ready() {
          console.log(
            'App is being served from cache by a service worker.\n'
          + 'For more details, visit https://goo.gl/AFskqB',
          );
        },
        registered(registration) {
          console.log('Service worker has been registered.');
          setInterval(() => {
            registration.update();
          }, 1000 * 60 * 20); // each 20 mins checks
        },
        cached() {
          console.log('Content has been cached for offline use.');
        },
        updatefound(registration) {
          registration.update();
          console.log('New content is downloading.');
        },
        updated(registration) {
          console.log('New content is available; please refresh.');
          document.dispatchEvent(
            new CustomEvent('swUpdated', { detail: registration }),
          );
        },
        offline() {
          console.log(
            'No internet connection found. App is running in offline mode.',
          );
        },
        error(error) {
          console.error('Error during service worker registration:', error);
        },
      });
    });
  }
}
