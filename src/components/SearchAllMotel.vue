<template>
  <div>
    <!-- <div class="text-h6 text-primary">Danh sách trọ:</div> -->
    <div v-if="motels">
      <q-expansion-item
        group="haha"
        class="bg-white q-my-lg g-border shadow-1"
        v-for="(motel, index) in motels"
        @click="loadMotelPosts(motel.id)"
        :key="index"
      >
        <template v-slot:header>
          <div class="full-width">
            <q-card-section horizontal>
              <q-card-section class="row items-center" style="min-width: 15%">
                <q-img
                  :src="urlBase + motel.motel_imgs[0].img_details[0].img"
                  :ratio="1"
                  spinner-color="primary"
                  spinner-size="82px"
                />
              </q-card-section>
              <q-card-section
                class="row items-center justify-start"
                style="font-size: 14px"
              >
                <div class="col-5">
                  <b>Tên trọ: </b>
                  <p style="display: inline" class="g-header-up">
                    {{ motel.name }}
                  </p>
                </div>
                <div class="col-7">
                  <b>Địa chỉ: </b>
                  <p style="display: inline">{{ motel.address }}</p>
                </div>
                <div class="col-12"><br /></div>
                <div class="col-5">
                  <b>Chủ trọ: </b>
                  <p style="display: inline" class="g-header-up">
                    {{ motel.user.name }}
                  </p>
                </div>
                <div class="col-4">
                  <b>Email: </b>
                  <p style="display: inline">{{ motel.user.email }}</p>
                </div>
                <div class="col-3">
                  <b>Điện thoại: </b>
                  <p style="display: inline">{{ motel.phone_number }}</p>
                </div>
                <div class="col-12"><br /></div>
                <div class="col-12 row items-center">
                  <div class="col-5">
                    <b>Giá điện :</b> {{ toPrice(motel.elec_cost) }} Vnd
                  </div>
                  <div class="col-4">
                    <b>Giá nước :</b> {{ toPrice(motel.water_cost) }} Vnd
                  </div>
                  <div class="col-3">
                    <b>Đặt cọc :</b> {{ toPrice(motel.deposit) }} Vnd
                  </div>
                </div>
              </q-card-section>
            </q-card-section>
          </div>
        </template>
        <div class="text-primary text-h6 g-text-indent">
          Danh sách loại phòng
        </div>
        <div v-if="posts">
          <search-render-post
            :thisMotel="'co tro'"
            :posts="posts.data"
          ></search-render-post>
        </div>
      </q-expansion-item>
    </div>
  </div>
</template>

<script>
import sp from "../boot/support";
import SearchRenderPost from "../components/SearchRenderPost.vue";
export default {
  props: {
    motels: Array,
  },
  components: {
    SearchRenderPost,
  },
  data() {
    return {
      urlBase: this.$api.defaults.baseURL + "/image/",
      posts: null,
      thisId: -1,
    };
  },
  methods: {
    toPrice(val) {
      return sp.toNum(val);
    },
    async loadMotelPosts(motelId) {
      if (this.thisId != motelId) {
        this.thisId = motelId;
        const res = await this.$api.post("getPostMotels", {
          motelId: motelId,
        });
        if (res.data.statusCode == 1) {
          this.posts = res.data?.posts;
        }
      }
    },
  },
};
</script>

<style></style>
