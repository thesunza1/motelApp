<template>
  <q-page padding class="row justify-center">
    <div class="col-12 col-md-10 row items-center">
      <div class="col-12">
        <q-tabs v-model="tab" class="text-teal">
          <q-route-tab :to="toPath()" icon="all_inbox" label="nhận" />
          <q-route-tab
            :to="$router.currentRoute._rawValue.fullPath"
            name="movies"
            icon="outbox"
            label=" gửi"
          />
        </q-tabs>
      </div>
      <div class="row justify-end col-12">
        <q-btn
          class="col-4 col-md-2"
          color="primary"
          icon="add"
          label=" tạo"
          @click="isCreate = !isCreate"
        />
      </div>
      <div class="row full-width justify-center col-12">
        <div class="col-12"><br /></div>
        <div class="col-12">
          <noti-box
            :notis="notis"
            @openCreate="isCreate = !isCreate"
          ></noti-box>
        </div>
      </div>
      <div class="row col-12">
        <q-dialog v-model="isCreate">
          <noti-create></noti-create>
        </q-dialog>
      </div>
    </div>
  </q-page>
</template>

<script>
import NotiCreate from "components/NotiCreate.vue";
import NotiBox from "components/NotiOut.vue";
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
      const noti = await this.$api.get("getAllOutbox");
      const notiType = await this.$api.get("notiType");
      this.$store.dispatch("NotiType/notiType", notiType.data.notiType);
      this.notis = noti.data.notis;
    } catch (error) {}
  },
  data() {
    return {
      isCreate: false,
      notis: null,
    };
  },
  methods: {
    updateStatus(index) {
      this.notis[index].status = 1;
    },
    log() {
      console.log(this.$router.currentRoute._rawValue);
    },
    toPath() {
      let path = this.$router.currentRoute._rawValue.matched[0].path;
      if (path == "/") {
        return "userNoti";
      } else if (path == "/room") {
        return "roomNoti";
      } else if (path == "/motel") {
        return "noti";
      }
    },
  },
};
</script>

<style lang="sass" scoped>
.hd2
  background-color: $blue-1
</style>
