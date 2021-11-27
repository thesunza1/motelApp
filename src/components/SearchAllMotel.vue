<template>
  <div>
    <div
      class="text-primary bg-white text-h4 text-bold q-py-md q-pl-md g-border"
    >
      <q-icon name="list" />
      Danh sách trọ
    </div>
    <div v-if="motels">
      <q-expansion-item
        group="haha"
        class="bg-white q-mb-lg g-border shadow-1"
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
                <div class="col-12 q-pb-md text-h6">
                  <q-icon name="apartment" class="g-icon-h1 text-primary" />
                  <b class="text-primary"> Tên trọ: </b>
                  <p style="display: inline" class="text-primary g-header-up">
                    {{ motel.name }}
                  </p>
                </div>
                <div class="col-12">
                  <q-icon name="room" class="g-icon-h1 text-primary" />
                  <b> Địa chỉ: </b>
                  <p style="display: inline">{{ motel.address }}</p>
                </div>
                <div class="col-12"><br /></div>
                <div class="col-5">
                  <q-icon name="person" class="g-icon-h1 " />
                  <b> Chủ trọ: </b>
                  <p style="display: inline" class="g-header-up">
                    {{ motel.user.name }}
                  </p>
                </div>
                <div class="col-4">
                  <q-icon name="email" class="g-icon-h1" />
                  <b> Email: </b>
                  <p style="display: inline">{{ motel.user.email }}</p>
                </div>
                <div class="col-3">
                  <q-icon name="phone" class="g-icon-h1" />
                  <b> Điện thoại: </b>
                  <p style="display: inline">{{ motel.phone_number }}</p>
                </div>
                <div class="col-12"><br /></div>
                <div class="col-12 row items-center">
                  <div class="col-5">
                    <q-icon name="bolt" class="g-icon-h1 " />
                    <b> Giá điện :</b> {{ toPrice(motel.elec_cost) }} VNĐ
                  </div>
                  <div class="col-4">
                    <q-icon name="water_drop" class=" g-icon-h1" />
                    <b>Giá nước :</b> {{ toPrice(motel.water_cost) }} VNĐ
                  </div>
                  <div class="col-3">
                    <q-icon name="paid" class="g-icon-h1 " />
                    <b>&nbsp;Đặt cọc :</b> {{ toPrice(motel.deposit) }} VNĐ
                  </div>
                </div>
              </q-card-section>
            </q-card-section>
          </div>
        </template>
        <div
          style="float: right; width: 90%"
          class="text-h6 text-white bg-primary g-border g-text-indent q-py-sm"
        >
          Danh sách loại phòng
        </div>
        <div style="float: right; width: 90%" v-if="posts">
          <search-render-post
            :thisMotel="'co tro'"
            :posts="posts.data"
          ></search-render-post>
        </div>
        <div
          style="float: right; width: 90%"
          class="text-h6 text-white bg-primary g-text-indent q-py-sm"
        >
          <br />
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
