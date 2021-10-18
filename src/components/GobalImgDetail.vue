<template>
  <div class=" full-width">
    <q-responsive :ratio="16 / 9">
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
    img_details: {
      type: Array,
    } ,
  },
  data() {
    return {
      base: this.$api.defaults.baseURL + "/image/",
      slide: 0,
    };
  },
}
</script>

<style>

</style>
