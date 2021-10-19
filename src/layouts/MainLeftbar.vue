<template>
  <div v-if="!user" class="row full-width justify-center">
    <q-btn
      :class="`bg-${link.col1}`"
      class="col-10 text-white g-header"
      :label="link.name"
      :icon="link.icon"
      @click="$router.push(link.link)"
    >
    </q-btn>
    <div class="col-12" style="height: 5px"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  setup() {},
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
