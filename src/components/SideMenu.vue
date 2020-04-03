<template>
  <div class="fixed mw4 f3 tc left-1">
    <br>
    <span
      class="w-100 f5 no-underline white bg-black-80 bg-animate hover-bg-white hover-black inline-flex items-center pa3 border-box"
      @click="handleClickActionButton()"
    >
      <i
        :class="
          `tc icon ion-md-${actionButton === 'Random' ? 'shuffle' : 'refresh'}`
        "
      />
      <span class="pl1">{{ actionButton }}</span>
    </span>
    <div
      class="f6 tl"
      style="min-height:5rem;"
    >
      <p
        class="pa2 bg-animate hover-bg-white hover-black mb0 pb2 white bg-black-60"
        @click="toggle()"
      >
        {{ activeItem.id ? activeItem.id : "list" }}
        <i
          :class="
            `hover-black fr ma0 icon ion-md-arrow-drop-down ${
              displayList ? ` ion-md-arrow-dropup` : ' ion-md-arrow-dropdown'
            }`
          "
        />
      </p>
      <p class="mb0 pb2 white bg-black-60">
        links:
        <a
          :href="activeItem.link"
          target="_blank"
          title="open in a new page"
          class="link white"
        >skyl.fr</a>
      </p>

      <p class="ma0 pa0 f3 white bg-black-60">
        <a
          target="_blank"
          href="https://github.com/sikaili"
        >
          <i class="white mh1 icon ion-logo-github" />
        </a>
        <a
          target="_blank"
          title="instagram"
          href="https://www.instagram.com/skylfr/"
        >
          <i class="white mh1 icon ion-logo-instagram" />
        </a>
        <a
          target="_blank"
          rel="canonical"
          :href="
            'https://twitter.com/intent/tweet?url=https://skyl.fr' + $route.path
          "
        >
          <i class="white mh1 icon ion-logo-twitter" />
        </a>
        <a
          href="mailto:contact@sikai.li"
          title="mail"
        >
          <i class="white icon ion-ios-send" />
        </a>
      </p>
    </div>
    <transition name="slide-fade1">
      <div
        v-if="displayList"
        class="overflow-y-scroll vh-50 f6 tl bg-white-30"
      >
        <span
          v-for="(item, index) in iframeItems"
          :key="index"
        >
          <p
            class="listItem ph1 bg-animate hover-bg-white hover-black white bg-black-60"
            @click="handlePClick(item)"
          >
            {{ item.id }}
          </p>
        </span>
      </div>
    </transition>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'SideMenu',
  data() {
    return {
      displayList: false,
      time: Date.now(),
      actionButton: 'Random',
    };
  },
  computed: {
    ...mapGetters({
      activeItem: 'activeItem',
      iframeItems: 'iframeItems',
    }),
  },
  created() {
    const { id } = this.$route.params;
    if (id === 'random') {
      this.randomIframe();
    }
  },
  mounted() {
    this.setActionButton();
  },
  methods: {
    ...mapActions({
      setActiveItem: 'setActiveItem',
    }),
    setActionButton() {
      clearTimeout(this.timeOut);
      this.actionButton = 'Random';
      this.timeOut = setTimeout(() => {
        this.actionButton = 'Restart';
      }, 4000);
    },
    handleClickActionButton() {
      if (this.actionButton === 'Random') {
        this.randomIframe();
      } else if (this.actionButton === 'Restart') {
        this.restart();
      }
      this.setActionButton();
    },
    restart() {
      this.$root.$emit('refreshCanvas', true);
    },
    randomIframe() {
      const n = Math.floor(Math.random() * this.iframeItems.length);
      const item = this.iframeItems[n];
      this.displayList = false;
      this.setActiveItem(item);
      this.$router.replace({ params: { id: item.id } });
    },
    handlePClick(item) {
      if (item !== this.activeItem) {
        this.displayList = false;
        this.$store.dispatch('setActiveItem', item);
        this.$router.replace({ params: { id: this.activeItem.id } });
        this.setActionButton();
      }
    },
    toggle() {
      if (this.displayList) {
        return this.hide();
      }
      return this.show();
    },
    show() {
      this.displayList = true;
      setTimeout(() => document.addEventListener('click', this.hide), 0);
    },
    hide() {
      this.displayList = false;
      document.removeEventListener('click', this.hide);
    },
  },
};
</script>

<style scoped>
a:hover {
  background-color: black;
}
.listItem {
  line-height: 30px;
  margin: 4px 0;
}
</style>
