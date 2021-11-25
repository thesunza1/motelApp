<template>
  <q-page padding>
    <q-drawer
      side="left"
      v-model="isOp"
      bordered
      :width="600"
      content-class="bg-grey-3 gt-sm"
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
        <l-circle
          v-show="radius"
          :lat-lng="map.center"
          :radius="radius"
          :color="'red'"
          :fillColor="'blue'"
          :fill="true"
          :fillOpacity="0.1"

        >
          <q-icon name="print" />
        </l-circle>
        <l-control position="bottomleft">
          <q-card-actions align="center">
            <q-btn
              color="black"
              rounded
              no-caps
              icon="room"
              label=" Vị trí"
              @click="getLocation()"
            />
            <q-btn
              color="black"
              no-caps
              rounded
              icon="refresh"
              label="Vị trí cũ"
              @click="refreshCenter()"
            />
          </q-card-actions>
        </l-control>
        <l-marker
          v-for="(motel, index) in motels"
          :key="index"
          :lat-lng="[motel.latitude, motel.longitude]"
          @click="getPostMotels(motel.id, motel)"
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
          <l-tooltip>
            <div class="text-subtitle2">
              <q-icon name="apartment" /> {{ motel.name }}
            </div>
          </l-tooltip>
        </l-marker>
      </l-map>
    </q-drawer>
    <div class="row justify-center">
      <div class="col-12 col-md-12">
        <search-box @update="updatePost($event)"></search-box>
      </div>
      <div class="col-12"><br /></div>
      <div class="col-12">
        <q-card-actions align="right">
          <q-btn
            rounded
            icon="refresh"
            no-caps
            color="black"
            label="Tải lại bài đăng"
            @click="reloadPage()"
          />
        </q-card-actions>
      </div>
      <div class="col-12" v-if="thisMotel">
        <search-show-motel-box :motel="thisMotel"></search-show-motel-box>
      </div>
      <div v-if="isIndex && thisMotel == null" class="col-12">
        <q-card class="my-card g-border q-mb-sm">
          <q-card-section>
            <div class="text-h6">Chọn tỉnh Hoặc thành phố muốn tìm</div>
          </q-card-section>
          <q-card-section class="row items-center">
            <div class="q-pr-md col-3">
              <q-select
                v-model="tinhChon"
                :options="fillConts"
                label="Tỉnh, Thành phố"
                label-color="primary"
                filled
              />
            </div>
            <div class="q-pr-md col-3">
              <q-select
                v-if="quanOt"
                label-color="primary"
                v-model="quanChon"
                :options="quanOt"
                label=" Quận, Huyện"
                filled
              />
            </div>
            <div class="q-pr-md col-2">
              <q-select
                v-if="phuongOt"
                label-color="primary"
                v-model="phuongChon"
                :options="phuongOt"
                label=" Phường, Xã"
                filled
              />
            </div>
            <div class="q-pr-md col-2">
              <q-select
                v-if="phuongOt"
                v-model="banKinh"
                :options="banKinhOt"
                label=" Bán kính"
                label-color="primary"
                filled
              />
            </div>
            <div v-if="phuongChon" class="col-2 row justify-end">
              <q-btn
                color="black"
                rounded
                icon="search"
                label="Tìm trọ"
                no-caps
                @click="findTinh()"
              />
            </div>
          </q-card-section>
          <q-card-section >
            <div v-if="motels" class="text-right text-subtitle2 text-positive">
              Tổng số trọ: {{toLength(motels)}}
            </div>
          </q-card-section>
        </q-card>
        <search-all-motel
          :posts="motelPosts"
          :motels="motels"
        ></search-all-motel>
      </div>
      <div class="col-12"><br /></div>
      <div v-if="isSearch || thisMotel" class="col-12 col-md-12">
        <search-render-post
          :thisMotel="thisMotel"
          :posts="posts.data"
        ></search-render-post>
      </div>

      <q-footer v-show="isSearch" class="bg-white">
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
import SearchShowMotelBox from "../components/SearchShowMotelBox.vue";
import SearchAllMotel from "../components/SearchAllMotel.vue";
import { ref } from "vue";
import noti from "../boot/noti/noti";
import sp from "../boot/support";
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
        demoCenter: [10.010999053186, 105.76151916074],
      },
      motels: null,
      motelPosts: null,
      thisMotel: null,
      isSearch: false,
      isIndex: true,
      fillConts: [
        {
          label: "Cần Thơ",
          value: "Cần Thơ",
          quan: [
            {
              label: "Ninh Kiều",
              value: "Ninh Kiều",
              phuong: [
                {
                  label: "Hưng lợi",
                  value: " Hưng lợi",
                  lat: "10.012903",
                  long: "105.762307",
                },
                {
                  label: "An nghiệp",
                  value: "An nghiệp",
                  lat: "10.036812",
                  long: "105.77406",
                },
                {
                  label: "An cư",
                  value: "An cư",
                  lat: "10.039301",
                  long: "105.777734",
                },
                {
                  label: "An Phú",
                  value: "An Phú",
                  lat: "10.034194 ",
                  long: "105.774618",
                },

              ],
            },
            {
              label: " Bình Thủy",
              value: "Bình Thủy",
              phuong: [
                {
                  label: " Long Tuyền",
                  value: " Long Tuyền",
                  lat: "10.028956",
                  long: "105.725850",
                },
                {
                  label: " An Thới",
                  value: "An Thới",
                  lat: "10.057996",
                  long: "105.759641",
                },
              ],
            },
          ],
        },
        {
          label: "Vĩnh Long",
          value: "Vĩnh Long",
        },
      ],
      tinhChon: null,
      quanChon: null,
      quanOt: null,
      phuongChon: null,
      phuongOt: null,
      isTinhSearch: false,
      banKinhOt: [
        {
          label: "1 km",
          value: 1,
          leaf: 1000,
        },
        {
          label: "2 km",
          value: 2,
          leaf: 2000,
        },
        {
          label: "3 km",
          value: 3,
          leaf: 3000,
        },
        {
          label: "4 km",
          value: 4,
          leaf: 4000,
        },
      ],
      banKinh: {
        label: "1 km",
        value: 1,
        leaf: 1000,
      },
      radius: null,
    };
  },
  watch: {
    current_page(newVal, OldVal) {
      this.loadpage(newVal);
    },
    tinhChon(newVal, OldVal) {
      this.quanOt = newVal.quan;
      this.quanChon = newVal.quan[0];
    },
    quanChon(newVal, OldVal) {
      this.phuongOt = newVal.phuong;
      this.phuongChon = newVal.phuong[0];
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
    toLength(arr) {
      return sp.length(arr);
    },
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
      }
    },
    refreshCenter() {
      this.map.center = this.map.demoCenter;
      this.radius = null;
    },
    showPosition(position) {
      this.map.center = [position.coords.latitude, position.coords.longitude];
      console.log(this.map.center);
      console.table(position.coords);
    },
    async reloadPage() {
      const getPost = await this.$api.get("getPost");
      const getMotels = await this.$api.get("getMapMotels");
      if (getPost.data?.statusCode == 1) {
        this.posts = getPost.data?.posts;
        this.post_types = getPost.data?.post_type;
        this.max_page = getPost.data.posts.last_page;
      }
      this.motels = getMotels.data.motels;
      this.thisMotel = null;
      this.isSearch = false;
      this.isIndex = true;
      this.radius = null;
      noti.showNoti('Tải lại thành công' , 'black');
    },
    async loadpage(num_page) {
      const res = await this.$api.get("getPost?page=" + num_page);
      if (res.data?.statusCode == 1) {
        this.posts = res.data?.posts;
      }
      return 1;
    },
    updatePost(data) {
      this.thisMotel = null;
      this.isSearch = true;
      this.isIndex = false;
      this.upPost(data);
    },
    upPost(data) {
      this.posts = data;
      this.max_page = data.last_page;
      this.num_page = 1;
    },
    async getPostMotels(motelId, motel) {
      const res = await this.$api.post("getPostMotels", {
        motelId: motelId,
      });
      if (res.data.statusCode == 1) {
        this.posts = res.data?.posts;
      }
      this.thisMotel = motel;
    },
    async findTinh() {
      let lat = this.phuongChon.lat;
      let long = this.phuongChon.long;
      let distance = this.banKinh.value;
      let leaf = this.banKinh.leaf;
      //tinh lat b - e ;
      let latDistance = distance / 110.574;

      console.log(latDistance);
      // console.log(longDistance);
      let latBegin = lat - latDistance;
      let latEnd = parseFloat(lat) + parseFloat(latDistance);
      let longBegin = parseFloat(long) - parseFloat(latDistance);
      let longEnd = parseFloat(long) + parseFloat(latDistance);
      //ban do : lat long , leaf ,
      //search: latBegin, latEnd , longBegin , longEnd ,
      const motelTinh = await this.$api.post("findTinh", {
        latBegin: latBegin,
        latEnd: latEnd,
        longBegin: longBegin,
        longEnd: longEnd,
      });

      this.motels = motelTinh.data.motels;
      noti.showNoti("Tìm thành công", "black");
      this.radius = leaf;
      this.map.center = [lat, long];
    },
  },
  components: {
    SearchRenderPost,
    SearchBox,
    SearchShowMotelBox,
    SearchAllMotel,
  },
};
</script>

<style></style>
