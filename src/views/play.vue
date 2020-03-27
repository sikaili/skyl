<template>
  <SideMenu />
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
      let extraIframeLinks = res;
      // get all links
      const data = JSON.parse(JSON.stringify(this.$store.state));
      const linksFromProjects = [...data.work].concat([...data.music]);
      const allIframeLinks = linksFromProjects.concat(extraIframeLinks);
      allIframeLinks.forEach(item => {
        item.id
          ? (item.name = item.id)
          : (item.name = this.getNameFromLink(item.link));
      });
      allIframeLinks.filter(iframeObject => iframeObject.name);
      // sort items by name using localeCompare
      allIframeLinks.sort((a, b) => a.name.localeCompare(b.name));
      this.$store.dispatch("setIframeItems", allIframeLinks);
      let dump = allIframeLinks.find(a => a.name == this.$route.params.id);
      if (dump && dump.link) this.$store.dispatch("setActiveLink", dump.link);
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
