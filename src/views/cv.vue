<template>
  <div class="ma5 ph5 pv5 bg-white-70">
    <h1 class="fw3">Expérience Professionnelle</h1>
    <section class="pv3">
      <h1>
        Orange
        <span class="f5">Janvier 2019 – Juillet 2019</span>
      </h1>
      <h3>
        Développeur, UX/UI au sein d’une équipe agile de 3 personnes,
        réalisations de site/SPA à la demande des clients internes.
      </h3>
      <h4 class="mt4 mb3">Responsabilités occupées :</h4>
      <ul class="lh-copy bt mt0">
        <SecondList
          v-for="(mission, i) in missions"
          :key="i"
          :item="mission"
          :children="i == rawChildren.number ? childMissons : ''"
        />
      </ul>
      <h4 class="mt4 mb3">Environnement Technique :</h4>
      <Table
        :categories="['Langages', 'Librairies', 'Outils & Plug-ins']"
        :content="[
          'Javascript, CSS, HTML, PHP',
          'Vue.js, P5.js, jQuery, Bootstrap, Tachyons, Symfony',
          'Git, Gulp, Visual Studio, Vue CLI, Vetur, Emmet, ESLint, Prettier, Babel, Sketch, Adobe Suite'
        ]"
      />
    </section>
    <section class="pv3">
      <h1>
        thecamp
        <span class="f5">April 2018 - Novembre 2018</span>
      </h1>
      <h3>
        Hiver à thecamp. Une résidence collaborative dont l'objectif est
        d’explorer de nouvelles solutions pour un futur désirable. Co-fondateur
        d’une série de jeux-videos parlant de la pollution plastique.
      </h3>
      <div class="flex flex-row">
        <Card
          caption="Kobini: 'Plastic Arcade', quand le jeu vidéo devient écolo"
          link="https://www.konbini.com/fr/gaming/video-plastic-arcade-quand-le-jeu-video-devient-ecolo/"
          :img="require(`@/assets/plastic-arcade.png`)"
        />
        <Card
          caption="France 24: Sensibiliser à la pollution plastique grâce au jeu vidéo"
          link="https://www.france24.com/fr/video/20181002-sensibiliser-a-pollution-plastique-grace-jeu-video-plastic-arcade-a-the-camp"
          :img="require(`@/assets/plastic-arcade-24.png`)"
        />
      </div>
      <ul class="lh-copy">
        <li>
          Différentes séances de 'Proof of Concept', avec les experts du domaine
          et le grand publique
        </li>
        <li>
          Prototypage des idées jeux-videos en Javascript (p5.js et Canvas API)
        </li>
        <ul>
          <li>Prototypage UI en utilisant Tachyons CSS et Bootstrap</li>
        </ul>
        <li>
          Création de différentes installations art numérique, développement des
          animations en Javascript, définir l’interaction avec Kinect, Leap
          Motion, Arduino...
        </li>
        <li>Design d’interaction, design sonore pour les jeux-vidéos</li>
      </ul>
      <h4 class="mt4 mb3">Environnement Technique :</h4>
      <Table
        :categories="['Langages', 'Librairies', 'Outils & Plug-ins']"
        :content="[
          'Javascript, CSS, HTML',
          'p5.js, d3.js, Arduino',
          'Git, Gulp, Visual Studio, Arduino IDE, Processing IDE, Unity'
        ]"
      />
    </section>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
import Table from "@/components/Table.vue";
import SecondList from "@/components/SecondList.vue";

export default {
  components: {
    Card,
    Table,
    SecondList
  },
  data() {
    return {
      rawMissions: `Analyse des besoins clients et les transformer en wireframe;
Accompagnement des clients sur la conception d’interface, UX/UI;
Construction de Single-page Application en Vue.js;
Modifications et Maintenance des sites existants (jQuery ou autres technologies)`,
      rawChildren: {
        text: `Prototypage en utilisant Tachyons CSS et Bootstrap;
Responsive Design & Adaptive Design, avec Vue MQ;
State management centralisé avec Vuex;
Utilisation de Vue Analytics pour faciliter la connection entre Vue Router et Google Analytics`,
        number: 2
      }
    };
  },
  computed: {
    missions() {
      return this.rawMissions.split(";");
    },
    childMissons() {
      return this.rawChildren.text.split(";");
    }
  }
};
</script>

<style scoped>
* {
  font-family: "Helvetica Neue", sans-serif;
}

ul li {
  padding: 0.5rem 0;
}
span {
  font-weight: 400;
}
</style>
