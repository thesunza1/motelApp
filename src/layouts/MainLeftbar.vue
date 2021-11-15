<template>
  <div class="row full-width justify-center">
    <q-btn
      class="col-10 text-black text-bold"
      no-caps
      color="white"
      rounded
      :label="link.name"
      :icon="link.icon"
      @click="$router.push(link.link)"
    >
    </q-btn>
    <div class="col-12" style="height: 5px"></div>
  </div>
</template>

<script>
export default {
  setup() {},
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
