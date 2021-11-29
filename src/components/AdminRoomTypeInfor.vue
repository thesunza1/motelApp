<template>
  <div>
    <div v-for="(imgs, index) in roomTypes" :key="index">
      <div><br /></div>
      <div class="col-12 row items-center justify-center shadow-up-1 br g-border">
        <div class="col-12"><br></div>
        <div class="col-12 text-subtitle2">
          <q-icon
            name="photo_camera"
            class="text-positive q-pb-sm q-ml-sm"
            style="font-size: 30px; "
          />
          <div style="display:inline" class="g-icon-h2 g-header-up"> &nbsp;{{ imgs.name }}:</div>
        </div>
        <div class="col-12 row   ">
          <div class="q-pl-lg"> <q-icon name="remove" class="text-positive" /><b>Diện tích phòng: </b>  {{ imgs.area }} M<sup>2</sup> </div>
        </div>
        <div class="col-12 row   ">
          <div class="q-pl-lg"> <q-icon name="remove" class="text-positive"  /><b>Đặt điểm phòng:</b> {{ imgs.content }}  </div>
        </div>
        <div class="col-12"><br /></div>
        <motel-show-imgs
          class="col-12 g-border shadow-1"
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
