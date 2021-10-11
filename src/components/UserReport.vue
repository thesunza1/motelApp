<template>
  <div>
    <q-card class="my-card">
      <q-card-section class="text-white text-h6 bg-negative text-center">
        báo cáo admin
      </q-card-section>
      <q-card-section >
        <div>nhập nội dung bạn muốn báo cáo</div>
        <q-input v-model="content" type="text" label=" nội dung " />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="gửi" color="red" @click="sendReport()" />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import noti from "../boot/callApi/noti";
import { mapGetters } from "vuex";
import { useQuasar } from "quasar";
export default {
  setup() {
    const $q = useQuasar();
    function showNoti(mess, col) {
      $q.notify({
        message: mess,
        color: col,
        position: "top",
        timeout: 3000,
      });
    }

    return {
      showNoti,
    };
  },
  props: {
    type: {
      type: Number,
    },
    //type 1 ,2 ,3  : postid - motelid - roomTypeid ;
    postId: {
      type: Number,
    },
    motelId: {
      type: Number,
    },
    roomTypeId: {
      type: Number,
    },

  },
  data() {
    return {
      content: null,
    };
  },
  methods: {
    async sendReport() {
      if (this.user?.id) {
        const res = await noti.sendReport(
          this.type,
          this.postId,
          this.motelId,
          this.roomTypeId,
          this.user.id ,
          this.content,
        );
        if (res.statusCode == 1) {
          this.showNoti("thành công:", "positive");
        }
      } else {
        this.showNoti(" bạn cần phải đăng nhập", "negative");
      }
    },
  },
  computed: {
    ...mapGetters("User", ["user"]),
  },
};
</script>

<style>
</style>
