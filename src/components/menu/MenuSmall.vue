<template>
  <div class="Menu cl">
    <the-intro />
    <div
      v-if="menuShow"
      class="Menu__menuItems w-100 bg-white-80"
    >
      <div
        v-for="item in menuItems"
        :key="item.id"
        class="flex flex-column justify-center"
      >
        <a
          class="pa1 tc link"
          :class="item.show ? 'router-link-active' : ''"
          @click="setItemActive(item, 'touchScreen')"
        >
          <div class="link ma0 pa0 bw0">
            <dl class="mt2 f6 lh-copy">
              <dt class="clip" />
              <dd class="f5 ml0 black truncate w-100">
                {{ item.name }}
                <i
                  :class="
                    `absolute right-1 fr ma0 icon ion-md-arrow-drop-down ${
                      item.show
                        ? `black ion-md-arrow-dropup`
                        : 'black ion-md-arrow-dropdown'
                    }`
                  "
                />
                <b
                  v-show="item.show"
                  class="dib bg-blue"
                >{{ item.year }}</b>
              </dd>
            </dl>
          </div>
        </a>
        <transition name="slide-fade">
          <div
            v-show="item.show"
            class="Menu__details bg-black-10 w-100 tl ma0"
          >
            <div
              v-if="type=='music'"
              class="Menu__player"
            >
              <player-component
                v-bind="playerProps(item)"
              />
            </div>
            <div class="ph4 pv3">
              <!-- <span class="f4 f1-ns b dib pr3">{{ item.name }}</span> -->
              <blockquote class="ph0 pb2 mb0 bb mh0 mt0">
                <p class="lh-copy f6 ma0 black">
                  {{ item.des }}
                  <br>
                  <span
                    v-if="showReadMoreButton(item)"
                    class="Menu__button tc f6 dim link ba bw2 ph2 pv1 mt3 mr3 dib black"
                    @click="goToPage(item)"
                  >Read more..</span>
                  <span
                    v-if="showPlayButton(item)"
                    class="Menu__button fr tc f6 link ba bw2 ph3 pv1 mt3 dib black dim"
                    @click="play(item)"
                  >
                    <i class="icon ion-md-return-right" />

                    <span class="pr1">Play!</span>
                  </span>
                </p>
              </blockquote>
              <div class="w-100 overflow-auto mb2">
                <a
                  :href="item.link"
                  target="_blank"
                  class="f7 truncate black lh-copy nowrap"
                >{{ item.link }}</a>
              </div>
              <img
                :src="item.img"
                :alt="item.name"
                class="w-100 dim"
              >
              <template v-if="item.credits.length > 1">
                <h4>Credits</h4>
                <div
                  v-for="(person, n) in item.credits"
                  :key="person.link + n"
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
                  <br>
                </div>
              </template>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { menuMxn } from '@/js/mixins';
import PlayerComponent from 'vue-aplayer';

export default {
  name: 'Menu',
  components: {
    PlayerComponent,
  },
  mixins: [menuMxn],
  props: {
    type: {
      default: '',
      type: String,
    },
  },
  data() {
    return {
      menuShow: true,
      loadingAnimation: false,
      bwhite: 'bg-white',
    };
  },
};
</script>
<style lang="scss">

    svg.w1 {
        max-height: 44px;
    }

    .loading {
        width: 100%;
        height: 30px;
    }
    .slide-fade-enter-active {
        transition: all 0.15s ease;
    }
    .slide-fade-leave-active {
        transition: all 0.15s ease;
    }
    .slide-fade-enter {
        transform: translateY(50px);
        opacity: 0 0.15s;
    }
    .slide-fade-leave-to {
        /* max-height: 0px 0.5s; */
        opacity: 0 0.2s;
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
