<template>
  <div
    v-if="articleObject"
    class="Article"
  >
    <article>
      <div class="container__main">
        <template v-for="(block,index) in articleObject.blocks">
          <div
            v-if="block.type === 'header'"
            :key="index"
            class="article__header"
          >
            <h1 v-if="block.data.level === 1">
              {{ block.data.text }}
            </h1>
            <h2 v-else-if="block.data.level === 2">
              {{ block.data.text }}
            </h2>
            <h3 v-else-if="block.data.level === 3">
              {{ block.data.text }}
            </h3>
          </div>
          <div
            v-if="block.type === 'paragraph'"
            :key="index"
            class="article__paragraph"
            v-html="block.data.text"
          />
          <ul
            v-if="block.type === 'list'"
            :key="index"
            class="article__list"
          >
            <li
              v-for="item in block.data.items"
              :key="item"
            >
              {{ item }}
            </li>
            =
          </ul>
          <div
            v-if="block.type === 'image'"
            :key="index"
          >
            <image-component :src="block.data.file.url" />
          </div>
        </template>
        <div class="Article__publication">
          <span class="Article__publishDate">published le {{ dateFormated }}</span>
        </div>
      </div>
    </article>
  </div>
</template>
<script>
import useData from '@/js/use/data';
import date from '@/js/utlis/date';
import ImageComponent from '@/components/ImageContainer.vue';

import {
  ref, computed,
} from '@vue/composition-api';

export default {

  name: 'Article',
  components: { ImageComponent },
  props: {
    id: {
      type: String,
      default: 'article',
    },
  },
  setup(props) {
    const articleObject = ref(null);
    const { getData } = useData();
    console.log(props);
    getData(`/data/${props.id}.json`, { required: true }).then((res) => { articleObject.value = res; });
    const dateFormated = computed(() => {
      if (articleObject.value && articleObject.value.time) {
        const iso = new Date(articleObject.value.time).toISOString();
        return date(articleObject.value.time, 'd MMMM yyyy HH:mm');
      }
    });
    return { articleObject, dateFormated };
  },
};
</script>>
<style lang="scss" scoped>
    .Article {
        font-size: 16px;
        max-width: 100%;
        padding: $span-vr;

        .container__main {
            max-width: $bp-max;
            margin: $span-vr*4 auto;
            background-color: rgba(255,255,255,0.8);
            padding: $span-vr;
        }

        .article {
            margin: $span-vr $span-hr;

            &__header {
                h1 {
                    font-size: 36px;
                }

                h2 {
                    font-size: 32px;
                }

                h3 {
                    font-size: 24px;
                }
            }

            &__paragraph {
                font-family: Helvetica, Arial, sans-serif;
                font-display: swap;
                margin: $span-hr-small 0;
            }
        }
    }
</style>
