<template>
  <div>
    <q-card class="my-card">
      <q-card-section class="text-subtitle2 text-primary">
        <q-icon name="store" class="size-icon" />
        - Thòng: {{room.name  }}
      </q-card-section>
      <q-card-section>
        <q-card
          class="my-card mr row-color"
          v-for="(user, index) in room.tenant.tenant_users"
          :key="index"
        >
          <q-card-section class="row items-center justify-around">
            <div class="g-header-up"> <q-icon name="person" class="text-positive size-icon" />- {{user.user.id}}-{{user.user.name}} </div>
            <div class=""> <q-icon name="drafts" class="text-positive size-icon" />- {{ user.user.email}} </div>
            <div class=""> <q-icon name="phone" class="text-positive size-icon" />- {{ user.user.phone_number}} </div>
            <div>
              <q-btn falt color="negative" icon="delete" class="g-header" label="Cho ra" @click="$emit('openIsOutRoom',user.user)" />
            </div>
          </q-card-section>
        </q-card>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  props: {
    room: {
      type: Object,
    },
  },
};
</script>

<style lang="sass" scoped>
.size-icon
  font-size: 25px
.mr
  margin: 10px 0px
.row-color
  background-color: #EEEEEE
  font-weight: 500
</style>
