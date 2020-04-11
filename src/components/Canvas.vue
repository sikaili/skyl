<template>
  <div>
    <div id="canvasContainer" />
    <div v-if="$route.name ==='play'">
      <div
        v-if="!showCanvasSettings && (settings || type === 'music')"
        class="Settings Settings__Icon white bg-black-80 bg-animate hover-bg-white hover-black pv2 ph3"
        @click="toggle('showCanvasSettings')"
      >
        <i
          class="tc icon ion-md-settings f3"
        />
      </div>

      <div
        v-else
        class="Settings Settings__Menu"
        :class="{ 'Settings__Menu--active' : showCanvasSettings }"
      >
        <div
          v-if="showCanvasSettings"
          class="Settings__Close c-animate"
          @click.once="toggle('showCanvasSettings')"
        >
          <i
            class="tc icon ion-md-close f3"
          />
        </div>
        <p
          v-if="(settings && settings.player) || type === 'music'"
          class="Settings__Player pa2 bg-animate hover-bg-white hover-black mb0 pb2 white bg-black-60"
          @click="toggle('showPlayerList')"
        >
          {{ songId?songId :'Player' }}
          <i
            :class="
              `hover-black fr ma0 icon ion-md-arrow-drop-down ${
                showPlayerList ? ` ion-md-arrow-dropup` : ' ion-md-arrow-dropdown'
              }`
            "
          />
        </p>
        <div
          v-if="showPlayerList"
          class="Settings__PlayerList overflow-y-scroll f6 tl bg-white-30"
          :class="{ 'Settings__PlayerList--full': type === 'music' }"
        >
          <span
            v-for="(songId, index) in songs"
            :key="index"
          >
            <p
              class="Settings__PlayerListItem ph3 bg-animate hover-bg-white hover-black white bg-black-60"
              @click="setSketchSong(songId)"
            >
              {{ songId }}
            </p>
          </span>
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
              v-if="value.type ==='range'"
              :id="name"
              v-model="settings[name].value"
              :name="name"
              class="Settings__MenuContainerInput"
              :class="{ 'Settings__MenuContainerInput--checkbox' : settings[name].max === 1 && settings[name].step === 1 }"
              :type="settings[name].type"
              :min="settings[name].min"
              :max="settings[name].max"
              :step="settings[name].step"
            >
            <input
              v-if="value.type==='text'"
              v-model="settings[name].value"
              class="Settings__MenuContainerInput--text"
            >
          </template>
        </div>
        <div class="Settings__MenuContainer pt3 pb2">
          <i
            v-if="settings && settings.red"
            class="icon ion-md-shuffle f3 white bg-black-80 bg-animate hover-bg-white hover-black pv2 ph3"
            @click="setRGB()"
          />
          <template v-if="settings && settings.actions">
            <i
              v-for="action in settings.actions"
              :key="action.name"
              class="icon f3 white bg-black-80 bg-animate hover-bg-white hover-black pv2 ph3"
              :class="`ion-md-${action.icon}`"
              @click="actionButton(action.name, action)"
            />
          </template>
          <i
            class="icon ion-md-sync f3 white bg-white-50 bg-animate hover-bg-white hover-black pv2 ph3"
            @click="forceUpdate()"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import p5 from 'p5/lib/p5.min';

p5.disableFriendlyErrors = true;

