<template>
  <q-page padding class="row justify-center">
    <div class="col-12 col-md-10 row content-start">
      <div class="col-12" >
        <q-tabs v-model="tab" class="text-teal">
          <q-route-tab
            :to="$router.currentRoute._rawValue.fullPath"
            label="nhận"
            icon="all_inbox"
          />
          <q-route-tab
            :to="toPath()"
            name="movies"
            icon="outbox"
            label=" gửi"
          />
        </q-tabs>
      </div>
      <div class="row justify-end col-12" >
        <q-btn
          class="col-4 col-md-2"
          color="primary"
          icon="add"
          label=" tạo"
          @click="isCreate = !isCreate"
        />
      </div>
      <div class="row col-12 justify-center">
        <div class="col-12"><br /></div>
        <div class="col-12 text-h6 text-red-5"> <q-icon name="visibility_off" class="text-negative" style="font-size:30px" />chưa đọc:</div>
        <div class="col-12">
          <noti-box
            :notis="notis"
            :isSeen="0"
            @updateStatus="updateStatus($event)"
            @openCreate="isCreate = !isCreate"
          ></noti-box>
        </div>
        <div class="col-12"><br /></div>
        <div class="col-12 text-h6 text-green"> <q-icon name="visibility" class="text-positive" style="font-size:30px" /> đã đọc:</div>
        <div class="col-12">
          <noti-box
            :notis="notis"
            @openCreate="isCreate = !isCreate"
            :isSeen="1"
          ></noti-box>
        </div>
      </div>
      <div class="row col-12">
        <q-dialog v-model="isCreate">
          <admin-noti-create v-if=" user?.role_id == 3"></admin-noti-create>
          <noti-create v-else></noti-create>
        </q-dialog>
      </div>
    </div>
  </q-page>
</template>

<script>
import NotiCreate from "components/NotiCreate.vue";
import AdminNotiCreate from "components/AdminNotiCreate.vue";
import NotiBox from "components/NotiBox.vue";
import {mapGetters} from 'vuex'
export default {
  components: {
    NotiCreate,
    NotiBox,
    AdminNotiCreate,
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
    } catch (error) {}
  },
  data() {
    return {
      isCreate: false,
      notis: null,
    };
  },
  computed: {
    ...mapGetters('User',['user']),
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
        return "userOutbox";
      } else if (path == "/room") {
        return "roomOutbox";
      } else if (path == "/motel") {
        return "motelOutbox";
      } else {
        return "adminOutBox";
      }
    },
    async updateNotis() {
      const noti = await this.$api.get("getAllNoti");
      if(this.notis[0].id != noti.data.notis[0].id){
        this.notis = noti.data.notis ;
      }
      return ;
    }
  },
  mounted: function () {
    window.setInterval(() => {
      this.updateNotis() ;
    } , 5000);
  }
};
</script>

<style lang="sass" scoped>
.hd2
  background-color: $blue-1
</style>
