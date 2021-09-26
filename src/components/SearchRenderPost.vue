<template>
  <div class="full-width">
    <div v-for="(post, index) in posts" :key="index" class="full-width">
      <q-card class="my-card" v-if="post.post_type_id == 1">
         <q-card-section horizontal>
          <q-card-section
            class="row items-center"
            style="
              min-width: 120px;
              min-height: 120px;
              max-height: 180px;
              max-width: 180px;
              height: 20%;
              width: 20%;
            "
          >
            <q-img
              :src="urlBase + post.room_type?.first_img_detail[0].img"
              :ratio="1"
              spinner-color="primary"
              spinner-size="82px"
            />
          </q-card-section>

          <q-card-section style="max-width:80%" class="row">
            <div class="col-12 text-blue text-subtitle2">
              {{ post.room_type.name }} - {{ post.title }} -
              {{ post.room_type.motel.name }}
            </div>
            <div class="col-12 row items-center">
              <div class="text-green text-subtitle2 col-6 col-md-2">
                {{ toCost(post.room_type.cost) }}nvnd/th
              </div>
              <div class="gt-sm col-md-1 text-center">
                {{ post.room_type.area }}m2
              </div>
              <div class="col-6 col-md-3 text-right">
                {{ toDate(post.updated_at) }}
              </div>
              <div class="col-12 lt-md"><br></div>
              <div class="col-12 col-md-6 text-center">
                {{ post.room_type.motel.address }}
              </div>
            </div>
            <div class="gt-sm col-12">
              {{ post.room_type.content }}
            </div>
            <div class="col-12">
              <q-chip
                color="teal"
                text-color="white"
                icon="bookmark"
                :label="post.room_type.motel.user.name"
              />
            </div>
          </q-card-section>
        </q-card-section>
        <q-card-actions  align="right">
          <q-btn color="primary" >
            <router-link to="/" style="text-decoration:none; color:white" > đi tới </router-link>
          </q-btn>
        </q-card-actions>

      </q-card>
      <q-card class="my-card" v-else>
        <q-card-section horizontal>
          <q-card-section
            class="row items-center"
            style="
              min-width: 120px;
              min-height: 120px;
              max-height: 180px;
              max-width: 180px;
              height: 20%;
              width: 20%;
            "
          >
            <q-img
              :src="urlBase + post.room.room_type?.first_img_detail[0].img"
              :ratio="1"
              spinner-color="primary"
              spinner-size="82px"
            />
          </q-card-section>

          <q-card-section  style="max-width:80%" class="row">
            <div class="col-12 text-blue text-subtitle2">
              {{ post.room.room_type.name }} - {{ post.title }} -
              {{ post.room.room_type.motel.name }}
            </div>
            <div class="col-12 row items-center">
              <div class="text-green text-subtitle2 col-6 col-md-2">
                {{ toCost(post.room.room_type.cost) }}nvnd/th
              </div>
              <div class="col-1 gt-sm text-center">
                {{ post.room.room_type.area }}m2
              </div>
              <div class="col-6 col-md-3 text-right">
                {{ toDate(post.updated_at) }}
              </div>
              <div class="col-12 lt-md"><br></div>
              <div class="col-12 col-md-6 text-center">
                {{ post.room.room_type.motel.address }}
              </div>
            </div>
            <div class="gt-sm col-12">
              {{ post.conpound_content }}-{{ post.room.room_type.content }}
            </div>
            <div class="col-12">
              <q-chip
                color="teal"
                text-color="white"
                icon="bookmark"
                :label="post.room.latest_tenant.tenant_users[0].user.name"
              />
            </div>
          </q-card-section>
        </q-card-section>
        <q-card-actions  align="right">
          <q-btn color="primary" >
            <router-link to="/" style="text-decoration:none; color:white" > đi tới</router-link>
          </q-btn>
        </q-card-actions>
      </q-card>
      <div><br /></div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    function toDate(date) {
      return date.slice(0, 10);
    }
    function toCost(cost) {
      let cost1 = cost.toString();
      return cost1.slice(0, cost1.length - 3);
    }
    return {
      toDate,
      toCost,
    };
  },
  props: {
    posts: Array,
  },
  data() {
    return {
      urlBase: this.$api.defaults.baseURL + "/image/",
    };
  },
};
</script>

<style>
</style>
