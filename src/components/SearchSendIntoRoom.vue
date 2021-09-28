<template>
  <q-card class="my-card" style="min-width:70%">
    <q-form @submit="send()" class="q-gutter-md">
      <q-card-section class="text-center text-h6 text-white bg-primary">
        bạn có muốn vào ?
      </q-card-section>
      <q-card-section v-if="postTypeId == 1" class="row items-center">
        <div class="col-12 text-center text-red">
          *chọn phòng để xin vào (có thể nhiều phòng)
        </div>
        <div class="col-12"><br /></div>
        <div class="col-12 row items-center justify-center">
          <div
            v-for="(room, index) in rooms"
            :key="index"
            class="col-2 col-md-1 text-center"
          >
            <q-checkbox
              size="3rem"
              color="teal"
              v-model="Lrooms"
              :label="' ' + room.name"
              :val="room.id"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-section v-else class="row items-center">
        <div class="col-12">bạn muốn gửi thông báo cho người đăng</div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label=" gửi" type="submit" color="primary" />
        <q-btn color="red" label=" đóng" @click="$emit('closePU')" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import { useQuasar } from "quasar";
import { mapGetters } from "vuex";
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
    postId: {
      type: Number,
    },
    postTypeId: {
      type: Number,
    },
    rooms: {
      type: Array,
    },
  },
  data() {
    return {
      Lrooms: [],
    };
  },
  computed: {
    ...mapGetters("User", ["user"]),
  },
  methods: {
    async send() {
      if (!this.user) {
        this.showNoti(" bạn chưa đăng nhập ", "negative");
        return;
      }
      if (this.postTypeId == 1) {
        const sendRes = await this.$api.post("sendIntoNoti", {
          postId: this.postId,
          ListRooms: this.Lrooms,
        });
        if (sendRes.data.statusCode == 1) {
          this.showNoti(" thành công chờ liên lạc", "positive");
        } else {
          this.showNoti(" lỗi: không xác định", "negative");
        }
      } else {
        const sendRes = await this.$api.post("sendIntoNotiRoom",{
          postId : this.postId,
        });
        if (sendRes.data.statusCode == 1) {
          this.showNoti(" thành công chờ liên lạc", "positive");
        } else {
          this.showNoti(" lỗi: không xác định", "negative");
        }
      }
    },
  },
};
</script>

<style>
</style>
