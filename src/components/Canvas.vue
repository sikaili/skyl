<template>
  <div>
    <div id="canvasContainer" />
    <div v-if="$route.name ==='play'">
      <div
        v-if="showSettingsIcon"
        class="Settings Settings__Icon white bg-black-80 bg-animate hover-bg-white hover-black pv2 ph3"
        @click.stop="toggle('showCanvasSettings')"
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
        <div class="Settings__Version">
          version: {{ version }}
        </div>

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
          v-if="list"
          class="Settings__Player pa2 bg-animate hover-bg-white hover-black mb0 pb2 white bg-black-60"
          @click="toggle('showList')"
        >
          {{ list.current || songId|| 'Player' }}
          <i
            :class="
              `hover-black fr ma0 icon ion-md-arrow-drop-down ${
                showList ? ` ion-md-arrow-dropup` : ' ion-md-arrow-dropdown'
              }`
            "
          />
        </p>
        <div
          v-if="showList"
          class="Settings__PlayerList overflow-y-scroll f6 tl bg-white-30"
          :class="{ 'Settings__PlayerList--full': type === 'musicIframe' }"
        >
          <span
            v-for="(item, index) in list.items"
            :key="index"
          >
            <p
              class="Settings__PlayerListItem ph3 bg-animate hover-bg-white hover-black white bg-black-60"
              @click="setCurrentItem(item)"
            >
              {{ item }}
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
            class="Settings__MenuActionButton icon ion-md-shuffle f3 white bg-black-80 bg-animate hover-bg-white hover-black"
            @click="setRGB()"
          />
          <template v-if="settings && settings.actions">
            <i
              v-for="(action, index) in settings.actions"
              :key="index"
              class="Settings__MenuActionButton icon f3 white bg-black-80 bg-animate hover-bg-white hover-black"
              :class="`ion-md-${action.icon}`"
              @click="actionButton(action.name, action)"
            />
          </template>
          <i
            class="Settings__MenuActionButton icon ion-md-share-alt f3 white bg-black-80 bg-animate hover-bg-white hover-black"
            @click="copyToClipBoard()"
          />
          <!-- <i
            class="Settings__MenuActionButton icon ion-md-sync f3 white bg-white-50 bg-animate hover-bg-white hover-black"
            @click="forceUpdate()"
          /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import p5 from 'p5/lib/p5.min';
import { mapGetters } from 'vuex';
import copyToClipBoard from '@/js/utlis/copyToClipBoard';

p5.disableFriendlyErrors = true;
let current;
let loaded = true;

window.addEventListener('resize', () => {
  setTimeout(() => {
    const width = document.documentElement.clientWidth
      || window.innerWidth || document.body.clientWidth;
    const height = document.documentElement.clientHeight
      || window.innerHeight || document.body.clientHeight;
    p5.prototype.windowHeight = height;
    p5.prototype.windowWidth = width;
    if (current) {
      current.resize(width, height);
    }
  }, 300);
});

