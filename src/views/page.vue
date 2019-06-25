<template>
  <div>
    <h1 class="tc pa2">{{ item.name }}</h1>
    <div
      v-show="$mq !== 'sm'"
      class="fl w-20 vh-100 flex items-start justify-end"
    ></div>
    <div class="fl w-80 mw7 bg-white" :class="$mq == `sm` ? `w-100` : ''">
      <div class="flex-row pa5 justify-center tl">
        <h3>About</h3>
        <p>{{ item.about }}</p>
        <br />
        <h3>Project Webpage</h3>
        <p>
          <a target="_blank" :href="item.link" class="black">{{ item.link }}</a>
        </p>
        <br />

        <h3>Credits</h3>
        <div
          v-for="person in item.credits"
          :key="person.link"
          class="flex f7"
          style="line-height:0"
        >
          <p class="w-40">{{ person.role }}:</p>
          <p>
            <a class="black w-40" :href="person.link">{{ person.name }}</a>
          </p>
        </div>
        <br />
        <a
          @click="back"
          href="#0"
          class="f5 no-underline white bg-black-40 bg-animate hover-bg-black hover-white inline-flex items-center pa3 border-box mr1"
        >
          <svg
            class="w1"
            data-icon="chevronLeft"
            viewBox="0 0 32 32"
            style="fill:currentcolor"
          >
            <title>chevronLeft icon</title>
            <path d="M20 1 L24 5 L14 16 L24 27 L20 31 L6 16 z"></path>
          </svg>
          <span class="pl1">Return</span>
        </a>
      </div>
    </div>
    <!-- <img :src="require('@/assets/2.png')" class="back iframe idiv" /> -->
  </div>
</template>

<script>
import obj from "@/data.js";
export default {
  name: "page",
  data() {
    return {
      obj: obj,
      id: this.$route.params.id
    };
  },
  methods: {
    back() {
      this.$router.go(-2);
    }
  },
  computed: {
    item: function() {
      const arr = this.obj[this.$route.path.split("/")[1]];
      if (this.id > arr.length) {
        return "ERROR!";
      }
      console.log(arr[this.id]);

      return arr[this.id];
    }
  }
};
</script>

<style>
.iframe {
  height: 100%;
  width: 100%;
}

.idiv {
  position: absolute;
  top: 5rem;
  left: 0px;
  right: 0px;
  bottom: 0px;
}
</style>
