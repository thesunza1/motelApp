<template>
  <q-page class="row content-start " padding>
    <div class="col-12 row items-center rtname">
      <q-tabs align="left">
        <q-route-tab
          :to="{ name: 'all', params: { motelId: motelId } }"
          class="g-header"
          icon="home"
          label="Danh sách loại phòng"
        />
        <q-route-tab
          :to="{ name: 'bill', params: { motelId: motelId } }"
          class="g-header"
          icon="paid"
          label="Tiền phòng "
        />
      </q-tabs>
    </div>
    <div class="col-12"><br /></div>
    <div class="col-12 row">
      <div
        v-for="(room_type, index) in motel.room_types"
        :key="index"
        class="col-12 row pd"
      >
        <q-expansion-item
          expand-separator
          class="col-12 g-border bg-white pd shadow-1"
        >
          <template v-slot:header>
            <q-item class="full-width">
              <q-item-section top avatar>
                <q-avatar color="primary" text-color="white" icon="home" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="g-header-up text-h6"> {{room_type.name  }} </q-item-label>
                <q-item-label caption lines="2">
                  <div class="row text-black items-center q-gutter-md">
                    <div class="q-py-sm q-px-sm">Tổng phòng: {{ lengthArr(room_type.rooms) }}</div>
                    <div >
                       <div class="g-display-inline bg-green q-py-sm q-px-sm " ></div> Phòng trống: {{ numRoom(room_type.rooms, 1) }}
                    </div>
                    <div class=" q-py-sm q-px-sm">
                      <div class="g-display-inline bg-red q-py-sm q-px-sm " ></div>
                      Không sử dụng: {{ numRoom(room_type.rooms, 3) }}</div>
                    <div class=" q-py-sm q-px-sm">
                      <div class="g-display-inline bg-blue q-py-sm q-px-sm " ></div>
                      Phòng Có người: {{ numRoom(room_type.rooms, 2) }}</div>
                  </div>
                </q-item-label>
              </q-item-section>
            </q-item>
          </template>
          <motel-room-render :rooms="room_type.rooms"></motel-room-render>
        </q-expansion-item>
      </div>
    </div>
  </q-page>
</template>

<script>
import sp from "../boot/support";
import { mapGetters } from "vuex";
import MotelRoomRender from "components/MotelRoomRender.vue";
export default {
  components: {
    MotelRoomRender,
  },
  computed: {
    ...mapGetters("Motel", ["motel"]),
  },
  data() {
    return {
      motelId: this.$route.params.motelId,
    };
  },
  methods: {
    lengthArr(arr) {
      return sp.length(arr);
    },
    numRoom(rooms, status) {
      return sp.numRoom(rooms, status);
    },
  },
};
</script>

<style scoped lang="sass">
.mr
  margin: 0px 5px

.fscr
  width: 100%
.rtname
  height: 5%

.pd
  padding: 10px
  margin-bottom: 20px
  border-radius: 3px
.roomsbg
  background-color: white
</style>
