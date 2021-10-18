<template>
  <q-page class="row full-width justify-center contents-start bg-white" padding>
    <div class="col-12 text-center text-h6 text-primary ">
      Danh sách bài đăng
    </div>
    <div class="col-md-10 col-12 row items-center content-start">

      <div
        class="col-12 col-md-6 q-px-sm"
        v-for="(roomType, index) in roomTypes"
        :key="index"
      >
        <div v-if="roomType.post != null" class="">
          <!-- <q-card v-if="roomType.post != null" class="my-card">
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
          </q-card> -->
          <motel-post-card :post="roomType" :index="index" @showImgs="showImgs1($event)" @changeSt="changeStatus($event)" @seem="$router.push('/searchDetail/' + $event)"></motel-post-card>
        </div>
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
    <q-dialog v-model="isImg">
      <gobal-img-detail v-if="thisImg" :img_details="thisImg"></gobal-img-detail>
    </q-dialog>
  </q-page>
</template>

<script>
import post from "../boot/callApi/post";
import noti from "../boot/noti/noti";
import MotelPostCard from "../components/MotelPostCard.vue";
import GobalImgDetail from "../components/GobalImgDetail.vue"

export default {
  data() {
    return {
      roomTypes: null,
      thisImg : null,
      isImg: false ,
    };
  },
  async created() {
    const res = await post.getMotel();
    this.roomTypes = res?.roomTypes;
  },
  components: {
    MotelPostCard,
    GobalImgDetail,
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
    showImgs1(index) {
      this.thisImg = this.roomTypes[index].img_details ;
      this.isImg = true ;
      console.log(this.thisImg);
    }
  },
};
</script>

<style lang="sass" scoped>
.font-fooder
  font-weight: 700
</style>
