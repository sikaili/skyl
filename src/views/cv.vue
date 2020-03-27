<template>
  <div class="bg-white-70 fr" :class="$mq !== `lg` ? 'ma0' : 'ma6 mt4 mw8'">
    <i
      @click="$router.go(-1)"
      class="fr right-0 pr2 f2 icon ion-md-close gray c-animate hover-black"
    ></i>
    <div
      :class="
        $mq !== `lg` ? 'pv4 mb5 ph1' : 'pa5 flex justify-center flex-column'
      "
    >
      <h1 class="fw3">Expérience Professionnelle</h1>
      <section class="pv2">
        <h1>
          Orange
          <span class="f5">Paris, Janvier 2019 – Juillet 2019</span>
        </h1>
        <h3>
          Développeur JS, UX/UI au sein d’une équipe agile de 4 personnes,
          réalisation de sites/Single-page Applications à la demande des clients
          internes.
        </h3>
        <h4 class="mt4 mb3">Responsabilités occupées :</h4>
        <ul class="lh-copy bt mt0">
          <SecondList
            v-for="(mission, i) in splitText(orange.firstMissons)"
            :key="i"
            :item="mission"
            :children="
              i == orange.secondMissons.number
                ? splitText(orange.secondMissons.text)
                : []
            "
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
          <span class="f5">Aix-en-Provence, April 2018 - Novembre 2018</span>
        </h1>
        <h3>
          Hiver à thecamp, co-créateur de 'Plastic Arcade’, une série de
          jeux-videos parlant de la pollution plastique, dans une résidence
          collaborative dont l'objectif est d’explorer de nouvelles solutions
          pour un futur désirable.
        </h3>
        <div class="flex flex-row">
          <Card
            caption="Konbini: 'Plastic Arcade', quand le jeu vidéo devient écolo"
            link="https://www.konbini.com/fr/gaming/video-plastic-arcade-quand-le-jeu-video-devient-ecolo/"
            :img="require(`@/assets/img/plastic-arcade.png`)"
          />
          <Card
            caption="France 24: Sensibiliser à la pollution plastique grâce au jeu vidéo"
            link="https://www.france24.com/fr/video/20181002-sensibiliser-a-pollution-plastique-grace-jeu-video-plastic-arcade-a-the-camp"
            :img="require(`@/assets/img/plastic-arcade-24.png`)"
          />
        </div>
        <h4 class="mt4 mb3">Responsabilités occupées :</h4>

        <ul class="lh-copy bt mt0">
          <SecondList
            v-for="(mission, i) in splitText(thecamp.firstMissons)"
            :key="i"
            :item="mission"
            :children="
              i == thecamp.secondMissons.number
                ? splitText(thecamp.secondMissons.text)
                : []
            "
          />
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
      <h1 class="fw3 mv4">Expositions & Concerts</h1>
      <TextContent
        v-for="expo in expos"
        :key="expo.title"
        :title="expo.title"
        :caption="expo.place"
        :content="expo.content"
      />
      <h1 class="fw3 mt5 mb4">Formations</h1>
      <TextContent
        v-for="formation in formations"
        :key="formation.title"
        :title="formation.title"
        :caption="formation.place"
        :content="formation.content"
      />
      <ButtonGoBack @click="$router.go(-1)" class="mv5" />
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
import Table from "@/components/Table.vue";
import SecondList from "@/components/SecondList.vue";
import TextContent from "@/components/TextContent.vue";
import ButtonGoBack from "@/components/ButtonGoBack.vue";

export default {
  components: {
    Card,
    Table,
    SecondList,
    TextContent,
    ButtonGoBack
  },
  data() {
    return {
      orange: {
        firstMissons: `Analyse des besoins clients et les transformer en wireframe;
Accompagnement des clients sur la conception d’interface, UX/UI;
Construction de Single-page Application en Vue.js;
Modifications et Maintenance des sites existants (jQuery ou autres technologies)`,
        secondMissons: {
          text: `Prototypage en utilisant Tachyons CSS et Bootstrap;
Responsive Design & Adaptive Design, avec Vue MQ;
State management centralisé avec Vuex;
Utilisation de Vue Analytics pour faciliter la connection entre Vue Router et Google Analytics`,
          number: 2
        }
      },
      thecamp: {
        firstMissons: `Prototypage des idées d'interactions en Javascript (p5.js et Canvas API);
Création d’installations art numérique, réalisation des animations en Javascript, développer des interactions avec Kinect, Leap Motion, Arduino;
Séances de 'Proof of Concept' avec des experts du domaine;
Participation aux workshops avec les clients, SNCF, Airbus, LVMH, etc…`,
        secondMissons: {
          text: ``,
          number: null
        }
      },
      expos: traiteText(expos),
      formations: traiteText(formations)
    };
  },
  methods: {
    splitText(str) {
      return str.split(";");
    }
  }
};

const expos = `SIANA, 2019@
Évry, France@
En relation avec la RGPD et dans un souci de transparence et de clarté, Datalaxy présente un programme de datavisualisation des données Facebook de l’utilisateur.

Le Cube, 2019@
Issy-les-Moulineaux, France@
Exposition de la majeure Id-DIM, un projet sur la sensibilisation d’utilisation de données personnelles.

Mains d’Œuvres, 2018@
Saint-Ouen, France@
Une exposition augmentée avec trois réalisations au thème de 'Traverser la mer sans que le ciel ne le sache'. 

Cité de la Musique de Marseille, 2017@
Marseille, France@
Tintamarres #7 Tintamarres #8, Composition musique concrète et performance : "Machine 1-10" "CB2" .

Le Printemps de Bourges, 2016@
Bourges, France@
Jouer au Printemps de Bourges Scène Berry, concours 'Printemps des Grandes Écoles'. `;
const formations = `IMT-BS + Télécom SudParis, 2018 - 2019@
Évry, France@
Post-Diplôme, BAC+5, Spécialisation "Inventivités Digitales": parcours multidisciplinaire et collaboratif à mi-chemin entre Management, Design et Ingénierie.

École Supérieure d'Art et de Design de Marseille, 2016 - 2018@
Marseille, France@
BAC+5 Technologies Web, Codage, Design d’Interface (UX/UI), Design d’Interaction, Design Génératif.

Dongguan University of Technology, 2011 - 2015 @
Dongguan, Chine@
BAC+4, Informatique, Conception Industrielle, l'école est en partenariat avec CNAM.

École de Design Nantes Atlantique, 2016@
Nantes, France@
BAC+3, Technologies Web, Codage, Design d’Interface (UX/UI), Design d’Interaction.

Université de Poitiers, 2015@
Poitiers, France@
Apprentissage de la langue française, littérature, histoire, culture
`;
const traiteText = str => {
  const arr = str.split(".");
  const dump = [];
  arr.map(a => {
    const arr1 = a.split("@");
    const e = {
      title: arr1[0],
      place: arr1[1],
      content: arr1[2]
    };
    dump.push(e);
  });
  return dump;
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
@media (max-width: 600px) {
  html {
    font-size: 10px;
  }
}
</style>
