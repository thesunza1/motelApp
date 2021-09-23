<template>
  <q-page padding>
    <div
      v-for="(roomType, index) in inforShareRoom"
      :key="index"
      class="full-width row items-center"
    >
      <div class="col-12 text-h6">
         {{ roomType.name }}
      </div>
      <div class="col-12 row items-center">
        <div v-for="(room, index) in roomType.rooms" :key="index" class="col-4 col-md-3 row justify-center items-center"  >
          <q-card class="my-card col-11" :class="room.room_status_id !=2 ? bgCard(room.room_status_id): ''" style="min-height:100px">
            <q-card-section
              class="
                text-white text-center
                rooms
                row
                justify-center
                items-center

              "
              :class="bgCard(room.room_status_id)"
              @click="openDialog(room)"
            >
              <div class="col-12"> phòng : {{ room.name }}</div>
            </q-card-section>
            <q-card-section v-if="room.room_status_id ==2" >
              <div v-for="(user,index) in room.tenant.infor_tenant_users" :key="index">
               id:{{ user.user?.id }} :  {{ user.user?.name }}
              </div>
            </q-card-section>
          </q-card>
          <div class="col-12"><br></div>
        </div>
      </div>
    </div>
    <q-dialog v-if="thisRoom" v-model="isOpen" >
      <q-card  style="min-width:60%">
        <q-card-section class="row items-center"
          :class="bgCard(thisRoom.room_status_id)"
        >
          <div class=" col-12 text-center text-h6 text-white" > chi tiết  phòng {{ thisRoom.name}}</div>
        </q-card-section>
        <q-card-section v-if="thisRoom.room_status_id == 1">
           phòng trống
        </q-card-section>
        <q-card-section v-if="thisRoom.room_status_id == 2">
          <q-card v-for="(user, index) in thisRoom.tenant.infor_tenant_users" :key="index" class="my-card" style="margin-bottom:10px">
            <q-card-section class="row items-center">
              <div class="col-12 text-subtitle2">id:{{user.user.id}}-{{user.user.name}}</div>
              <div class="col-12 ">sdt: {{user.user.phone_number}}</div>
              <div class="col-12 "> ngành nghề: {{user.user.job}}</div>
            </q-card-section>
          </q-card>
          <div><br></div>
        </q-card-section>
        <q-card-section v-if="thisRoom.room_status_id == 3">
          Lorem ipsum dolor sit amet
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="red" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
import { useQuasar } from "quasar";
export default {
  setup() {
    const $q = useQuasar();
    function showNoti(mess, col) {
      $q.notify({
        color: col,
        message: mess,
        position: "top",
        timeout: 2000,
      });
    }
    function toDate(date) {
      return date.slice(0, 10);
    }
    function toSex(sex) {
      if (sex == 0) return "nam";
      else return "nữ";
    }
    function bgCard(status) {
      return status == 1?  'bg-positive' : status ==2 ? 'bg-blue-7': 'bg-red';
    }
    return {
      showNoti,
      toDate,
      toSex,
      bgCard
    };
  },
  computed: {
    ...mapGetters("InforShareRoom", ["inforShareRoom"]),
  },
  data() {
    return {
      thisRoom : null ,
      isOpen: false ,

    }
  },
  methods: {
    openDialog(room) {
      this.thisRoom = room ;
      this.isOpen =true ;
    }
  }
};
</script>

<style>
</style>
