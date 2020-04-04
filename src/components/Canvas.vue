<template>
  <div>
    <div id="canvasContainer" />
    <div
      v-if="!showSettings && settings"
      class="Settings Settings__Icon white bg-black-80 bg-animate hover-bg-white hover-black pv2 ph3"
      @click="toggleSettings()"
    >
      <i
        :class="
          `tc icon ion-md-settings f3`
        "
      />
    </div>

    <div
      v-else
      class="Settings Settings__Menu"
      :class="{ 'Settings__Menu--active' : showSettings }"
    >
      <i
        class="fr right-0 ph1 mr3 mt1 f3 icon ion-md-close black c-animate hover-grey"
        @click="toggleSettings()"
      />

      <div
        v-for="(value, name) in settings"
        :key="name"
        class="Settings__MenuInputs"
      >
        <template v-if="value.type">
          <label :for="name">{{ name }}</label>
          <input
            :id="name"
            v-model="settings[name]['value']"
            :name="name"
            class="Settings__MenuInput"
            :type="settings[name].type"
            :min="settings[name].min"
            :max="settings[name].max"
            :step="settings[name].step"
          >
        </template>
        <div />
      </div>
    </div>
  </div>
</template>

<script>
import p5 from 'p5/lib/p5.min';

p5.disableFriendlyErrors = true;

let current;
let loaded = true;
console.log('here');
const changeSketch = (name) => {
  if (!loaded) {
    loaded = true;
    import("./../projects/" + name + "/" + name+ ".js").then(module => { //eslint-disable-line
    current = new p5(module.default, 'canvasContainer'); //eslint-disable-line
    });
  }
};
export default {
  name: 'Canvas',
  props: {
    current: { type: String, default: '' },
  },
  data() {
    return {
      showSettings: false,
      settings: null,
    };
  },
  watch: {
    settings() {
      current.settings = this.settings;
    },
  },
  beforeMount() {
    loaded = false;
    changeSketch(this.current);
    loaded = true;
    setTimeout(() => {
      if (current && current.settings && Object.keys(current.settings)) {
        this.settings = current.settings;
      }
    }, 500);
  },
  mounted() {
  },
  beforeDestroy() {
    if (current) {
      current.stop();
    }
  },
  destroyed() {
    current = undefined;
  },
  methods: {
    toggleSettings() {
      this.showSettings = !this.showSettings;
      // this.settings = current.settings;
    },

  },
};
</script>

<style lang="scss" scoped>
#canvasContainer {
  z-index: -999;
}
.Settings {
  transition: all 0.5s;

  &__Icon {
    position: fixed;
    right: 30px;
    bottom: 30px;
  }
  &__Menu {
    background-color: rgba(255,255,255,0.8);
    width: auto;
    position: absolute;
    right: 0;
    height: 0%;
    top: 100%;
    &Inputs {
      display: flex;
      flex-direction: column;
      margin: 12px;
    }

    &Input {
      margin: 8px 0 0;
      height:32px;
      width: 100px;
    }

    &--active {
      top: 50%;
      height: 50%;

    }
  }
}
</style>
