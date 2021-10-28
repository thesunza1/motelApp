<template>
  <div class="full-width">
    <hr>
    <div class="row full-width items_center justify-center">
      <div class="col-12 text-h5">Bình luận:</div>
      <div class="col-12 row justify-end">
        <q-btn
          rounded
          color="primary"
          icon="add"
          class="g-header"
          label=" Tạo bình luận"
          @click="isCreate = true"
        />
      </div>
      <div class="col-12"><br /></div>
      <div class="col-11 row items-center">
        <div class="col-12" v-for="(comment, index) in comments" :key="index">
          <q-card class="my-card g-border">
            <q-card-section class="row items-center">
              <div class="col-12 row justify-end">
                <q-chip icon="directions" :label="todate(comment.updated_at)" />
              </div>
              <div class="col-12" v-html="comment.content"></div>
            </q-card-section>
          </q-card>
          <br />
        </div>
      </div>
      <div class="col-12"><br /></div>
      <div class="col-12 row items-center justify-center">
        <q-pagination v-model="pageNum" :max="max_page" color="accent" />
      </div>
    </div>
    <q-dialog v-model="isCreate" >
      <q-card style="min-width: 60%" class="g-border">
        <q-card-section class="row items-center bg-primary">
          <div class="col-12 text-center text-h6 text-white">Tạo bình luận</div>
        </q-card-section>
        <q-card-section class="row items-center justify-center">
          <div class="col-12">Mời bạn nhập bình luận</div>
          <div class="col-12"><br /></div>
          <div class="col-11 g-border bg-blue-1 shadow-1">
            <q-form @submit="createComment()">
              <q-editor class="bg-blue-1" v-model="content" min-height="5rem" flat />
              <q-card-actions align="right">
                <q-btn
                  flat
                  label=" Tạo "
                  class="g-header"
                  color="primary"
                  type="submit"
                  v-close-popup
                />
              </q-card-actions>
            </q-form>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue";
import {mapGetters} from 'vuex';
import noti from "../boot/noti/noti";
export default {
  setup() {
    const pageNum = ref(1);
    const isCreate = ref(false);
    function todate(date) {
      return date.toString().slice(0, 10);
    }
    return {
      pageNum,
      isCreate,
      todate,
    };
  },
  watch: {
    pageNum(newVal, oldVal) {
      this.loadpage(newVal);
    },
  },
  props: {
    post_id: {
      type: Number,
      required: true,
    },
  },
  async created() {
    const resComments = await this.$api.get("getAllComment/" + this.post_id);
    if (resComments.data.statusCode == 1) {
      this.comments = resComments.data.postComments.data;
      this.max_page = resComments.data.postComments.last_page;
    }
  },
  data() {
    return {
      comments: null,
      max_page: 1,
      content: null,
    };
  },
  methods: {
    async loadpage(page) {
      const res = await this.$api.get(
        `getAllComment/${this.post_id}?page=${page}`
      );
      if (res.data.statusCode == 1) {
        this.comments = res.data.postComments;
      }
      return;
    },
    async createComment() {
      if(!this.user) {
        noti.showNoti('bạn chưa đăng nhập', 'negative');
        return ;
      }
      const res = await this.$api.post('createComment',{
        post_id : this.post_id ,
        content : this.content,
      }) ;
      if(res.data.statusCode ==1){
        this.reloadpage();
      }
    },
    async reloadpage() {
      const resComments = await this.$api.get("getAllComment/" + this.post_id);
      if (resComments.data.statusCode == 1) {
        this.comments = resComments.data.postComments.data;
        this.max_page = resComments.data.postComments.last_page;
      }
      return ;
    },
  },
  computed: {
    ...mapGetters('User' , ['user']),
  }
};
</script>

<style>
</style>
