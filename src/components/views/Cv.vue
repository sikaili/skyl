<template>
  <div
    class="CV CV__container bg-white-70"
    :class="
      $mq !== 'lg' ? 'pv4 mb5 ph3' : 'mt4 mb 5 mw8 pa5 flex justify-center flex-column'
    "
  >
    <i
      class="CV__close pr2 f2 icon ion-md-close gray c-animate hover-black"
      @click="$router.go(-1)"
    />
    <h1 class="fw3">
      {{ categories[lang].h1 }}
    </h1>
    <section
      v-for="(project,index) in projects"
      :key="index"
      class="pv3"
    >
      <h1>
        {{ project.companyName }}
        <span class="f5">{{ project.cityAndDate }}</span>
      </h1>
      <h3 class="CV__descriptioin">
        {{ project.description }}
      </h3>
      <div
        v-if="project.cards"
        class="flex flex-row"
      >
        <base-card
          v-for="card in project.cards"
          :key="card.caption"
          :caption="card.caption"
          :link="card.link"
          :img="card.img"
          :mq="$mq"
        />
      </div>
      <h4 class="mt4 mb3">
        {{ categories[lang].responsability }}
      </h4>

      <ul class="lh-copy bt mt0">
        <base-list-clickable
          v-for="(mission, i) in splitText(project.firstMissons)"
          :key="i"
          :item="mission"
          :children="
            i === project.secondMissons.number
              ? splitText(project.secondMissons.text)
              : []
          "
        />
      </ul>
      <h4 class="mt4 mb3">
        {{ categories[lang].environnement }}
      </h4>
      <base-table
        v-if="project.technologies"
        :categories="categories[lang].categories"
        :content="project.technologies"
      />
    </section>
    <h1 class="fw3 mv4">
      {{ categories[lang].expositions }}
    </h1>
    <base-text-content
      v-for="expo in expos"
      :key="expo.title"
      :title="expo.title"
      :caption="expo.place"
      :content="expo.content"
    />
    <h1 class="fw3 mt5 mb4">
      {{ categories[lang].education }}
    </h1>
    <base-text-content
      v-for="formation in formations"
      :key="formation.title"
      :title="formation.title"
      :caption="formation.place"
      :content="formation.content"
    />
    <span
      class="CV__button f5 no-underline white bg-black-40 bg-animate hover-bg-black hover-white inline-flex items-center pa3 border-box mr1"
      @click="$router.go(-1)"
    >
      <i class="icon ion-md-return-left" />

      <span class="pl1">Return</span>
    </span>
  </div>
</template>

<script>
import BaseCard from '@/components/base/BaseCard.vue';
import BaseTable from '@/components/base/BaseTable.vue';
import BaseListClickable from '@/components/base/BaseListClickable.vue';
import BaseTextContent from '@/components/base/BaseTextContent.vue';
import cvData from '@/assets/JSON/cv_en.json';

export default {
  components: {
    BaseCard,
    BaseTable,
    BaseListClickable,
    BaseTextContent,
  },
  data() {
    return {
      projects: cvData.projects,
      expos: cvData.expos,
      formations: cvData.education,
      categories: {
        fr: {
          h1: 'Expérience Professionnelle',
          responsability: 'Responsabilités occupées :',
          environnement: 'Environnement Technique :',
          expositions: 'Expositions & Concerts',
          education: 'Formations',
          categories: ['Langages', 'Librairies', 'Outils & Plug-ins'],
        },
        en: {
          h1: 'Professional experience',
          responsability: 'Responsibilities:',
          environnement: 'Environment:',
          expositions: 'Exhibitions & Concerts',
          education: 'Education',
          categories: ['Languages', 'Librairies', 'Tools, environment, good practices'],
        },
      },
      lang: 'en',
    };
  },
  methods: {
    splitText(str) {
      return str.split(';');
    },
  },
};

// const traiteText = (str) => {
//   const arr = str.split('.');
//   const dump = [];
//   arr.forEach((a) => {
//     const arr1 = a.split('@');
//     const e = {
//       title: arr1[0],
//       place: arr1[1],
//       content: arr1[2],
//     };
//     dump.push(e);
//   });
//   return dump;
// };

// console.log(JSON.stringify(traiteText(text)));

// const traiteTextEx = `Biennal SIANA, 2019@
// Évry, France@
// En relation avec la RGPD et dans un souci de transparence et de clarté, Datalaxy présente un programme de datavisualisation des données Facebook de l’utilisateur.

// Inventivités digitales, Le Cube, 2019@
// Issy-les-Moulineaux, France@
// Exposition de la majeure Id-DIM, un projet sur la sensibilisation d’utilisation de données personnelles.

// Festival Rouxteur, Mains d’Œuvres, 2018@
// Saint-Ouen, France@
// Une exposition augmentée avec trois réalisations au thème de 'Traverser la mer sans que le ciel ne le sache'.

// Cité de la Musique de Marseille, 2017@
// Marseille, France@
// Tintamarres #7 Tintamarres #8, Composition musique concrète et performance : "Machine 1-10" "CB2" .

// Le Printemps de Bourges, 2016@
// Bourges, France@
// Jouer au Printemps de Bourges Scène Berry, concours 'Printemps des Grandes Écoles'. `;
</script>

<style lang="scss" scoped>
    .CV {

        &__container {
            margin-left: auto;
            margin-right: auto;
            position: relative;
        }

        &__descriptioin {
            margin-top: 24px;
            font-weight: 500;
            line-height: 1.4em;
        }

        &__button {
            margin-top: 32px;
        }

        &__close {
            top: 0;
            right: 0;
            position: absolute;
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

        * {
            font-family: "Helvetica Neue", sans-serif;
        }
    }
</style>
