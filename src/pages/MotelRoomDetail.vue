<template>
  <q-page padding class="row justify-center">
    <div v-if="room" class="col-12 col-md-11">
      <div v-if="room.room_status_id == 1">
        <q-card class="my-card g-border" id="roomInfor">
          <q-card-section>
            <div class="text-h6 text-positive">
              <q-icon name="store" class="g-icon-h2" /> Thông tin phòng
            </div>
          </q-card-section>
          <q-card-section class="row items-center">
            <div class="col-12 row items-center">
              <div class="col-md-4 col-12 text-h6">
                {{ room.room_status_id }}
                <b> Trạng thái hiện tại : </b>
                <p class="text-positive" style="display: inline">Trống</p>
              </div>
              <div class="lt-md col-12"><br /></div>
              <div class="col-md-4 col-6">
                <b> Tên phòng : </b>{{ room.name }}
              </div>
              <div class="col-md-4 col-6">
                <b> Loại phòng : </b>{{ room.room_type.name }}
              </div>
            </div>
          </q-card-section>
        </q-card>
        <br />
        <br />
        <q-card class="my-card g-border" id="roomChangeStatus">
          <q-card-section>
            <div class="text-primary text-h6">
              <q-icon name="update" class="g-icon-h2" /> Thay đổi trạng thái
              phòng
            </div>
          </q-card-section>
          <q-card-section class="col-12 row justify-center">
            <q-select
              class="col-md-3"
              label="trạng thái phòng"
              filled
              v-model="thisStatus"
              :options="[
                {
                  id: 1,
                  name: 'Trống',
                },
                {
                  id: 3,
                  name: 'Không sử dụng',
                },
              ]"
              option-value="id"
              option-label="name"
              emit-value
              map-options
            />
            <div class="col-md-2 row justify-center">
              <q-btn
                outline
                rounded
                class="col-11 g-header"
                color="green-7"
                label=" Thay đổi"
                icon="check"
                @click="updateRoomStatus"
              />
            </div>
            <div class="col-12"><br /></div>
          </q-card-section>
        </q-card>
        <br />
        <q-card class="my-card g-border" id="roomAddUser">
          <q-card-section>
            <div class="text-primary text-h6">
              <q-icon name="person_add" class="g-icon-h2" /> Thêm người Thuê vào
              Trọ
            </div>
          </q-card-section>
          <q-card-section class="row items-center justify-center">
            <div class="col-12 col-md-10">
              <find-user
                :userFind="userFind"
                :roomId="room.id"
                @updateUserFind="updateUserFind($event)"
              ></find-user>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div v-if="room.room_status_id == 2">
        <q-card class="my-card g-border" id="roomInfor">
          <q-card-section>
            <div class="text-h6 text-primary">
              <q-icon name="store" class="g-icon-h2" /> Thông tin phòng
            </div>
          </q-card-section>
          <q-card-section class="row items-center">
            <div class="col-12 row items-center">
              <div class="lt-md col-12"><br /></div>
              <div class="col-md-4 col-6">
                <b class="q-pl-sm"> Tên phòng : </b>{{ room.name }}
              </div>
              <div class="col-md-4 col-6">
                <b> Loại phòng : </b>{{ room.room_type.name }}
              </div>
            </div>
          </q-card-section>
        </q-card>
        <br />
        <q-card class="my-card g-border" id="roomTenants">
          <q-card-section>
            <div class="text-h6 text-primary">
              <q-icon name="person" class="g-icon-h2" /> Danh sách người thuê
            </div>
          </q-card-section>
          <q-card-section class="col-12 row justify-center">
            <div class="col-12 text-center subtitle2"><br /></div>
            <div class="col-12"><hr /></div>
            <div class="col-12 row items-center">
              <div class="col-1 gt-sm text-bold q-pl-sm">Stt</div>
              <div class="col-4 col-md-3 text-bold">Tên</div>
              <div class="col-md-4 col-5 text-bold">Email</div>
              <div class="col-2 gt-sm text-bold">Sdt</div>
              <div class="col-2 text-bold text-center">Xem</div>
              <div class="col-12 text-bold"><hr /></div>
              <div class="col-12 text-bold"><br /></div>
            </div>
            <div
              v-for="(user, index) in room.tenant.tenant_users"
              :key="index"
              class="col-12 row items-center"
            >
              <div class="col-1 gt-sm q-pl-sm">{{ ++index }}</div>
              <div class="col-4 col-md-3 g-header-up">{{ user.user.name }}</div>
              <div class="col-md-4 col-5"> <p class="lt-md" style="display:inline">&nbsp;</p>{{ user.user.email }}</div>
              <div class="col-2 gt-sm">{{ user.user.phone_number }}</div>
              <div class="col-2 text-center">
                <q-btn
                  rounded
                  style="margin: 0px 7px"
                  color="grey-10"
                  icon="info"
                  no-caps
                  @click="findUser(user.user.email)"
                >
                  <div class="gt-sm">&nbsp;Chi tiết</div>
                </q-btn>
              </div>
              <div class="col-12"><br /></div>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="text-primary text-h6">
              <q-icon name="person_add" class="g-icon-h2" /> Thêm người Thuê vào
              Trọ
            </div>
          </q-card-section>
          <q-card-section class="row items-center justify-center">
            <div class="col-12 col-md-10">
              <find-user
                :userFind="userFind"
                :roomId="room.id"
                @updateUserFind="updateUserFind($event)"
              ></find-user>
            </div>
          </q-card-section>
        </q-card>
        <br />
        <q-card class="my-card g-border" id="roomEquips">
          <q-card-section>
            <div class="text-h6 text-primary">
              <q-icon name="work" class="g-icon-h2" />
              &nbsp;Phản ánh tình trạng phòng
            </div>
          </q-card-section>
          <q-card-section class="col-12 row justify-center">
            <div class="col-12 row items-center">
              <div class="col-1 text-bold q-pl-sm">Stt</div>
              <div class="col-4 text-bold">Tên thiết bị</div>
              <div class="col-4 text-bold">Trạng Thái</div>
              <div class="col-3 text-center text-bold">Hình ảnh</div>
              <div class="col-12 text-bold"><hr /></div>
              <div class="col-12"><br /></div>
            </div>
            <div
              v-for="(equip, index) in room.tenant.tenant_room_equips"
              :key="index"
              class="col-12 row items-center"
            >
              <div class="col-1 q-pl-sm">{{ ++index }}</div>
              <div class="col-4">{{ equip.name }}</div>
              <div class="col-4">{{ equip.content }}</div>
              <div class="col-3">
                <q-card-actions class="row" align="center">
                  <!-- <q-btn
                    class="q-px-md col-5"
                    rounded
                    :label="`${toLength(equip.img_details)} ảnh`"
                    no-caps
                    @click="seeImgs(equip.img_details)"
                  /> -->
                  <div class="col-12" v-if="toLength(equip.img_details) > 0">
                    <q-img
                      :src="baseUrlImg + equip.img_details[0]"
                      :ratio="16 / 9"
                      spinner-color="primary"
                      spinner-size="82px"
                      @click="seeImgs(equip.img_details)"
                    >
                      <div class="absolute-bottom text-subtitle1 text-center">
                        {{ toLength(equip.img_details) }} ảnh
                      </div>
                    </q-img>
                  </div>
                  <div v-else>Chưa có ảnh</div>
                </q-card-actions>
              </div>
              <div class="col-12"><hr /></div>
              <div class="col-12"><br /></div>
            </div>
            <div class="col-12"><br /></div>
            <div class="col-12 items-center row">
              <div v-if="room.tenant.eq_status == 0" class="col-12 text-red">
                <q-chip
                  icon="star"
                  label=" Bạn chưa xác nhận"
                  color="negative"
                  text-color="white"
                />
              </div>
              <div v-else class="col-12 text-blue-10">
                <q-chip
                  icon="star"
                  label=" Bạn đã xác nhận phản ánh "
                  color="primary"
                  text-color="white"
                />
              </div>
            </div>
          </q-card-section>
          <q-card-actions v-if="room.tenant.eq_status == 0" align="right">
            <q-btn
              rounded
              icon="check"
              style="margin: 0px 7px"
              color="grey-10"
              no-caps
              label="Xác nhận"
              @click="confirmEq()"
            />
          </q-card-actions>
        </q-card>
        <br />
        <q-card class="my-card g-border" id="roomNum">
          <q-card-section>
            <div class="text-h6 text-primary">
              <q-icon name="bolt" class="g-icon-h1" /><q-icon
                name="water_drop"
                class="g-icon-h1"
              />
              Số điện, nước lúc vào trọ
            </div>
          </q-card-section>
          <q-card-section class="col-12 row justify-center">
            <div
              v-if="room.tenant.num_status == 1"
              class="col-12 row items-center g-text-roomType"
            >
              <div class="col-6 text-center">
                <b>Số điện: </b> {{ room.tenant.elec_num }}
              </div>
              <div class="col-6 text-center">
                <b>Số nước: </b> {{ room.tenant.water_num }}
              </div>
              <div class="col-12"><br /></div>
            </div>
            <div v-else class="col-12 row items-center">
              <div class="col-md-4 col-5 row items-center justify-center">
                <q-input
                  class="col-11"
                  v-model="room.tenant.elec_num"
                  type="text"
                  label=" Nhập số điện"
                />
              </div>
              <div class="col-md-4 col-5 row items-center justify-center">
                <q-input
                  class="col-11"
                  v-model="room.tenant.water_num"
                  type="text"
                  label=" Nhập số nước "
                />
              </div>
              <div class="col-md-4 col-2 row items-center justify-end">
                <q-btn
                  color="grey-10"
                  icon="check"
                  rounded
                  no-caps
                  @click="confirmNum"
                >
                  <div class="gt-sm">Yêu cầu xác nhận</div>
                </q-btn>
              </div>
              <div class="col-12"><br></div>
            </div>
            <div class="col-12 items-center row">
              <div v-if="room.tenant.num_status == 0" class="col-12">
                <q-chip
                  icon="star"
                  label=" Người thuê chưa xác nhận"
                  color="negative"
                  text-color="white"
                />
              </div>
              <div v-else class="col-12">
                <q-chip
                  icon="star"
                  label=" Người thuê đã xác nhận số điện, nước"
                  color="primary"
                  text-color="white"
                />
              </div>
            </div>
          </q-card-section>
          <!-- <q-card-actions v-if="room.tenant.num_status == 1" align="right">
            <q-btn
              outline
              icon="check"
              style="margin: 0px 7px"
              color="primary"
              label="Xác nhận"
              @click="confirmNum"
            />
          </q-card-actions> -->
        </q-card>
        <br />
      </div>
      <div v-if="room.room_status_id == 3">
        <q-card class="my-card" id="roomInfor">
          <q-card-section>
            <div class="text-h6 text-positive">
              <q-icon name="store" class="g-icon-h2" /> Thông tin phòng
            </div>
          </q-card-section>
          <q-card-section class="row items-center">
            <div class="col-12 row items-center">
              <div class="col-md-4 col-12 text-h6">
                <b> Trạng thái hiện tại : </b>
                <p class="text-negative" style="display: inline">Đang sửa</p>
              </div>
              <div class="lt-md col-12"><br /></div>
              <div class="col-md-4 col-6">
                <b> Tên phòng : </b>{{ room.name }}
              </div>
              <div class="col-md-4 col-6">
                <b> Loại phòng : </b>{{ room.room_type.name }}
              </div>
            </div>
          </q-card-section>
        </q-card>
        <br />
        <br />
        <q-card class="my-card" id="roomChangeStatus">
          <q-card-section>
            <div class="text-primary text-h6">
              <q-icon name="update" class="g-icon-h2" /> Thay đổi trạng thái
              phòng
            </div>
          </q-card-section>
          <q-card-section class="col-12 row justify-center">
            <q-select
              class="col-md-3"
              label="trạng thái phòng"
              filled
              v-model="thisStatus"
              :options="[
                {
                  id: 1,
                  name: 'Trống',
                },
                {
                  id: 3,
                  name: 'Không sử dụng',
                },
              ]"
              option-value="id"
              option-label="name"
              emit-value
              map-options
            />
            <div class="col-md-2 row justify-center">
              <q-btn
                outline
                rounded
                class="col-11 g-header"
                color="green-7"
                label=" Thay đổi"
                icon="check"
                @click="updateRoomStatus"
              />
            </div>
            <div class="col-12"><br /></div>
          </q-card-section>
        </q-card>
        <br />
      </div>
    </div>

    <q-dialog v-model="isSeeImgs">
      <gobal-img-detail
        style="min-width: 90%"
        :img_details="thisImgs"
      ></gobal-img-detail>
    </q-dialog>
    <q-dialog v-model="isDetailUser">
      <q-card class="row justify-center modalb fs br" style="max-height: 80vh">
        <q-card-section class="row pd col-12 text-primary">
          <div class="col-11 text-center text-h5">
            <q-icon name="info" class="g-icon-h1" />
            Chi tiết</div>
        </q-card-section>
        <q-card-section v-if="userFindPop" class="col-10 row justify-center">
          <div class="col-4 text-bold  text-right">Tên :</div>
          <div class="col-1"></div>
          <div class="col-7 g-header-up">{{ userFindPop.name }}</div>
          <div class="col-4 text-bold text-right">Email:</div>
          <div class="col-1"></div>
          <div class="col-7">{{ userFindPop.email }}</div>
          <div class="col-4 text-bold text-right">Điện thoại:</div>
          <div class="col-1"></div>
          <div class="col-7">{{ userFindPop.phone_number }}</div>
          <div class="col-4 text-bold text-right">Giới tính :</div>
          <div class="col-1"></div>
          <div class="col-7">{{ sex(userFindPop.sex) }}</div>
          <div class="col-4 text-bold text-right">Nghề nghiệp :</div>
          <div class="col-1"></div>
          <div class="col-7">{{ userFindPop.job }}</div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import roomApi from "../boot/callApi/room";
