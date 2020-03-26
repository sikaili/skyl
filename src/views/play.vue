<template>
  <SideMenu :linksArr="linksArr" :givenLink="lauchLink" />
</template>

<script>
import { data as dataMxn } from "@/js/mixins";
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
  created() {
    dataMxn.getData("./data/links.json").then(res => {
      this.links = res;
    });
  },
  mounted() {
    this.$nextTick(function() {
      if (this.lauchLink.split(":")[0].includes(`https`)) {
        this.$store.dispatch("setLink", this.lauchLink);
      }
    });
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
  }
};
</script>

<style scoped>
a:hover {
  background-color: black;
}
</style>
