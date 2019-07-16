<template>
  <SideMenu :linksArr="linksArr" :givenLink="startLink" />
</template>

<script>
import dataObj from "@/data.js";
import SideMenu from "@/components/SideMenu.vue";
export default {
  name: "play",
  data() {
    return {
      links: [
        { link: "https://rain.skyl.fr" },
        { link: "https://forces.skyl.fr" },
        // { link: "https://k.skyl.fr" },
        { link: "https://data.skyl.fr" },
        { link: "https://apps.skyl.fr/3d-terrain/" },
        { link: "https://apps.skyl.fr/toxic/" },
        { link: "https://apps.skyl.fr/washed/" },
        { link: "https://apps.skyl.fr/e-minor/" },
        { link: "https://apps.skyl.fr/blood-particles-2017/" },
        { link: "https://apps.skyl.fr/c-syn/" },
        // { link: "https://apps.skyl.fr/happy-birthday-mon-zhu/" },
        { link: "https://apps.skyl.fr/eyes-sand-sound/" },
        { link: "https://apps.skyl.fr/eyes-macro/" },
        { link: "https://apps.skyl.fr/fractal-circles/" },
        { link: "https://apps.skyl.fr/strange-eyes/" },
        { link: "https://apps.skyl.fr/glitch/" },
        { link: "https://apps.skyl.fr/wind/" }
      ]
    };
  },
  components: {
    SideMenu
  },
  methods: {
    getName: function(link) {
      let dump = link.split("//");
      if (!dump[0].includes("https")) {
        return "";
      }
      if (dump[1].includes(`apps`)) {
        dump = link.split("/");
        dump = dump[dump.length - 2];
      } else {
        dump = dump[1].split(".")[0];
      }
      return dump;
    }
  },
  computed: {
    linksArr: function() {
      // deep copy dataObj
      const data = JSON.parse(JSON.stringify(dataObj));
      const arr = [...data.work].concat([...data.music]);
      const dump = arr.concat(this.links);
      dump.forEach(a => {
        a.id ? (a.name = a.id) : (a.name = this.getName(a.link));
      });
      // sort items by name using localeCompare
      dump.sort((a, b) => a.name.localeCompare(b.name));
      return dump;
    },
    startLink: function() {
      let dump = this.linksArr.find(a => a.name == this.$route.params.id);
      if (!dump) {
        return "";
      } else {
        return dump.link;
      }
    }
  },
  mounted() {
    this.$nextTick(function() {
      // Code that will run only after the
      // entire view has been rendered
      if (this.startLink.split(":")[0].includes(`https`)) {
        this.$root.$emit("itemDesOpen", this.startLink);
      }
    });
  }
};
</script>

<style scoped>
a:hover {
  background-color: black;
}
</style>
