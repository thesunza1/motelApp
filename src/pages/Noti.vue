<template>
  <q-page padding>
    <div class="full-width text-center text-h2 hd2">thông báo</div>
    <div  class="row full-width">

    </div>

  </q-page>
</template>

<script>
export default {
  setup() {
    var notis = 33 ;
    var isSeen = false  ;
    return {
      notis,
      isSeen,
    }
  },
  async created() {
    const noti =await this.$api.get('getAllNoti');
    this.notis = noti.data.notis ;
  },
  data() {
    return {
      isCreate: false ,
    }
  }
};
</script>

<style lang="sass" scoped>
.hd2
  background-color: $blue-1
</style>
