<template>
  <div class="around" v-if="!user">
    <router-link :to="link.link"  >{{ link.name}}</router-link>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('User',['user'])
  },
  props: {
    link: {
      type: Object,
      required: true
    }
  },


}
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
