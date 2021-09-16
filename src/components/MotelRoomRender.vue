<template>
  <div class="row items-center" style="width: 100%">
    <div
      class="col-4 col-md-2 text-h4"
      v-for="(room, index) in rooms"
      :key="index"
    >
      <q-card class="my-card">
        <q-card-section
          class="text-white text-center rooms row justify-center items-center"
          :class="{
            'bg-positive': roomStatus(room) == 'none',
            'bg-blue-7': roomStatus(room) == 'had',
            'bg-red': roomStatus(room) == 'disable',
          }"
          @click="openDialog(room)"
        >
          <div class="col-12">{{ room.name }}</div>
        </q-card-section>
      </q-card>
    </div>
    <q-dialog v-model="isNone">
      <q-card class="row modalb fs br" style="max-height: 80vh">
        <q-card-section
          class="row pd full-width justify-center text-white bg-positive"
        >
          <div class="col-12 text-center text-h5">chi tiết phòng</div>
          <div class="col-12"><br /></div>
          <div class="col-11 align-left">phòng : {{ thisRoom.name }}</div>
        </q-card-section>
        <q-card-section class="col-12 row justify-center">
          <q-select
            class="col-9 col-md-8"
            label="trạng thái phòng"
            filled
            v-model="thisStatus"
            :options="roomStatuses"
            option-value="id"
            option-label="name"
            emit-value
            map-options
          />
          <q-btn
            class="col-2"
            color="green-7"
            label="đổi"
            icon="check"
            @click="updateRoomStatus"
          />
          <div class="col-12"><br /></div>
          <div class="col-12">
            <find-user
              :userFind="userFind"
              @updateUserFind="updateUserFind"
            ></find-user>
          </div>
        </q-card-section>
        <q-card-section class="row full-width items-center pd justify-end">
          <q-btn
            color="orange-9"
            icon="add"
            label=" mời vào "
            @click="addUserToRoom()"
          />
        </q-card-section>
        <q-card-section>
          <div class="full-width mob"></div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="isHad">
      <q-card
        v-if="thisTenant"
        class="row modalb fs br"
        style="max-height: 80vh"
      >
        <q-card-section
          class="row pd full-width justify-center text-white bg-blue"
        >
          <div class="col-12 text-center text-h5">chi tiết phòng</div>
          <div class="col-12"><br /></div>
          <div class="col-11 align-left">phòng : {{ thisRoom.name }}</div>
        </q-card-section>
        <q-card-section class="col-12 row justify-center bg-orange-1">
          <div class="col-12 text-center subtitle2">người ở</div>
          <div class="col-12 text-center subtitle2"><br /></div>
          <div class="col-12"><hr /></div>
          <div class="col-12 row items-center">
            <div class="col-2 text-center">id</div>
            <div class="col-4 text-center">tên</div>
            <div class="col-4 text-center">sdt</div>
            <div class="col-2 text-center">xem</div>
            <div class="col-12"><hr /></div>
            <div class="col-12"><br /></div>
          </div>
          <div
            v-for="(user, index) in thisTenant.tenant_users"
            :key="index"
            class="col-12 row items-center"
          >
            <div class="col-2 text-center">{{ user.user.id }}</div>
            <div class="col-4 text-center">{{ user.user.name }}</div>
            <div class="col-4 text-center">{{ user.user.phone_number }}</div>
            <div class="col-2 text-center">
              <q-btn
                style="margin: 0px 7px"
                color="primary"
                label="chi tiết"
                @click="findUser(user.user.id)"
              />
            </div>
            <div class="col-12"><hr /></div>
            <div class="col-12"><br /></div>
          </div>
        </q-card-section>
        <q-card-section>
          <div><br /></div>
        </q-card-section>
        <q-card-section class="col-12 row justify-center bg-red-1">
          <div class="col-12 text-center subtitle2">thiết bị phòng</div>
          <div class="col-12 text-center subtitle2"><br /></div>
          <div class="col-12"><hr /></div>
          <div class="col-12 row items-center">
            <div class="col-4 text-center">tên</div>
            <div class="col-8 text-center">nội dung</div>
            <div class="col-12"><hr /></div>
            <div class="col-12"><br /></div>
          </div>
          <div
            v-for="(equip, index) in thisTenant.tenant_room_equips"
            :key="index"
            class="col-12 row items-center"
          >
            <div class="col-4 text-center">{{ equip.name }}</div>
            <div class="col-8 text-center">{{ equip.content }}</div>
            <div class="col-12"><hr /></div>
            <div class="col-12"><br /></div>
          </div>
          <div class="col-12"><br /></div>
          <div class="col-12 items-center row">
            <div
              v-if="thisTenant.eq_status == 0"
              class="col-7 text-red text-center"
            >
              bạn chưa xác nhận
            </div>
            <div v-else class="col-7 text-blue-10 text-center">đã xác nhận</div>
            <div v-if="thisTenant.eq_status == 0" class="col-5">
              <q-btn
                style="margin: 0px 7px"
                color="primary"
                label="xác nhận"
                @click="confirmEq"
              />
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <div><br /></div>
        </q-card-section>
        <q-card-section class="col-12 row justify-center bg-red-1">
          <div class="col-12 text-center subtitle2">số điện nước</div>
          <div class="col-12 text-center subtitle2"><br /></div>
          <div class="col-12"><hr /></div>
          <div class="col-12 row items-center">
            <div class="col-6 text-center">
              số điện: {{ thisTenant.elec_num }}
            </div>
            <div class="col-6 text-center">
              số nước: {{ thisTenant.water_num }}
            </div>
            <div class="col-12"><br /></div>
          </div>
          <div class="col-12 items-center row justify-end">
            <div
              v-if="thisTenant.num_status == 0"
              class="col-7 text-red text-center"
            >
              bạn chưa xác nhận
            </div>
            <div v-else class="col-7 text-blue-10 text-center">đã xác nhận</div>
            <div class="col-5">
              <q-btn
                v-if="thisTenant.num_status == 0"
                style="margin: 0px 7px"
                color="primary"
                label="xác nhận"
                @click="confirmNum"
              />
            </div>
          </div>
        </q-card-section>
        <q-card-section class="col-12 row justify-center">
          <div class="col-12"><br /></div>
          <div class="col-12">
            <find-user
              :userFind="userFind"
              @updateUserFind="updateUserFind"
            ></find-user>
          </div>
        </q-card-section>
        <q-card-section class="row full-width items-center pd justify-end">
          <q-btn
            color="orange-9"
            icon="add"
            label=" mời vào "
            @click="addUserToRoom()"
          />
        </q-card-section>
        <q-card-section>
          <div class="full-width mob"></div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="isDisable">
      <q-card class="row modalb fs br" style="max-height: 80vh">
        <q-card-section
          class="row pd full-width justify-center text-white bg-red"
        >
          <div class="col-12 text-center text-h5">chi tiết phòng</div>
          <div class="col-12"><br /></div>
          <div class="col-11 align-left">phòng : {{ thisRoom.name }}</div>
        </q-card-section>
        <q-card-section class="col-12 row justify-center">
          <q-select
            class="col-9 col-md-8"
            label="trạng thái phòng"
            filled
            v-model="thisStatus"
            :options="roomStatuses"
            option-value="id"
            option-label="name"
            emit-value
            map-options
          />
          <q-btn
            class="col-2"
            color="green-7"
            label="đổi"
            icon="check"
            @click="updateRoomStatus"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="isDetailUser">
      <q-card class="row modalb fs br" style="max-height: 80vh">
        <q-card-section
          class="row pd full-width justify-center text-white bg-positive"
        >
          <div class="col-12 text-center text-h5">chi tiết</div>
          <div class="col-12"><br /></div>
        </q-card-section>
        <q-card-section v-if="userFind" class="col-12 row justify-center">
          <div class="col-4 text-bold">id :   </div>
          <div class="col-8">  {{ userFind.id }}</div>
          <div class="col-4 text-bold">giới tính :</div>
          <div class="col-8">  {{ sex(userFind.sex) }}</div>
          <div class="col-4 text-bold">tên :   </div>
          <div class="col-8">  {{ userFind.name }}</div>
          <div class="col-4 text-bold">nghề nghiệp :  </div>
          <div class="col-8">  {{ userFind.job }}</div>
          <div class="col-4 text-bold"> email:    </div>
          <div class="col-8"> {{ userFind.email }}</div>
          <div class="col-4 text-bold"> điện thoại:    </div>
          <div class="col-8">    {{ userFind.phone_number }}</div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FindUser from "components/FindUser.vue";
