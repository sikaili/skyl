<template>
  <div class="Menu cl">
    <the-intro />
    <div
      class="fl bg-black-50 flex justify-end"
      :class="$mq === 'lg' ? 'w-40' : 'w-20'"
      @click="menuShow = !menuShow"
    >
      <h1
        v-if="$mq === 'lg'"
        class="ph5 f3 white tr"
      >
        {{ type.charAt(0).toUpperCase() + type.slice(1) }}
      </h1>
      <h1
        v-else
        class="ph3 f3 white tr"
      >
        <i :class="menuShow ? `icon ion-md-close` : `icon ion-md-add`" />
      </h1>
    </div>
    <div
      v-if="menuShow"
      class="fl bg-white-80"
      :class="$mq === 'lg' ? 'w-20' : 'w-30'"
    >
      <div class="flex flex-column justify-center">
        <a
          v-for="(item, n) in menuItems"
          :key="item.id + n"
          class="pa1 tc link"
          :class="item.show ? 'router-link-active' : ''"
          @click="setItemActive(item)"
        >
          <div class="link ma0 pa0 bw0">
            <dl class="mt2 f6 lh-copy">
              <dt class="clip" />
              <dd
                class="relative f4 ml0 black truncate w-100 ph2"
                style="overflow: hidden; white-space: nowrap;"
              >
                {{ item.name }}
                <i
                  :class="
                    `absolute right-0 mr1 fr ma0 icon ion-md-arrow-dropright ${
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
    <div
      class="fl w-40 bg-white"
      :class="$mq === 'lg' ?'w-40':'w-50'"
    >
      <div>
        <transition name="loading">
          <div
            v-show="loadingAnimation"
            class="loading bg-blue f3"
          >
            Loading...
          </div>
        </transition>
        <div
          v-for="(w, index) in menuItems"
          :key="type + index"
        >
          <transition name="slide-fade">
            <div
              v-show="w.show && menuShow"
              class="fl w-100 w-100-ns tl ma0"
              @mouseenter="handleMouseIn(w)"
              @mouseleave="handleMouseOut()"
            >
              <div class="pa4">
                <span class="f4 f1-ns b dib pr3">{{ w.name }}</span>
                <b class="ml1 mt2 dib bg-blue">{{ w.year }}</b>
                <blockquote class="ph0 pb2 mb1 bb mh0 mt0">
                  <div
                    v-if="$route.name.includes('music')"
                    class="mt3"
                  >
                    <player-component
                      v-bind="playerProps(w)"
                    />
                  </div>

                  <p class="lh-copy f6">
                    {{ w.des }}
                    <br>
                    <span
                      v-if="showReadMoreButton(w)"
                      class="Menu__button tc f6 dim link ba bw2 ph2 pv1 mt3 mr2 dib black"
                      @click="goToPage(w)"
                    >Read more..</span>
                    <span
                      v-if="showPlayButton(w)"
                      class="Menu__button tc f6 link ba bw2 ph2 pv1 mt3 dib black dim"
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
                <template v-if="w.credits.length > 1">
                  <h5 v-if="w.credits.length > 1">
                    Credits
                  </h5>
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
                        class="ml3 black-90"
                        :href="person.link"
                      >
                        {{ person.name }}
                      </a>
                    </p>
                  </div>
                </template>
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
import PlayerComponent from 'vue-aplayer';

PlayerComponent.disableVersionBadge = true;

export default {
  components: {
    PlayerComponent,
  },
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
};
</script>
<style lang="scss">
    .Menu {
        &__button {
            width: 30%;
        }

        &__player {
            margin: 16px 24px 0;
        }
    }

    .aplayer .aplayer-body .aplayer-info {
        padding: 14px 7px 14px 10px !important;
    }

    span.black {
        color: black;
    }
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
        transition: all 1.5s;
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