let current;
let loaded = true;
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
    type: { type: String, default: '' },
  },
  data() {
    return {
      showPlayerList: this.type === 'music',
      showCanvasSettings: false,
      settings: null,
      songs: ['Rotation', 'La-Danse', 'flower', 'saturation-chinoise', '2019-12-YeChe', 'Rain-Addiction', 'Emb', 'c-syn', 'e-minor'],
      iframes: ['c-syn', 'e-minor', 'flower', 'saturation-chinoise'],
      songId: null,
    };
  },
  watch: {
    settings: {
      deep: true,
      handler(val) {
        localStorage.setItem(this.current, JSON.stringify(val));
      },
    },
    songId(val) {
      if (this.iframes.includes(val)) {
        return;
      }
      switch (val) {
        case 'Rotation':
          this.setRGB([0, 50, 0]);
          break;
        case 'La-Danse':
          this.setRGB([159, 45, 58]);
          break;
        case 'Hua':
          this.setRGB([0, 0, 36]);
          break;
        case 'Rain-Addiction':
          this.setRGB([255, 50, 50]);
          break;
        default:
          break;
      }
    },
  },
  beforeMount() {
    loaded = false;
    if (this.type !== 'music') {
      changeSketch(this.current);
    }
    loaded = true;
    const getSettings = (retry) => {
      if (this.type === 'music') {
        this.songId = this.current;
        return;
      }
      setTimeout(() => {
        if (current && current.settings && Object.keys(current.settings)) {
          this.songId = current.songId ? current.songId : null;

          const savedSettings = JSON.parse(localStorage.getItem(this.current));
          // set only static values, get() begins with _
          if (savedSettings) {
            const keys = Object.keys(savedSettings).filter((name) => !name.includes('get') && name !== 'actions');
            keys.forEach((key) => {
              current.settings[key] = savedSettings[key];
            });
          }

          this.settings = current.settings;
        } else if (!retry) {
          getSettings(true);
        }
      }, retry ? 1500 : 500);
    };
    getSettings();
  },
  beforeDestroy() {
    if (current) {
      try {
        current.stop();
      } catch (err) {
        console.log(err);
      }
    }
    this.$root.$emit('emit-showSideMenu', true);
  },
  destroyed() {
    current = undefined;
  },
  methods: {
    setSketchSong(songId) {
      if (this.type === 'music') {
        if (this.iframes.includes(songId)) {
          this.$store.dispatch('setActiveItem', songId);
          this.$router.push({ params: { id: songId } });
        } else {
          this.$store.dispatch('setActiveItem', 'player');
          this.$router.push({ params: { id: 'player' }, query: { id: songId } });
        }
        return;
      }
      if (!this.iframes.includes(songId)) {
        current.setSong(songId);
        this.toggle('showCanvasSettings');
        this.songId = songId;
        this.$router.push({ query: { id: songId } });
      } else {
        this.$store.dispatch('setActiveItem', songId);
        this.$router.push({ params: { id: songId } });
      }
    },
    setRGB(colorArray) {
      ['red', 'green', 'blue'].forEach((color, index) => {
        this.setRangeInput(color, colorArray && typeof colorArray[index] === 'number' ? colorArray[index] : null);
      });
    },
    actionButton(actionName, action) {
      action.on = !action.on;
      current[actionName]();
    },
    setRangeInput(name, value) {
      if (typeof value === 'number') {
        this.settings[name].value = value;
      } else {
        this.settings[name].value = current.random(this.settings[name].min, this.settings[name].max);
      }
    },
    forceUpdate() {
      if (window.confirm('Update to the newest version?')) { //eslint-disable-line
        window.location.reload(true);
      }
    },
    toggle(itemName) {
      if (this[itemName]) {
        this.hide(itemName);
      } else {
        this.show(itemName);
      }
    },
    show(itemName) {
      this[itemName] = true;
      if (itemName === 'showCanvasSettings') { this.$root.$emit('emit-showSideMenu', !this.showCanvasSettings); }
      setTimeout(() => document.querySelector('#canvasContainer').addEventListener('click', () => { this.hide(itemName); }), 0);
      setTimeout(() => document.querySelector('#canvasContainer').addEventListener('touchstart', () => { this.hide(itemName); }), 0);
    },
    hide(itemName) {
      this[itemName] = false;
      if (itemName === 'showCanvasSettings') { this.$root.$emit('emit-showSideMenu', !this.showCanvasSettings); }
      document.querySelector('#canvasContainer').removeEventListener('click', () => { this.hide(itemName); });
      document.querySelector('#canvasContainer').removeEventListener('touchstart', () => { this.hide(itemName); });
    },
  },
};
</script>

<style lang="scss" scoped>
    #canvasContainer {
        position: absolute;
        z-index: -999;
        width: 100vw;
        height: 100vh;
    }

    .Settings {
        position: absolute;
        transition: all 0.5s;

        &__Icon {
            position: fixed;
            right: 28px;
            bottom: 30px;
        }

        &__Close {
            color: black;
            font-size: 30px;
            position: absolute;
            padding: 0 8px 12px 16px;
            right: 0;
            top: 0;
        }

        &__Menu {
            background-color: rgba(220,220,220,0.7);
            width: auto;
            position: fixed;
            right: 30px;
            height: 0%;
            top: 100%;
            padding-top: 24px;

            &Container {
                margin: 16px;

                &Input {
                    float: right;
                    background: transparent;
                    margin-left: 8px !important;
                    width: 120px !important;

                    &--text {
                        margin-left: 8px;
                        padding: 0 4px;
                        border: none;
                        border-radius: 0;
                        margin: 0;
                        height: 24px;
                        float: right;
                        width: 96px;
                    }

                    &--checkbox {
                        width: 50px !important;
                    }

                    &Label {
                        line-height: 24px;
                        font-size: 14px;
                    }
                }
            }

            &--active {
                top: unset;
                bottom: 30px;
                height: auto;
            }
        }

        &__Player {
            min-width: 208px;

            &List {
                max-height: 184px;
                background-color: rgba(0, 0, 0, 0.3);

                &--full {
                    max-height: 352px;
                }
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
