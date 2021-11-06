<template>
  <div class="full-width">
    <div class="text-primary bg-white text-h4 text-bold q-py-md q-pl-md g-border" v-if="thisMotel== null">
      Danh sách bài mới nhất
    </div>
    <div v-for="(post, index) in posts" :key="index" class="full-width">
      <q-card class="my-card g-border" v-if="post.post_type_id == 1">
        <q-card-section horizontal>
          <q-card-section class="row items-center" style="min-width: 20%">
            <q-img
              :src="urlBase + post.room_type?.first_img_detail[0].img"
              :ratio="1"
              spinner-color="primary"
              spinner-size="82px"
            />
          </q-card-section>

          <q-card-section style="min-width: 80%" class="row">
            <div class="col-12 row items-center">
              <div class="col-12 text-h6 text-blue-10">
                <p class="g-header-up" style="display: inline">
                  {{ post.room_type.name }}
                </p>
                <p
                  v-if="thisMotel == null"
                  class="g-header-up"
                  style="display: inline"
                >
                  -{{ post.room_type.motel.name }}
                </p>
              </div>
              <div class="col-12 row items-center">
                <div class="col-3">
                  <b>Diện tích: </b> {{ post.room_type.area }}m2
                </div>
                <div class="col-3">
                  <b>ngày đăng: </b>{{ toDate(post.updated_at) }}
                </div>
                <div class="" v-if="thisMotel ==null">
                  <b> Người Đăng: </b>
                  <p style="display: inline" class="g-header-up">
                    {{ post.room_type.motel.user.name }}
                  </p>
                </div>
              </div>
            </div>
            <div class="col-12 row items-start content-end">
              <div class="col-8 row items-center">
                <div v-if="thisMotel == null" class="col-12">
                  <q-icon
                    name="room"
                    class="text-black"
                    style="font-size: 30px"
                  />
                  {{ post.room_type.motel.address }}
                </div>
                <div class=" col-12">
                  <q-icon
                    name="list_alt"
                    class="text-black"
                    style="font-size: 30px"
                  />
                  {{ post.room_type.content }}
                </div>
              </div>
              <div class="col-4">
                <q-card-actions class="full-width" vertical align="right">
                  <div class="text-h6 text-orange col-12">
                    {{ toCost(post.room_type.cost) }} Vnd/Tháng
                  </div>
                  <q-btn
                    v-if="post.status == 1"
                    icon="arrow_forward"
                    color="primary"
                    no-caps
                    rounded
                    class="g-header "
                  >
                    <router-link
                      :to="{
                        name: 'searchDetail',
                        params: { post_id: post.id },
                      }"
                      style="text-decoration: none; color: white"
                    >
                      Xem bài
                    </router-link>
                  </q-btn>
                  <q-btn
                    v-else
                    color="black"
                    no-caps
                    rounded
                    label="Hết phòng"
                  />
                </q-card-actions>
              </div>
            </div>
          </q-card-section>
        </q-card-section>
      </q-card>
      <q-card class="my-card g-border" v-else>
        <q-card-section horizontal>
          <q-card-section class="row items-center" style="min-width: 20%">
            <q-img
              :src="urlBase + post.room.room_type?.first_img_detail[0].img"
              :ratio="1"
              spinner-color="primary"
              spinner-size="82px"
            />
          </q-card-section>
          <q-card-section style="min-width: 80%" class="row">
            <div class="col-12 row items-center">
              <div class="col-12 text-h6 text-blue-10">
                <p class="g-header-up" style="display: inline">
                  {{ post.room.room_type.name }}
                </p>
                <p
                  v-if="thisMotel == null"
                  class="g-header-up"
                  style="display: inline"
                >
                 {{post.title  }} -{{ post.room.room_type.motel.name }}
                </p>
              </div>
              <div class="col-12 row items-center">
                <div class="col-3">
                  <b>Diện tích: </b> {{ post.room.room_type.area }}m2
                </div>
                <div class="col-3">
                  <b>ngày đăng: </b>{{ toDate(post.updated_at) }}
                </div>
                <div class="" v-if="thisMotel ==null">
                  <b> Người Đăng: </b>
                  <p style="display: inline" class="g-header-up">
                    {{ post.room.room_type.motel.user.name }}
                  </p>
                </div>
              </div>
            </div>
            <div class="col-12 row items-start content-end">
              <div class="col-8 row items-center">
                <div v-if="thisMotel == null" class="col-12">
                  <q-icon
                    name="room"
                    class="text-black"
                    style="font-size: 30px"
                  />
                  {{ post.room.room_type.motel.address }}
                </div>
                <div class=" col-12">
                  <q-icon
                    name="list_alt"
                    class="text-black"
                    style="font-size: 30px"
                  />
                  {{ post.room.room_type.content }}
                </div>
              </div>
              <div class="col-4">
                <q-card-actions class="full-width" vertical align="right">
                  <div class="text-h6 text-orange col-12">
                    {{ toCost(post.room.room_type.cost) }} Vnd/Tháng
                  </div>
                  <q-btn
                    v-if="post.status == 1"
                    icon="arrow_forward"
                    color="primary"
                    no-caps
                    rounded
                    class="g-header "
                  >
                    <router-link
                      :to="{
                        name: 'searchDetail',
                        params: { post_id: post.id },
                      }"
                      style="text-decoration: none; color: white"
                    >
                      Xem bài
                    </router-link>
                  </q-btn>
                  <q-btn
                    v-else
                    color="black"
                    no-caps
                    rounded
                    label="Hết phòng"
                  />
                </q-card-actions>
              </div>
            </div>
          </q-card-section>
        </q-card-section>
      </q-card>
      <div><br /></div>
    </div>
  </div>
</template>

<script>
import sp from "../boot/support";
export default {
  setup() {
    function toDate(date) {
      return date.slice(0, 10);
    }
    function toCost(cost) {
      return sp.toNum(cost);
    }
    return {
      toDate,
      toCost,
    };
  },
  props: {
    posts: Array,
    thisMotel: Object,
  },
  data() {
    return {
      urlBase: this.$api.defaults.baseURL + "/image/",
    };
  },
};
</script>

<style></style>
