<template>
  <SideMenu :linksArr="linksArr" :givenLink="lauchLink" />
</template>

<script>
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
        { link: "https://apps.skyl.fr/p/" },
        { link: "https://apps.skyl.fr/eyes-sand-sound/" },
        { link: "https://apps.skyl.fr/eyes-macro/" },
        { link: "https://apps.skyl.fr/fractal-circles/" },
        { link: "https://apps.skyl.fr/strange-eyes/" },
        { link: "https://apps.skyl.fr/glitch/" },
        { link: "https://apps.skyl.fr/wind/" },
        { link: "https://apps.skyl.fr/corogo/" }
      ]
    };
  },
  components: {
    SideMenu
  },
  methods: {
    getName: function(link) {
      let nameStr = link.split("//");
      if (!nameStr[0].includes("https")) {
        return "";
      }
      // links from apps github host
      if (nameStr[1].includes(`apps`)) {
        nameStr = link.split("/");
        nameStr = nameStr[nameStr.length - 2];
        // links from subdomain
      } else {
        nameStr = nameStr[1].split(".")[0];
      }
      return nameStr;
    }
  },
  computed: {
    linksArr: function() {
      // deep copy dataObj
      const data = JSON.parse(JSON.stringify(this.$store.state));
      const dataAllCategories = [...data.work].concat([...data.music]);
      const linksArr = dataAllCategories.concat(this.links);
      linksArr.forEach(item => {
        item.id ? (item.name = item.id) : (item.name = this.getName(item.link));
      });
      // sort items by name using localeCompare
      linksArr.sort((a, b) => a.name.localeCompare(b.name));
      return linksArr;
    },
    lauchLink: function() {
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
      if (this.lauchLink.split(":")[0].includes(`https`)) {
        this.$store.dispatch("setLink", this.lauchLink);
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
