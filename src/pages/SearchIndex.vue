<template>
  <q-page padding>
    <q-drawer
      side="left"
      v-model="isOp"
      bordered
      :width="500"
      content-class="bg-grey-3"
    >
      <l-map
        v-if="motels"
        style="height: 100%"
        v-model:zoom="map.zoom"
        :center="map.center"
      >
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        ></l-tile-layer>
        <l-marker
          v-for="(motel, index) in motels"
          :key="index"
          :lat-lng="[motel.latitude, motel.longitude]"
          @click="getPostMotels(motel.id)"
        >
          <l-popup>
            <q-card-section>
              <div class="text-h6">
                <q-icon name="apartment" /> {{ motel.name }}
              </div>
              <div class="text-h6">
                <q-icon name="room" /> {{ motel.address }}
              </div>
              <div class="text-h6">
                <q-icon name="phone" /> {{ motel.phone_number }}
              </div>
            </q-card-section>
          </l-popup>
        </l-marker>
      </l-map>
    </q-drawer>
    <div class="row justify-center">
      <div class="col-12 col-md-12">
        <search-box @update="updatePost($event)"></search-box>
      </div>
      <div class="col-12"><br /></div>
      <div v-if="posts" class="col-12 col-md-12">
        <search-render-post :posts="posts.data"></search-render-post>
      </div>

      <q-footer class="bg-white">
        <div class="col-12 flex q-py-sm flex-center">
          <q-pagination
            v-model="current_page"
            :max="max_page"
            :max_pages="8"
            color="accent"
            direction-links
            bounadary-links
          />
        </div>
      </q-footer>
    </div>
  </q-page>
</template>

<script>
import SearchRenderPost from "../components/SearchRenderPost.vue";
import SearchBox from "../components/SearchBox.vue";
import { ref } from "vue";
export default {
  setup() {
    const num_page = ref(1);
    return {
      num_page,
    };
  },
  data() {
    return {
      posts: null,
      post_types: null,
      max_page: 1,
      current_page: 1,
      isOp: true,
      map: {
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        zoom: 14,
        center: [10.010999053186, 105.76151916074],
        caller: null,
      },
      motels: null,
    };
  },
  watch: {
    current_page(newVal, OldVal) {
      this.loadpage(newVal);
    },
  },
  async created() {
    const getPost = await this.$api.get("getPost");
    const getMotels = await this.$api.get("getMapMotels");
    if (getPost.data?.statusCode == 1) {
      this.posts = getPost.data?.posts;
      this.post_types = getPost.data?.post_type;
      this.max_page = getPost.data.posts.last_page;
    }
    this.motels = getMotels.data.motels;
  },
  methods: {
    async loadpage(num_page) {
      const res = await this.$api.get("getPost?page=" + num_page);
      if (res.data?.statusCode == 1) {
        this.posts = res.data?.posts;
      }
      return 1;
    },
    updatePost(data) {
      this.posts = data;
      this.max_page = data.last_page;
      this.num_page = 1;
    },
    async getPostMotels(motelId) {
      const res = await this.$api.post("getPostMotels", {
        motelId: motelId,
      });
      if (res.data.statusCode == 1) {
        this.posts = res.data?.posts;
      }
    },
  },
  components: {
    SearchRenderPost,
    SearchBox,
  },
};
</script>

<style></style>
