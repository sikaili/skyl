<template>
  <div>
    <h1 class="tc pa2">
      {{ item.name }}
    </h1>
    <div
      class="ml-auto mr-auto w-80 mw7 bg-white-90"
      :class="$mq === `sm` ? `w-100` : ''"
    >
      <i
        class="fr right-0 pr2 f2 icon ion-md-close gray c-animate hover-black"
        @click="back()"
      />
      <div
        class="flex-row justify-center items-start tl"
        :class="$mq === `sm` ? `ma2 pa3 mb5 pb5` : `pa5`"
      >
        <h3>{{ item.name }}</h3>
        <p
          v-if="item.about != item.des || item.imgs"
          class="f6"
        >
          {{ item.des }}
        </p>
        <img
          v-for="picLink in item.imgs"
          :key="picLink"
          class="w-100 pv3"
          :src="picLink"
        >
        <br>
        <h3>About</h3>
        <p class="f6">
          {{ item.about }}
        </p>
        <br>
        <h3>Project Webpage</h3>
        <p>
          <a
            target="_blank"
            :href="item.link"
            class="black f7"
          >{{
            item.link
          }}</a>
        </p>
        <br>

        <h3>Credits</h3>
        <div v-if="$mq !== `sm`">
          <div
            v-for="person in item.credits"
            :key="person.link + person.role"
            class="flex f7"
            style="line-height: 0;"
          >
            <p class="w-40">
              {{ person.role }}:
            </p>
            <p>
              <a
                target="_blank"
                class="black w-60"
                :href="person.link"
              >{{
                person.name
              }}</a>
            </p>
          </div>
        </div>
        <div v-else>
          <div
            v-for="(person, n) in item.credits"
            :key="person.link + n"
            class="f7 flex"
            style="line-height: 1;"
          >
            <p class="truncate w-60 ma1">
              {{ person.role }}:
            </p>
            <p class="truncate ma0">
              <a
                target="_blank"
                :href="person.link"
                class="ml3 black"
              >{{
                person.name
              }}</a>
            </p>
            <br>
          </div>
        </div>
        <br>
        <span
          class="f5 no-underline white bg-black-40 bg-animate hover-bg-black hover-white inline-flex items-center pa3 border-box mr1"
          @click="back()"
        >
          <i class="icon ion-md-return-left" />

          <span class="pl1">Return</span>
        </span>
        <span
          v-if="item.link.split(':')[0] === `https`"
          class="f5 no-underline white bg-light-red bg-animate hover-bg-black hover-white inline-flex items-center pa3 border-box mr1"
          @click="play"
        >
          <span class="pr1">Play!</span>
          <i class="icon ion-md-return-right" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Page',
  data() {
    return {
      id: this.$route.params.id,
    };
  },
  computed: {
    item() {
      const itemsArray = this.$store.state.projects;
      if (this.id > itemsArray.length) {
        return 'ERROR!';
      }
      const dump = itemsArray.find((a) => a.id === this.$route.params.id);
      return dump;
    },
  },
  methods: {
    ...mapActions(['setActiveItem']),
    back() {
      this.$router.push({
        name: this.$route.params.category,
        params: this.$route.params.id,
      });
    },
    play() {
      this.setActiveItem(this.item.id);
      this.$router.push({ path: `/play/${this.$store.getters.activeItem.app || this.item.id}` });
    },
  },
};
</script>

<style scoped>
    .black {
        color: black;
    }

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
