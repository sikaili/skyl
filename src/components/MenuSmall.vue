<template>
  <div class="Menu cl">
    <intro />
    <div class="Menu__menuItems w-100 bg-white-80" v-if="menuShow">
      <div
        v-for="item in menuItems"
        :key="item.id"
        class="flex flex-column justify-center"
      >
        <a
          @click="setItemActive(item, 'touchScreen')"
          class="pa1 tc link"
          :class="item.show ? 'router-link-active' : ''"
        >
          <div class="link ma0 pa0 bw0">
            <dl class="mt2 f6 lh-copy">
              <dt class="clip"></dt>
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
                ></i>
                <b v-show="item.show" class="dib bg-blue">{{ item.year }}</b>
              </dd>
            </dl>
          </div>
        </a>
        <transition name="slide-fade">
          <div
            class="Menu__details bg-black-10 w-100 tl ma0"
            v-show="item.show"
          >
            <div class="ph4 pv3">
              <!-- <span class="f4 f1-ns b dib pr3">{{ item.name }}</span> -->
              <blockquote class="ph0 pb2 mb0 bb mh0 mt0">
                <p class="lh-copy f6 ma0 black">
                  {{ item.des }}
                  <br />
                  <span
                    @click="goToPage(item)"
                    class="tc w4 f6 dim link ba bw2 ph2 pv1 mt3 dib black"
                    >Read more..</span
                  >
                  <span
                    v-if="item.link.split(':')[0] == `https`"
                    @click="play(item)"
                    class="fr tc w4 ml3 f6 link ba bw2 ph3 pv1 mt3 dib black dim"
                  >
                    <i class="icon ion-md-return-right"></i>

                    <span class="pr1">Play!</span>
                  </span>
                </p>
              </blockquote>
              <div class="w-100 overflow-auto mb2">
                <a
                  :href="item.link"
                  target="_blank"
                  class="f7 truncate black lh-copy nowrap"
                  >{{ item.link }}</a
                >
              </div>
              <img :src="item.img" :alt="item.name" class="w-100 dim" />
              <h4>Credits</h4>
              <div
                v-for="(person, n) in item.credits"
                :key="person.link + n"
                class="f7 flex"
                style="line-height:1"
              >
                <p class="truncate w-60">{{ person.role }}:</p>
                <p class="truncate">
                  <a target="_blank" class="ml3 black" :href="person.link">
                    {{ person.name }}
                  </a>
                </p>
                <br />
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <div
      v-show="alert"
      class="flex menuItems-center justify-center pa3 f6 ph3 bg-black-30 white"
    >
      <svg
        class="w1"
        data-icon="info"
        viewBox="0 0 32 32"
        style="fill:currentcolor"
      >
        <title>info icon</title>
        <path
          d="M16 0 A16 16 0 0 1 16 32 A16 16 0 0 1 16 0 M19 15 L13 15 L13 26 L19 26 z M16 6 A3 3 0 0 0 16 12 A3 3 0 0 0 16 6"
        />
      </svg>
      <span class="MenuSmall__Notification lh-title ml3"
        >Please come back on a desktop for better expereince</span
      >
      <p class="pl3" @click="disableNotification()">X</p>
    </div>
  </div>
</template>

<script>
import { menuMxn } from "@/js/mixins";

export default {
  name: "Menu",
  props: {
    type: {
      type: String
    }
  },
  mixins: [menuMxn],
  data() {
    return {
      alert: !localStorage.getItem("propose-desktop"),
      menuShow: true,
      loadingAnimation: false,
      bwhite: "bg-white"
    };
  },
  methods: {
    disableNotification() {
      localStorage.setItem("propose-desktop", true);
      this.alert = false;
    }
  }
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
