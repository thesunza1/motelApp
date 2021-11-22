<template>
  <div class="full-width">
    <q-file
      label=" chọn ảnh"
      v-model="image"
      @change="fileChange"
      max-files="3"
      label-color="primary"
      use-chips
      multiple
      outlined
      counter
    />
    <div class="row justify-center" v-if="image">
      <div class="col-4" v-for="img in review" :key="img">
        <img :src="img" style="width: 100%; height: 300px; object-fit: cover" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      review: {},
    };
  },
  props: {
    imgs: {
      type: Object,
    },
  },
  computed: {
    image: {
      get() {
        return this.imgs;
      },
      set(value) {
        return this.$emit("update:imgs", value);
      },
    },
  },
  methods: {
    fileChange(e) {
      let numImage = 0;
      if (this.image) {
        numImage = this.image?.length;
      }
      this.review = [];

      for (let i = 0; i < numImage; i++) {
        const file = this.image[i];
        this.review.splice(i, 1);
        this.review.push(URL.createObjectURL(file));
      }
    },
  },
};
</script>

<style>
</style>
