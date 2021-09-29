<template>
  <div v-if="!user" class="row full-width justify-center" >
    <q-btn :class=" `bg-${link.col1}`"  class="col-8 text-white">
      <router-link :to="link.link" class="text-white" style="text-decoration:none">{{ link.name }}</router-link>
    </q-btn>
    <div class="col-12" style="height:5px"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  setup() {
  },
  computed: {
    ...mapGetters("User", ["user"]),
  },
  props: {
    link: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped lang='sass'>
div.around
  display: block
  padding: 10px 5px
  border-radius: 2px
  margin-top: 5px
  background-color: #f3f3f3
  border-radius: 3px
  box-shadow: 0px 0px 10px #333333
  a
    text-decoration: none
    color: black
    padding-left: 10px
</style>
