<template>
  <div class="row items-center justify-around">
    <div class="col-5" v-for="(imgs, index) in publicImgs" :key="index">
      <div><br></div>
      <div class="col-12 row items-center justify-center g-border shadow-up-1 br">
        <div class="col-12 text-subtitle2 q-pt-sm ">
          <q-icon
            name="photo_camera"
            class="text-positive q-ml-sm "
            style="font-size: 30px; display:inline"
          />

          <div style="display:inline" > &nbsp; {{imgs.content  }} </div>
        </div>
        <div class="col-12"><br /></div>
        <motel-show-imgs
          class="col-12 g-border"
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
