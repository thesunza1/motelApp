<template>
  <div>
    <div v-for="(imgs, index) in roomTypes" :key="index">
      <div><br /></div>
      <div class="col-12 row items-center justify-center bg-dark br">
        <div class="col-12 text-subtitle2 text-white text-center">
          <q-icon
            name="photo_camera"
            class="text-positive"
            style="font-size: 30px"
          />
          <div>{{ imgs.name }}</div>
        </div>
        <div class="col-12 row items-center justify-center text-white ">
          <div> <q-icon name="infor" style="font-size:25px" />  {{ imgs.area }} m2 </div>
        </div>
        <div class="col-12 row items-center justify-center text-white ">
          <div> <q-icon name="infor" style="font-size:25px" />  {{ imgs.content }} m2 </div>
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
    roomTypes: {
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
