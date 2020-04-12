<template>
  <div class="Menu cl">
    <intro />
    <div
      class="fl bg-black-50 w-10 flex justify-end"
      @click="menuShow = !menuShow"
    >
      <h1 class="ph3 f3 white tr">
        <i :class="menuShow ? `icon ion-md-close` : `icon ion-md-add`" />
      </h1>
    </div>
    <div
      v-if="menuShow"
      class="fl w-40 bg-white-80"
    >
      <div class="flex flex-column justify-center">
        <a
          v-for="(item, n) in menuItems"
          :key="item.id + n"
          class="pa1 tc link"
          :class="item.show ? 'router-link-active' : ''"
          @click="setItemActive(item, 'touchScreen')"
        >
          <div class="link ma0 pa0 bw0">
            <dl class="mt2 f6 lh-copy">
              <dt class="clip" />
              <dd
                class="f4 ml0 black truncate w-100"
                style="overflow: hidden; white-space: nowrap;"
              >
                {{ item.name }}
                <i
                  :class="
                    `mr1 fr ma0 icon ion-md-arrow-dropright ${
                      item.show ? `mr3 black` : 'black'
                    }`
                  "
                />
              </dd>
            </dl>
          </div>
        </a>
      </div>
    </div>
    <div class="fl w-50 bg-white">
      <div>
        <div
          v-for="(w, index) in menuItems"
          :key="type + index"
        >
          <transition name="slide-fade">
            <div
              v-show="w.show && menuShow"
              class="fl w-100 w-100-ns tl ma0"
            >
              <div class="pa4">
                <span class="f4 f1-ns b dib pr3">{{ w.name }}</span>
                <b class="dib bg-blue">{{ w.year }}</b>
                <blockquote class="ph0 pb2 mb1 bb mh0 mt0">
                  <p class="lh-copy measure f6">
                    {{ w.des }}
                    <br>
                    <span
                      v-if="showReadMoreButton(w)"
                      class="tc w4 f6 dim link ba bw2 ph2 pv1 mt3 mr3 dib black"
                      @click="goToPage(w)"
                    >Read more..</span>
                    <span
                      v-if="w.link.split(':')[0] === `https`"
                      class="tc w4 f6 link ba bw2 ph3 pv1 mt3 dib black dim"
                      @click="play(w)"
                    >
                      <span class="pr1">Play!</span>
                      <i class="icon ion-md-return-right" />
                    </span>
                  </p>
                </blockquote>
                <div class="w-100 overflow-auto">
                  <code class="f7 db lh-copy nowrap">{{ w.link }}</code>
                </div>
                <img
                  :src="w.img"
                  :alt="w.name"
                  class="w-100 dim"
                >
                <h5>Credits</h5>
                <div
                  v-for="person in w.credits"
                  :key="person.link + person.role"
                  class="f7 flex"
                  style="line-height: 1;"
                >
                  <p class="truncate w-60">
                    {{ person.role }}:
                  </p>
                  <p class="truncate">
                    <a
                      target="_blank"
                      class="ml3 black"
                      :href="person.link"
                    >
                      {{ person.name }}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { menuMxn } from '@/js/mixins';

export default {
  name: 'Menu',
  mixins: [menuMxn],
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      style: null,
      menuShow: true,
      loadingAnimation: false,
      bwhite: 'bg-white',
    };
  },
  methods: {
  },
};
</script>
<style>
    .loading {
        width: 100%;
        height: 30px;
    }
    .slide-fade-enter-active {
        transition: all 0.15s ease;
    }
    .slide-fade-leave-active {
        display: none;
    }
    .slide-fade-enter {
        transform: translateX(30px);
        opacity: 0 0.15s;
    }
    .loading-enter-active {
        transition: all 1s;
    }
    .loading-leave-active {
        transition: all 0s;
        opacity: 0;
    }
    .loading-enter {
        width: 0;
        opacity: 0;
    }
</style>
