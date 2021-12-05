<template>
  <q-page padding>
      lskdjf
    </q-page>
</template>

<script>
import treApi from '../boot/callApi/tenantRoomEquip';
export default {
  async created() {
    console.log('lskdjf');
    const data = await treApi.getAllTRE(this.motelId);
    console.log(data);
  },
  data(){
    return {
      motelId: this.$route.params.motelId,
    }
  },
}
</script>

<style>

</style>
