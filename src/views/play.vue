<template>
  <SideMenu :linksArr="links" />
</template>

<script>
import { dataMxn } from "@/js/mixins";
import SideMenu from "@/components/SideMenu.vue";
export default {
  name: "play",
  data() {
    return {
      links: []
    };
  },
  components: {
    SideMenu
  },
  created() {
    dataMxn.getData("./data/links.json").then(res => {
      let links = res;
      const data = JSON.parse(JSON.stringify(this.$store.state));
      const dataAllCategories = [...data.work].concat([...data.music]);
      const linksArr = dataAllCategories.concat(links);
      linksArr.forEach(item => {
        item.id
          ? (item.name = item.id)
          : (item.name = this.getNameFromLink(item.link));
      });
      // sort items by name using localeCompare
      linksArr.sort((a, b) => a.name.localeCompare(b.name));
      this.$store.dispatch("setIframeItems", linksArr);
      let dump = linksArr.find(a => a.name == this.$route.params.id);
      if (dump.link && dump.link.split(":")[0].includes(`https`)) {
        this.$store.dispatch("setActiveLink", dump.link);
      }
    });
  },
  methods: {
    getNameFromLink: function(link) {
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
  }
};
</script>

<style scoped>
a:hover {
  background-color: black;
}
</style>
