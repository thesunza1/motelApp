<template>
  <q-page class="row full-width justify-center contents-start" padding>
    <div class="col-md-10 col-12">
      <div
        class="full-width"
        v-for="(roomType, index) in roomTypes"
        :key="index"
      >
        <q-card v-if="roomType.post != null" class="my-card">
          <q-card-section class="row items-center justify-around">
            <div>
              id:<b> {{ roomType.post.id }} </b> |
            </div>
            <div>
              loại phòng: <b> {{ roomType.name }} </b>
            </div>
            <div>
              trạng thái
              <b> {{ roomType.post.status == 1 ? "mở" : "đóng" }} </b> |
            </div>
            <div>
              <q-card-actions align="center">
                <q-btn
                  flat
                  icon="refresh"
                  color="warnign"
                  @click="changeStatus(roomType.post.id)"
                />
                <q-btn
                  flat
                  icon="visibility"
                  color="primary"
                  @click="$router.push('/searchDetail/' + roomType.post.id)"
                />
              </q-card-actions>
            </div>
          </q-card-section>
        </q-card>
        <div><br /></div>
        <div v-if="roomTypes">
          <q-card v-if="roomTypes[0].post == null" class="my-card">
            <q-card-section> bạn chưa có bài post nào . </q-card-section>
          </q-card>
        </div>
      </div>
      <q-footer v-if="roomTypes" class="bg-grey-7">
        <q-card-actions align="center">
          <q-btn
            v-if="roomTypes[0].post == null"
            color="white"
            class="font-fooder"
            outline
            label=" Tạo bài đăng cả trọ"
            icon="add"
            @click="createPost()"
          />
        </q-card-actions>
      </q-footer>
    </div>
  </q-page>
</template>

<script>
import post from "../boot/callApi/post";
import noti from "../boot/noti/noti";

export default {
  data() {
    return {
      roomTypes: null,
    };
  },
  async created() {
    const res = await post.getMotel();
    this.roomTypes = res?.roomTypes;
  },
  methods: {
    async changeStatus(postId) {
      const res = await post.changeState(postId);
      noti.NotiStatusCode(res.statusCode);
      this.reloadPage();
    },
    async createPost() {
      const res = await post.createMotel();
      noti.NotiStatusCode(res.statusCode);
      this.reloadPage();
    },
    async reloadPage() {
      const res = await post.getMotel();
      this.roomTypes = res?.roomTypes;
      return;
    },
  },
};
</script>

<style lang="sass" scoped>
.font-fooder
  font-weight: 700
</style>
