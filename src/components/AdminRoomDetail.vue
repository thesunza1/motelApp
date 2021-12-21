<template>
  <div>
    <q-card class="my-card g-border">
      <q-card-section class="text-subtitle2">
        <q-icon name="store" class="size-icon" />
        Phòng: {{ room.name }}
      </q-card-section>
      <q-card-section>
        <q-card
          class="my-card mr row-color"
          v-for="(user, index) in room.tenant.tenant_users"
          :key="index"
        >
          <q-card-section v-if="user.infor_share ==1 ">
            <q-card-section class="row items-center">
              <div class="col-8">
                <q-icon name="person" class="text-positive size-icon q-pr-sm" />
                <div class="g-header-up" style="display: inline">
                  {{ user.user.name }}
                </div>
              </div>
              <div class="col-4">
                <q-icon name="phone" class="text-positive size-icon" />
                {{ user.user.phone_number }}
              </div>
              <div class="col-8">
                <q-icon name="drafts" class="text-positive size-icon" />
                {{ user.user.email }}
              </div>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn
                falt
                color="negative"
                class="g-header"
                rounded
                label="Cho ra"
                @click="$emit('openIsOutRoom', user.user)"
              />
            </q-card-actions>
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
