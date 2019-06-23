<template>
  <div class="cl">
    <h1 class="tc autoM f4 b white">LI Sikai</h1>
    <p class="bg-black-10 tl white autoM f6" :class="$mq == `sm` ? `ph3` : ``">
      I'm a creative technologist & interction designer based in Paris. I make
      music and new media art.
    </p>
    <div v-if="menuShow" class="w-100 bg-white-80">
      <div
        v-for="(item, index) in items"
        :key="item.id"
        class="flex flex-column justify-center"
      >
        <a
          href="#"
          @click="handleClick(item)"
          class="pa1 tc link"
          :class="item.show ? 'router-link-active' : ''"
        >
          <div class="link ma0 pa0 bw0">
            <dl class="mt2 f6 lh-copy">
              <dt class="clip"></dt>
              <dd class="f5 ml0 black truncate w-100">
                {{ item.name }}
                <b v-show="item.show" class="dib bg-blue">{{ item.year }}</b>
              </dd>
            </dl>
          </div>
        </a>
        <transition name="slide-fade">
          <div class="bg-black-10 w-100 tl ma0" v-show="item.show">
            <div class="ph4 pv3">
              <!-- <span class="f4 f1-ns b dib pr3">{{ item.name }}</span> -->
              <blockquote class="ph0 pb2 mb3 bb mh0 mt0">
                <p class="lh-copy measure f6 ma0 black">
                  {{ item.des }}
                  <br />
                  <a
                    @click="goToPage(index)"
                    class="f6 dim link ba bw2 ph3 pv1 mt3 dib black"
                    href="#0"
                    >Read more...</a
                  >
                  <i></i>
                </p>
              </blockquote>
              <div class="w-100 overflow-auto">
                <code class="f6 db lh-copy nowrap">{{ item.link }}</code>
              </div>
              <img :src="item.img" :alt="item.name" class="w-100 dim" />
            </div>
          </div>
        </transition>
      </div>
    </div>
    <div class="flex items-center justify-center pa4 ph3 bg-lightest-blue navy">
      <svg
        class="w1"
        data-icon="info"
        viewBox="0 0 32 32"
        style="fill:currentcolor"
      >
        <title>info icon</title>
        <path
          d="M16 0 A16 16 0 0 1 16 32 A16 16 0 0 1 16 0 M19 15 L13 15 L13 26 L19 26 z M16 6 A3 3 0 0 0 16 12 A3 3 0 0 0 16 6"
        ></path>
      </svg>
      <span class="lh-title ml3">
        Please come back on a desktop for better expereince
      </span>
    </div>

    <!-- <div class="w-40 bg-white">
      <div>
        <transition name="loading">
          <div v-show="loadingAnimation" class="loading bg-blue f3">
            Loading...
          </div>
        </transition>
        <div v-for="(w, index) in items" :key="mName + index"></div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "Menu",
  props: {
    itemsprops: {
      type: Array,
      required: true
    },
    mName: {
      type: String
    }
  },
  data() {
    return {
      items: this.itemsprops,
      menuShow: true,
      loadingAnimation: false,
      bwhite: "bg-white"
    };
  },
  methods: {
    handleClick(item) {
      this.items.filter(a => a != item).map(a => (a.show = false));
      item.show = !item.show;
    },
    // handleMouseIn(item, itemToEmit) {
    //   if (this.items.some(a => a.show)) {
    //     this.items.filter(a => a != item).map(a => (a.show = false));
    //     item.show = true;
    //   }
    //   if (itemToEmit) {
    //     this.load(itemToEmit);
    //   }
    // },
    // handleMouseOut() {
    //   this.abortLoad();
    // },
    abortLoad() {
      let id = window.setTimeout(function() {}, 0);
      while (id--) {
        window.clearTimeout(id);
      }
      setTimeout(() => {
        this.loadingAnimation = false;
      }, 200);
    },
    load(itemToEmit) {
      this.loadingAnimation = true;
      setTimeout(() => {
        this.$root.$emit("itemDesOpen", itemToEmit),
          (this.loadingAnimation = false);
      }, 1000);
    },

    goToPage(itemToEmit) {
      console.log(itemToEmit);
      this.$router.push({
        name: this.mName.toLowerCase(),
        params: { id: itemToEmit }
      });
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