import { useQuasar } from "quasar";

export default {
  setup() {
    const $q = useQuasar();
    function showNoti(mess, col) {
      $q.notify({
        message: mess,
        color: col,
        position: "top",
        timeout: 1000,
      });
    }
    return {
      showNoti,
    };
  },
  props: {
    rooms: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isRoomDetail: false,
      isNone: false,
      isHad: false,
      isDisable: false,
      thisRoom: {},
      thisTenant: null,
      thisStatus: null,
      userFind: null,
      isDetailUser: false,
    };
  },
  computed: {
    ...mapGetters("RoomStatuses", ["roomStatuses"]),
  },
  methods: {
    roomStatus(room) {
      return room.room_status.name;
    },
    async openDialog(room) {
      let status_name = this.roomStatus(room);
      this.thisStatus = room.room_status.id;
      this.thisRoom = room;
      if (status_name == "none") {
        this.isNone = true;
      } else if (status_name == "had") {
        const thisroom = await this.$api.get("getTenantUser/" + room.id);
        if (thisroom.data.statusCode == 1) {
          this.thisTenant = thisroom.data.tenant;
        }
        this.isHad = true;
      } else this.isDisable = true;
    },
    async updateRoomStatus() {
      // thisStatus
      const response = await this.$api.put(
        "updateRoomStatus/" + this.thisRoom.id,
        {
          roomStatusId: this.thisStatus,
        }
      );
      let statusCode = response.data.statusCode;
      if (statusCode == 0) {
        this.showNoti("khong thể đổi thành có người", "warning");
      } else if (statusCode == 1) {
        this.showNoti(" thành công", "info");
        const motel = await this.$api.get("getMotelRoomType");
        this.$store.dispatch("Motel/motel", motel.data.data);
        this.isNone = false;
        this.isHad = false;
        this.isDisable = false;
      }
    },
    updateUserFind(data) {
      this.userFind = data;
      console.log(data);
    },
    async addUserToRoom() {
      let roomId = this.thisRoom.id;
      if (this.userFind) {
        let userId = this.userFind.id;
        const response = await this.$api.post("sendInvite", {
          roomId: roomId,
          receiverId: userId,
        });
        let statusCode = response.data.statusCode;
        if (statusCode == 0)
          this.showNoti("lỗi: người được gửi là chủ trọ", "negative");
        else if (statusCode == 2)
          this.showNoti("lỗi: do người gửi là quản trị viên", "negative");
        else this.showNoti("thành công: chờ người dùng xác nhận", "info");
      } else {
        this.showNoti("bạn cần tìm người trọ trước", "negative");
      }
    },
    async confirmEq() {
      let tenant_id = this.thisTenant.id;
      const confirm = await this.$api.get("confirmEq/" + tenant_id);
      if (confirm.data.statusCode == 1) {
        this.thisTenant.eq_status = 1;
        this.showNoti("đã thành công", "positive");
      }
    },
    async confirmNum() {
      let tenant_id = this.thisTenant.id;
      const confirm = await this.$api.get("confirmNum/" + tenant_id);
      if (confirm.data.statusCode == 1) {
        this.thisTenant.num_status = 1;
        this.showNoti("đã thành công", "positive");
      }
    },
    async findUser(userId) {
      const response = await this.$api.get("findUser/" + userId);
      this.userFind = response.data.user;
      this.isDetailUser =true;
      if (response.data.statusCode == 0) {
        this.showNoti("id người dùng không tồn tại");
      }
    },
    sex(sex) {
      if (sex == 1) return "nam";
      else if (sex == 0) return "nữ";
      return "";
    },
  },
  components: {
    FindUser,
  },
};
</script>

<style scoped lang='sass'>
$fontSize: 20px
.my-card
  // height: 130px
  margin: 10px 10px

.rooms
  height: 70px
.modalb
  min-width: 95vw
@media (min-width: 1026px)
  .rooms
    height: 150px
  .modalb
    min-width: 75vw
.pd
  padding: 10px 20px
.fs
  font-size: $fontSize
.br
  border-radius: 10px
.mr
  margin: 10px !important
.mob
  height: 10vh
</style>
