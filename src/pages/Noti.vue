<template>
  <q-page padding class="row justify-center">
    <div
      class="
        col-12 col-md-10
        bg-white
        g-border
        shadow-1
        q-px-lg
        row
        content-start
      "
    >
      <div class="col-12" v-if="user">
        <q-tabs v-model="tab" class="text-teal">
          <q-route-tab
            :to="$router.currentRoute._rawValue.fullPath"
            label="Nhận"
            icon="all_inbox"
            no-caps
          />
          <q-route-tab
            v-if="toPath() == 'motelOutbox'"
            :to="{ name: toPath(), params: { motelId: motelId } }"
            name="movies"
            icon="outbox"
            no-caps
            label="Gửi"
          />
          <q-route-tab
            v-else
            :to="{ name: toPath() }"
            name="movies"
            icon="outbox"
            no-caps
            label="Gửi"
          />
        </q-tabs>
      </div>
      <div class="q-pt-sm col-12">
        <q-card-section class="row items-center justify-end">
          <div class="col-4">
            <noti-search-box @updateNoti="findNoti($event)"></noti-search-box>
          </div>
          <q-space />
          <q-btn
            class="col-4 col-md-2"
            color="primary"
            icon="add"
            rounded
            no-caps
            @click="isCreate = !isCreate"
          >
            <div class="gt-sm">Tạo thông báo</div>
          </q-btn>
        </q-card-section>
      </div>
      <div class="row col-12 justify-center">
        <div class="col-12"><br /></div>
        <div class="col-12 text-h6 text-red-5">
          <q-icon
            name="visibility_off"
            class="text-negative"
            style="font-size: 30px"
          />
          Chưa đọc:
          <p class="text-black" style="display: inline">{{ notiNum }}</p>
          <q-btn
            color="black"
            icon="check"
            class="q-ml-sm"
            no-caps
            :disable="notiNum ==0"
            label="Đã đọc tất cả"
            @click="isRead()"
            rounded
          />
        </div>
        <div class="col-12">
          <noti-box
            :notis="notis"
            :isSeen="0"
            @updateStatus="updateStatus($event)"
            @openCreate="isCreate = !isCreate"
          ></noti-box>
        </div>
        <div class="col-12"><br /></div>
        <div class="col-12 text-h6 text-green">
          <q-icon
            name="visibility"
            class="text-positive"
            style="font-size: 30px"
          />
          Đã đọc:
        </div>
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
          <admin-noti-create v-if="user?.role_id == 3"></admin-noti-create>
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
import { mapGetters } from "vuex";
import NotiSearchBox from "../components/NotiSearchBox.vue";
import notiApi from "../boot/callApi/noti";

export default {
  components: {
    NotiCreate,
    NotiBox,
    AdminNotiCreate,
    NotiSearchBox,
  },
  setup() {
    var isSeen = false;

    return {
      isSeen,
    };
  },
  async created() {
    try {
      this.updateNotiNum();
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
      notiNum: 0,
      motelId: this.$route.params?.motelId,
    };
  },
  computed: {
    ...mapGetters("User", ["user"]),
  },
  methods: {
    async isRead() {
      const res = await notiApi.isReadNoti();

      if (res.statusCode == 1) {
        this.updateNotiNum();
        this.reloadNotis();
      }

      return;
    },
    updateStatus(index) {
      this.notis[index].status = 1;
    },
    log() {
      console.log(this.$router.currentRoute._rawValue);
    },
    toPath() {
      this.log();
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
    async updateNotiNum() {
      var notiNum = await this.$api.get("countNoti");
      if (notiNum.data.statusCode == 1) {
        if (this.notiNum != notiNum.data.num) {
          this.notiNum = notiNum.data.num;
        }
      }
      return;
    },
    async updateNotis() {
      const noti = await this.$api.get("getAllNoti");
      if (this.notis[0].id != noti.data.notis[0].id) {
        this.notis = noti.data.notis;
      }
      return;
    },

    async reloadNotis() {
      const noti = await this.$api.get("getAllNoti");
      this.notis = noti.data.notis;
      return;
    },
    findNoti(data) {
      this.notis = data;
      return;
    },
  },
  mounted: function () {
    window.setInterval(() => {
      this.updateNotis();
      this.updateNotiNum();
    }, 9000);
  },
};
</script>

<style lang="sass" scoped>
.hd2
  background-color: $blue-1
</style>
