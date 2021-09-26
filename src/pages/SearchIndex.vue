<template>
  <q-page padding class="row justify-center">
    <div v-if="posts" class="col-12 col-md-10">
      <search-render-post :posts="posts.data"></search-render-post>
    </div>

    <div class="col-12 flex flex-center">
      <q-pagination
        v-model="current_page"
        :max="max_page"
        :max_pages="8"
        color="accent"
        direction-links
        bounadary-links
      />
    </div>
  </q-page>
</template>

<script>
import SearchRenderPost from "../components/SearchRenderPost.vue";
export default {
  setup() {},
  data() {
    return {
      posts: null,
      post_types: null,
      max_page: 1,
      current_page: 1,
    };
  },
  watch: {
    current_page(newVal, OldVal) {
      this.loadpage(newVal);
    },
  },
  async created() {
    const getPost = await this.$api.get("getPost");

    if (getPost.data?.statusCode == 1) {
      this.posts = getPost.data?.posts;
      this.post_types = getPost.data?.post_type;
      this.max_page = getPost.data.posts.last_page;
    }
  },
  methods: {
    async loadpage(num_page) {
      const res = await this.$api.get("getPost?page=" + num_page);
      if (res.data?.statusCode == 1) {
        this.posts = res.data?.posts;
      }
      return 1;
    },
  },
  components: {
    SearchRenderPost,
  },
};
</script>

<style>
</style>
