<template>
  <div>
    <div id="canvasContainer" />
    <div
      v-if="!showSettings && settings"
      class="Settings Settings__Icon white bg-black-80 bg-animate hover-bg-white hover-black pv2 ph3"
      @click="toggleSettings()"
    >
      <i
        class="tc icon ion-md-settings f3"
      />
    </div>

    <div
      v-else
      class="Settings Settings__Menu"
      :class="{ 'Settings__Menu--active' : showSettings }"
    >
      <div class="Settings__Close black c-animate">
        <i
          class="tc icon ion-md-close f3"
          @click="toggleSettings()"
        />
      </div>

      <div
        v-for="(value, name) in settings"
        :key="name"
        class="Settings__MenuContainer"
      >
        <template v-if="value.type">
          <label
            class="Settings__MenuContainerInputLabel"
            :for="name"
          >{{ name }}</label>
          <input
            v-if="value.type==='range'"
            :id="name"
            v-model="settings[name]['value']"
            :name="name"
            class="Settings__MenuContainerInput"
            :type="settings[name].type"
            :min="settings[name].min"
            :max="settings[name].max"
            :step="settings[name].step"
          >
        </template>
      </div>
      <div class="Settings__MenuContainer pv3">
        <i
          class="icon ion-md-aperture f3 white bg-black-80 bg-animate hover-bg-white hover-black pv2 ph3"
        />
        <i
          class="ma1 icon ion-md-save f3 white bg-black-80 bg-animate hover-bg-white hover-black pv2 ph3"
        />
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
      try {
        current.stop();
      } catch (err) {
        console.log(err);
      }
    }
  },
  destroyed() {
    current = undefined;
  },
  methods: {
    toggleSettings() {
      this.showSettings = !this.showSettings;
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

  &__Close {
    font-size: 30px;
    position:absolute;
    padding: 0 8px 12px 12px;
    right:0;
    top:0;
  }
  &__Menu {
    background-color: rgba(255,255,255,0.6);
    width: auto;
    position: absolute;
    right: 30px;
    height: 0%;
    top: 100%;
    padding-top: 24px;

    &Container {
      margin: 24px;

      &Input {
        float:right;
        background: transparent;
        margin-left: 8px !important;
        width: 120px !important;

        &Label{
          // margin-bottom: 8px;
        }
      }
    }

    &--active {
      top: 50%;
      height: calc(50% - 30px);

    }
  }
}
input[type=range].Settings__MenuContainerInput {
  -webkit-appearance: none;
  width: 100%;
  margin: -1.45px 0;
}
input[type=range].Settings__MenuContainerInput:focus {
  outline: none;
}
input[type=range].Settings__MenuContainerInput::-webkit-slider-runnable-track {
  width: 100%;
  height: 26.9px;
  cursor: pointer;
  box-shadow: 0.2px 0.2px 0px rgba(100, 100, 100, 0.1), 0px 0px 0.2px rgba(113, 113, 113, 0.1);
  background: #dadce1;
  border-radius: 25px;
  border: 1.6px solid rgba(180, 180, 100, 0);
}
input[type=range].Settings__MenuContainerInput::-webkit-slider-thumb {
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px rgba(13, 13, 13, 0);
  border: 1px solid rgba(100, 100, 100, 0.1);
  height: 24px;
  width: 24px;
  border-radius: 13px;
  background: rgba(0, 0, 0, 0.8);
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -0.15px;
}
input[type=range].Settings__MenuContainerInput:focus::-webkit-slider-runnable-track {
  background: #ffffff;
}
input[type=range].Settings__MenuContainerInput::-moz-range-track {
  width: 100%;
  height: 26.9px;
  cursor: pointer;
  box-shadow: 0.2px 0.2px 0px rgba(100, 100, 100, 0.1), 0px 0px 0.2px rgba(113, 113, 113, 0.1);
  background: #dadce1;
  border-radius: 25px;
  border: 1.6px solid rgba(180, 180, 100, 0);
}
input[type=range].Settings__MenuContainerInput::-moz-range-thumb {
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px rgba(13, 13, 13, 0);
  border: 1px solid rgba(100, 100, 100, 0.1);
  height: 24px;
  width: 24px;
  border-radius: 13px;
  background: rgba(0, 0, 0, 0.8);
  cursor: pointer;
}
input[type=range].Settings__MenuContainerInput::-ms-track {
  width: 100%;
  height: 26.9px;
  cursor: pointer;
  background: transparent;
  border-color: transparent;
  color: transparent;
}
input[type=range].Settings__MenuContainerInput::-ms-fill-lower {
  background: #b0b4bf;
  border: 1.6px solid rgba(180, 180, 100, 0);
  border-radius: 50px;
  box-shadow: 0.2px 0.2px 0px rgba(100, 100, 100, 0.1), 0px 0px 0.2px rgba(113, 113, 113, 0.1);
}
input[type=range].Settings__MenuContainerInput::-ms-fill-upper {
  background: #dadce1;
  border: 1.6px solid rgba(180, 180, 100, 0);
  border-radius: 50px;
  box-shadow: 0.2px 0.2px 0px rgba(100, 100, 100, 0.1), 0px 0px 0.2px rgba(113, 113, 113, 0.1);
}
input[type=range].Settings__MenuContainerInput::-ms-thumb {
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px rgba(13, 13, 13, 0);
  border: 1px solid rgba(100, 100, 100, 0.1);
  width: 24px;
  border-radius: 13px;
  background: rgba(0, 0, 0, 0.8);
  cursor: pointer;
  height: 24px;
}
input[type=range].Settings__MenuContainerInput:focus::-ms-fill-lower {
  background: #dadce1;
}
input[type=range].Settings__MenuContainerInput:focus::-ms-fill-upper {
  background: #ffffff;
}


</style>
