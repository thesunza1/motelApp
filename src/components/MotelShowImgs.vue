<template>
  <div class="full-width" style="max-height: 400px">
    <q-carousel
      v-if="img_details"
      swipeable
      animated
      v-model="slide"
      thumbnails
      infinite
    >
      <q-carousel-slide
        v-for="(img, index) in img_details"
        :key="index"
        :name="index"
        :img-src="base + img"
      />
    </q-carousel>
  </div>
</template>

<script>
export default {
  props: {
    img_details: {
      type: Object,
    },
  },
  data() {
    return {
      base: this.$api.defaults.baseURL+'/image/',
      slide: 0,
    };
  },
};
</script>

<style>
</style>
