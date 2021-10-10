<template>
  <div>
    <div v-for="(imgs, index) in publicImgs" :key="index">
      <div><br></div>
      <div class="col-12 row items-center justify-center bg-dark br">
        <div class="col-12 text-subtitle2 text-white text-center">
          <q-icon
            name="photo_camera"
            class="text-positive"
            style="font-size: 30px"
          />

          <div > {{imgs.content  }} </div>
        </div>
        <div class="col-12"><br /></div>
        <motel-show-imgs
          class="col-12"
          :img_details="imgs.img_details"
        ></motel-show-imgs>
      </div>
    </div>
  </div>
</template>

<script>
import MotelShowImgs from './MotelShowImgs.vue'
export default {
  props: {
    publicImgs: {
      type: Array,
    },
  },
  components: {
    MotelShowImgs
  }
};
</script>

<style>
</style>
