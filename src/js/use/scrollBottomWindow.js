import { useThrottleFn } from '@vueuse/core';
import { onMounted, onUnmounted } from 'vue';

export default (func, args) => {
  const onScroll = useThrottleFn((callback = func, params = args) => {
    const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight > document.documentElement.offsetHeight - 50;
    if (bottomOfWindow) {
      callback(params);
    }
  }, 200);
  onMounted(() => {
    window.addEventListener('scroll', () => { onScroll(); });
  });
  onUnmounted(() => {
    window.removeEventListener('scroll', () => { onScroll(); });
  });
};
