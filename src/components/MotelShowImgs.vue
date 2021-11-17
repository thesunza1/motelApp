<template>
  <!-- <div class="full-width" style="max-height: 400px"> -->
  <div class="" style="max-width:100%">
    <!-- <q-responsive :ratio="16 / 9"> -->
    <q-responsive :ratio="23 / 9">
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
    </q-responsive>
  </div>
</template>

<script>
export default {
  props: {
    img_details: [Object, Array] ,
  },
  data() {
    return {
      base: this.$api.defaults.baseURL + "/image/",
      slide: 0,
    };
  },
};
</script>

<style>
</style>