const changeSketch = (name) => {
  name = name.toLowerCase();
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
      showList: this.type === 'musicIframe',
      showCanvasSettings: false,
      settings: null,
      songs: { items: ['Cripple', 'Amarrage', 'La-Danse', 'flower', 'saturation-chinoise', '2019-12-YeChe', 'Rain-Addiction', 'Emb', 'c-syn', 'e-minor'] },
      iframes: ['c-syn', 'e-minor', 'flower', 'saturation-chinoise'],
      songId: null,
      version: process.env.VUE_APP_VERSION,
    };
  },
  computed: {
    ...mapGetters(['activeItem', 'canvasFullScreen']),
    isPlayer() {
      return ['player', 'cave'].includes(this.current);
    },
    showSettingsIcon() {
      return !this.showCanvasSettings && (this.settings || this.type === 'musicIframe') && !this.canvasFullScreen;
    },
    list() {
      if (this.type === 'musicIframe' || this.current === 'player' || this.current === 'cave') {
        return this.songs;
      }
      if (this.settings && this.settings.list && this.settings.list.items) {
        return this.settings.list;
      }
      return null;
    },
  },
  watch: {
    settings: {
      deep: true,
      handler(val) {
        const toStore = JSON.parse(JSON.stringify(val));
        Object.keys(toStore).forEach((name) => {
          if (name.includes('get') || name === 'actions' || !toStore[name].type) {
            delete toStore[name];
          }
        });
        localStorage.setItem(this.current, JSON.stringify(toStore));
      },
    },
    songId(val) {
      if (this.iframes.includes(val) || this.current !== 'player') {
        return;
      }
      switch (val) {
        case 'amarrage':
        case 'Amarrage':
        case 'rotation':
        case 'Rotation':
          this.setRGB([113, 10, 10]);
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
    if (this.type !== 'musicIframe') {
      changeSketch(this.current);
    }
    loaded = true;
    const getSettings = (retry) => {
      if (this.type === 'musicIframe') {
        this.songId = this.current;
        return;
      }
      setTimeout(() => {
        if (current && current.settings && Object.keys(current.settings)) {
          this.songId = current.songId ? current.songId : null;

          const savedSettings = JSON.parse(localStorage.getItem(this.current));
          // set only static values, get() begins with get
          if (savedSettings) {
            const keys = Object.keys(savedSettings).filter((name) => !name.includes('get') && name !== 'actions');
            keys.forEach((key) => {
              if (current.settings[key] && current.settings[key].type) {
                current.settings[key] = savedSettings[key];
              }
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
  mounted() {
    if (this.isPlayer && (this.activeItem.id !== this.current)) {
      this.$router.push({ params: { id: this.current }, query: { id: this.activeItem.id } });
    }
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
    setCurrentItem(songId) {
      if (this.list && this.list.action) {
        current[this.list.action](songId);
        return;
      }
      if (this.type === 'musicIframe') {
        if (this.iframes.includes(songId)) {
          this.$store.dispatch('setActiveItem', songId);
          this.$router.push({ params: { id: songId } });
        } else {
          const playerId = Math.random() > 0.5 ? 'cave' : 'player';
          this.$store.dispatch('setActiveItem', playerId);
          this.$router.push({ params: { id: playerId }, query: { id: songId } });
        }
        return;
      }

      if (!this.iframes.includes(songId)) {
        current.setSong(songId);
        this.hide('showCanvasSettings');
        this.songId = songId;
        this.$router.push({ query: { id: songId } });
      } else {
        this.$store.dispatch('setActiveItem', songId);
        this.$router.push({ params: { id: 'player' }, query: { id: songId } });
      }
    },
    setRGB(colorArray) {
      ['red', 'green', 'blue'].forEach((color, index) => {
        this.setRangeInput(color, colorArray && typeof colorArray[index] === 'number' ? colorArray[index] : null);
      });
    },
    actionButton(actionName, action) {
      action.on = !action.on;
      if (action.value) {
        current[actionName](...action.value);
      } else {
        current[actionName]();
      }
    },
    setRangeInput(name, value) {
      if (typeof value === 'number') {
        this.settings[name].value = value;
      } else {
        this.settings[name].value = current.random(this.settings[name].min, this.settings[name].max);
      }
    },
    // forceUpdate() {
    //   if (window.confirm('Empty cache/settings and update to the newest version?')) { //eslint-disable-line
    //     localStorage.removeItem(this.current);
    //     localStorage.setItem('lastPlayed', this.$route.params.id);
    //     this.$router.push({ name: 'home' });
    //     if ('serviceWorker' in navigator) {
    //       navigator.serviceWorker.register('/service-worker.js').then((registration) => {
    //         registration.update();
    //         window.location.reload(true);
    //       });
    //     } else {
    //       window.location.reload(true);
    //     }
    //   }
    // },
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
    copyToClipBoard() {
      copyToClipBoard(process.env.VUE_APP_PROD_URL + this.$route.fullPath);
      window.alert('Link copied to clipboard.'); //eslint-disable-line
    },
  },
};
</script>
<style lang="scss" scoped>
    #canvasContainer {
        position: absolute;
        z-index: -999;
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
            max-width: calc(100vw - 72px);
            position: fixed;
            right: 28px;
            height: 0%;
            top: 100%;
            padding-top: 24px;

            &Container {
                margin: 16px;
                overflow: visible;

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


            &ActionButton {
                display: block;
                float: left;
                margin: 10px 0;
                padding: 12px 0;
                text-align: center;
                width: 56px;
            }

            &--active {
                top: unset;
                bottom: 30px;
                padding-bottom: 18px;
                height: auto;
            }
        }

        &__Version {
            position: absolute;
            bottom: 4px;
            left: 16px;
            font-size: 10px;
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
