<template>
  <div class="full-width g-border shadow-up-3" style="height: 700px">
    <l-map v-model:zoom="zoom" :center="center">
      <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png">
      </l-tile-layer>
      <l-control-layers />
      <l-marker :lat-lng="center"> </l-marker>
    </l-map>

  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    // let zoom = ref(17);
    // return {
    //   zoom
    // }
  },
  data() {
    return {
      zoom: 16,
    };
  },
  props: {
    center: {
      type: Object,
    },
  },
};
</script>

<style>
</style>