import FindUser from "../components/FindUser.vue";
import GobalImgDetail from "../components/GobalImgDetail.vue";
import noti from "../boot/noti/noti";
import sp from "../boot/support";
export default {

  async created() {
    const resRoom = await roomApi.getRoom(this.roomId);
    this.room = resRoom.room;
    this.thisStatus = resRoom.room.room_status_id;
  },
  data() {
    return {
      roomId: this.$route.params.roomId,
      baseUrlImg: this.$api.defaults.baseURL + "/image/",
      room: null,
      thisStatus: null,
      userFind: null,
      userFindPop: null,
      isDetailUser: false,
      isSeeImgs: false,
      thisImgs: null,
    };
  },
  methods: {
    sex(sex) {
      return sp.toSex(sex);
    },
    seeImgs(img_details) {
      this.thisImgs = img_details;
      this.isSeeImgs = true;
      console.log(img_details);
    },
    updateUserFind(data) {
      this.userFind = data;
    },
    //change status -- not check ..
    async updateRoomStatus() {
      // thisStatus
      const response = await this.$api.put("updateRoomStatus/" + this.room.id, {
        roomStatusId: this.thisStatus,
      });
      let statusCode = response.data.statusCode;
      if (statusCode == 0) {
        noti.showNoti("không thể đổi thành có người", "warning");
      } else if (statusCode == 1) {
        noti.showNoti(" Thành công", "positive");
        const res = await roomApi.getRoom(this.roomId);
        this.room = res.room;
        this.thisStatus = res.room.room_status_id;
        this.$emit("reloadPage");
      }
    },
    async confirmNum() {
      const confirmNum = await this.$api.post("updateNumRoom", {
        roomId: this.roomId,
        water_num: this.room.tenant.water_num,
        elec_num: this.room.tenant.elec_num,
      });
      if (confirmNum.data.statusCode == 1) {
        noti.showNoti("Đã gửi thành công, chờ xác nhận", "black");
      }
    },
    async findUser(email) {
      const response = await this.$api.get("findUser/" + email);
      this.userFindPop = response.data.user[0];
      this.isDetailUser = true;
      if (response.data.statusCode == 0) {
        noti.showNoti("Email người dùng không tồn tại");
      }
    },
    async confirmEq() {
      let tenant_id = this.room.tenant.id;
      const confirm = await roomApi.confirmEq(tenant_id);
      if (confirm.statusCode == 1) {
        this.room.tenant.eq_status = 1;
        this.showNoti(" Đã thành công", "positive");
      }
    },
    // async confirmNum() {
    //   let tenant_id = this.room.tenant.id;
    //   const confirm = await roomApi.confirmNum(tenant_id);
    //   if (confirm.statusCode == 1) {
    //     this.room.tenant.num_status = 1;
    //     this.showNoti("Đã thành công", "positive");
    //   }
    // },
    toLength(arr) {
      return sp.length(arr);
    },
  },

  components: {
    FindUser,
    GobalImgDetail,
  },
};
</script>

<style></style>
