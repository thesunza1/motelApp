<template>
  <q-page padding>
    <div class="full-width text-center text-h2 hd2">thông báo</div>
    <div class="row justify-end">
      <q-btn
        class="col-4 col-md-2"
        color="primary"
        icon="add"
        label=" tạo"
        @click="isCreate = !isCreate"
      />
    </div>
    <div class="row full-width justify-center">
      <div class="col-12"><br /></div>
      <div class="col-12 text-h6 text-red-5">chưa đọc:</div>
      <div class="col-12">
        <noti-box :notis="notis" :isSeen="0" @updateStatus="updateStatus($event)" @openCreate="isCreate=!isCreate"></noti-box>
      </div>
      <div class="col-12"><br /></div>
      <div class="col-12 text-h6 text-green">đã đọc:</div>
      <div class="col-12">
        <noti-box :notis="notis" @openCreate="isCreate=!isCreate" :isSeen="1"></noti-box>
      </div>
    </div>
    <div class="row full-width">
      <q-dialog v-model="isCreate">
        <noti-create></noti-create>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import NotiCreate from "components/NotiCreate.vue";
import NotiBox from "components/NotiBox.vue";
// import { api } from "boot/axios";
export default {
  components: {
    NotiCreate,
    NotiBox,
  },
  setup() {
    var isSeen = false;
    return {
      isSeen,
    };
  },
  async created() {
    try {
      const noti = await this.$api.get("getAllNoti");
      const notiType = await this.$api.get("notiType");
      this.$store.dispatch("NotiType/notiType", notiType.data.notiType);
      this.notis = noti.data.notis;
    } catch (error) {
    }
  },
  data() {
    return {
      isCreate: false,
      notis:null,
    };
  },
  methods: {
    updateStatus(index){
      this.notis[index].status = 1;
    }
  },
};
</script>

<style lang="sass" scoped>
.hd2
  background-color: $blue-1
</style>
