<template>
  <q-card class="my-card g-border">
    <q-img style="height: 200px" :src="`${urlBase}${post.img_details[0]}`" @click="$emit('showImgs' , index)"/>
    <q-card-section>
      <div class="full-width row justify-between items-center">
        <div class="text-h6">Loại phòng : {{ post.name }}</div>
        <div class="text-h6"> Trạng thái: <p style="display: inline"  :class="post.post.status == 1 ? 'text-positive' : 'text-negative' "> {{ post.post.status == 1 ? 'Đang mở' : 'Đang tắt'  }} </p></div>
      </div>
      <div><br /></div>
      <div class="full-width row justify-between items-center">
        <div class="">Ngày tạo: {{ toDate(post.post.created_at) }}</div>
        <div class="">Ngày cập nhật: {{ toDate(post.post.updated_at) }}</div>
      </div>
    </q-card-section>
    <q-card-actions align="right">
      <q-btn flat color="orange" label=" Đổi trạng thái " @click="$emit('changeSt' , post.post.id)" />
      <q-btn flat color="primary" label=" Xem bài" @click="$emit('seem' , post.post.id)" />
    </q-card-actions>
  </q-card>
</template>

<script>
import dateSp from "../boot/noti/date";
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
    index: {
      type:Number,
    }
  },
  data() {
    return {
      urlBase: this.$api.defaults.baseURL + "/image/",
    };
  },
  methods: {
    toDate(date) {
      return dateSp.toDate(date);
    },
  },
};
</script>

<style></style>
