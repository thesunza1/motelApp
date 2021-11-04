<template>
  <q-layout view="hHh Lpr fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-btn
            class=" gt-sm"
            dense
            flat
            round
            icon="menu"
            @click="drawerLeft = !drawerLeft"
          />
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          <router-link v-if="room" class="link logo" to="motel/all">
            Chi tiết phòng {{ `${room.name}` }}
          </router-link>
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>

      <q-card-actions align="left">
        <q-btn
          rounded
          color="white"
          class="text-black g-header"
          icon="arrow_back"
          label=" Trở về trọ "
          @click="$router.go(-1)"
        />
      </q-card-actions>
    </q-header>

    <q-drawer
      v-model="rightDrawerOpen"
      side="right"
      overlay
      behavior="mobile"
      elevated
    >
      <!-- drawer content -->
      <motel-right-bar></motel-right-bar>
    </q-drawer>

    <q-drawer
      v-if="room"
      side="left"
      v-model="drawerLeft"
      :width="300"
      content-class="bg-grey-3"
    >
      <br />
      <div class="full-width">
        <div>
          <q-item clickable dense v-ripple @click="goto('roomInfor')">
            <q-icon color="positive" name="store" class="g-icon-h2" />
            <q-item-section class="q-ml-sm">Thông tin phòng</q-item-section>
          </q-item>
          <hr />
        </div>
        <div v-if="room.room_status_id != 2">
          <q-item clickable dense v-ripple @click="goto('roomChangeStatus')">
            <q-icon color="primary" name="update" class="g-icon-h2" />
            <q-item-section class="q-ml-sm">Thay đổi trạng thái</q-item-section>
          </q-item>
          <hr />
        </div>
        <div v-if="room.room_status_id == 2">
          <q-item clickable dense v-ripple @click="goto('roomTenants')">
            <q-icon color="primary" name="person" class="g-icon-h2" />
            <q-item-section class="q-ml-sm">Danh sách người thuê</q-item-section>
          </q-item>
          <hr />
        </div>
        <div v-if="room.room_status_id == 2">
          <q-item clickable dense v-ripple @click="goto('roomEquips')">
            <q-icon color="primary" name="work" class="g-icon-h2" />
            <q-item-section class="q-ml-sm">  Tình trạng thiết bị</q-item-section>
          </q-item>
          <hr />
        </div>
        <div v-if="room.room_status_id == 2">
          <q-item clickable dense v-ripple @click="goto('roomNum')">
            <q-icon color="primary" name="bolt" class="g-icon-h2" />
            <q-icon color="primary" name="water_drop" class="g-icon-h2" />
            <q-item-section> Số điện, nước lúc vào trọ</q-item-section>
          </q-item>
          <hr />
        </div>
        <div v-if="room.room_status_id != 3">
          <q-item clickable dense v-ripple @click="goto('roomAddUser')">
            <q-icon color="primary" name="person_add" class="g-icon-h2" />
            <q-item-section class="q-ml-sm"> Thêm người Thuê</q-item-section>
          </q-item>
          <hr />
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view @reloadPage="reload()" />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import roomApi from "../boot/callApi/room";
import MotelRightBar from "components/MotelRightBar";
export default {
  setup() {
    const rightDrawerOpen = ref(false);
    return {
      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
    };
  },
  data() {
    return {
      roomId: this.$route.params.roomId,
      room: null,
      drawerLeft: false,
    };
  },
  async created() {
    const user = await this.$api.get("user");
    const resRoom = await roomApi.getRoom(this.roomId);
    this.room = resRoom.room;
    this.$store.dispatch("User/user", user.data.user);
  },
  methods: {
    goto(refs1) {
      const eleId = document.getElementById(refs1);
      var top2 = eleId.offsetTop;
      console.log(top2);
      window.scrollTo({top : top2 , behavior: 'smooth'});
    },
    async reload() {
      const resRoom = await roomApi.getRoom(this.roomId);
      this.room = resRoom.room;
    },
  },
  components: {
    MotelRightBar,
  },
};
</script>

<style lang="sass" scoped>
.link
  text-decoration: none
  color: white
.logo
  margin-left: 5px
  margin-button: 10px
</style>
