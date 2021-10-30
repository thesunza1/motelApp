<template>
  <q-page padding>
    <q-drawer
      side="left"
      v-model="drawLeft"
      bordered
      :width="400"
      :breakpoint="300"
      content-class="bg-grey-3"
    >
      <br />
      <q-item clickable @click="goto('infor')">
        <q-item-section top avatar>
          <q-avatar color="primary" text-color="white" icon="home" />
        </q-item-section>
        <q-item-section>
          <q-item-label> Chi tiết phòng</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable @click="goto('eqInfor')">
        <q-item-section top avatar>
          <q-avatar color="primary" text-color="white" icon="view_agenda" />
        </q-item-section>
        <q-item-section>
          <q-item-label> Tình trạng thiết bị phòng </q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable @click="goto('tenantInfor')">
        <q-item-section top avatar>
          <q-avatar color="primary" text-color="white" icon="people_alt" />
        </q-item-section>
        <q-item-section>
          <q-item-label> Người đang thuê</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable @click="goto('postsInfor')">
        <q-item-section top avatar>
          <q-avatar color="primary" text-color="white" icon="badge" />
        </q-item-section>
        <q-item-section>
          <q-item-label> Danh sách bài đăng</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable @click="goto('shareInfor')">
        <q-item-section top avatar>
          <q-avatar color="primary" text-color="white" icon="share" />
        </q-item-section>
        <q-item-section>
          <q-item-label> Chia sẽ thông tin</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable @click="goto('numInfor')">
        <q-item-section top avatar>
          <q-avatar color="primary" text-color="white" icon="dialpad" />
        </q-item-section>
        <q-item-section>
          <q-item-label> Nhập số điện nước khi vào trọ </q-item-label>
        </q-item-section>
      </q-item>
    </q-drawer>
    <div class="col-12">
      <q-btn color="primary" class="gt-sm" icon="menu" @click="drawLeft = !drawLeft" />
    </div>
    <div class="row full-width items-center justify-center">
      <div v-if="user && tenant && roomTypeUser" class="col-12 col-md-10">
        <q-card class="my-card full-width br" id="infor">
          <q-card-section class="row items-center text-primary">
            <div class="col-12 text-center co-card-header">
              <q-icon name="home" /> Chi tiết phòng
            </div>
          </q-card-section>
          <q-card-section class="row items-center">
            <div class="col-md-3 col-6 text-left">
              <b>Phòng :</b> {{ tenant.room.name }}
            </div>
            <div class="col-md-3 col-6 text-center">
              <b>Loại :</b> {{ roomTypeUser.name }}
            </div>
            <div class="lt-sm col-12"><br /></div>
            <div class="col-md-3 col-6 text-left">
              <b>Ngày vào :</b> {{ getDate(tenant.in_date) }}
            </div>
            <div class="col-md-3 col-6 text-center">
              <b>Ngày ra :</b> {{ tenant.out_date }}
            </div>
            <div class="col-12"><br /></div>
          </q-card-section>
          <q-card-section class="row items-center">
            <div class="col-md-3 col-6 text-left">
              <b>Giá phòng:</b> {{ toNum(roomTypeUser.cost) }} Vnd
            </div>
            <div class="col-md-3 col-6 text-center">
              <b>Phụ thu :</b> {{ toNum(roomTypeUser.motel.people_cost) }} Vnd
            </div>
            <div class="lt-sm col-12"><br /></div>
            <div class="col-md-3 col-6 text-left">
              <b>Giá điện:</b> {{ toNum(roomTypeUser.motel.elec_cost) }} Vnd
            </div>
            <div class="col-md-3 col-6 text-center">
              <b>Giá nước :</b> {{ toNum(roomTypeUser.motel.water_cost) }} Vnd
            </div>
            <div class="col-12"><br /></div>
          </q-card-section>
        </q-card>
        <div><br /></div>

        <q-card class="my-card br full-width" id="eqInfor">
          <q-card-section class="row items-center text-primary">
            <div class="co-card-header col-12 text-center">
              <q-icon name="view_agenda" /> Tình trạng thiết bị phòng
            </div>
          </q-card-section>
          <q-card-section class="row items-center justify-end">
            <q-btn
              outline
              no-caps
              color="positive"
              icon="add"
              label="Thêm thiết bị"
              @click="addRowEquip"
            />
          </q-card-section>
          <q-card-section v-if="room_equips_num == 0" class="text-red">
            *Bạn chưa có thiết bị nào
          </q-card-section>
          <q-card-section v-else class="row items-center justify-center">
            <div class="col-12 row items-center justify-center">
              <div v-if="eq_status == 0" class="col-12 text-red text-left">
                *Chưa xác nhận với chủ trọ
              </div>
              <div v-else class="col-12 text-primary text-left">
                *Chủ trọ đã xác nhận
              </div>
              <div class="col-12"><br /></div>
              <div class="col-4 text-bold">Tên thiết bị</div>
              <div class="col-4 text-bold">Trạng thái</div>
              <div class="col-2 text-bold">Hình ảnh</div>
              <div class="col-2 text-bold">Xóa</div>
              <div class="col-12">
                <hr />
              </div>
              <div class="col-12"><br /></div>
            </div>
            <div v-if="room_equips" class="row col-12 items-center">
              <div
                v-for="(room_equip, index) in room_equips"
                :key="index"
                class="row col-12 items-center"
              >
                <div class="col-4 row items-center justify-start">
                  <q-input
                    class="col-11 text-center bg-purple-1"
                    v-model="room_equip.name"
                    type="text"
                    outlined
                  />
                </div>
                <div class="col-4 row items-center justify-start">
                  <q-input
                    class="col-11 text-center bg-purple-1"
                    v-model="room_equip.content"
                    type="text"
                    outlined
                  />
                </div>
                <div class="col-2">
                  <q-card-actions align="center">
                    <q-btn flat label="Xem" no-caps />
                    <q-uploader
                      :url="`${baseUrlUpload}`"
                      color="teal"
                      flat
                      bordered
                      batch
                      multiple
                      max-files="3"
                      :form-fields="[{name: 'tenantRoomEquipId' , value: room_equip.id}]"
                      style="max-width: 300px"
                    />
                  </q-card-actions>
                </div>
                <div class="col-2 row justify-end">
                  <q-btn
                    rounded
                    outline
                    color="negative"
                    icon="delete"
                    @click="deleteEquip(index)"
                  />
                </div>
                <div class="col-12"><br /></div>
              </div>
            </div>
            <div class="col-12"><br /></div>
            <div class="col-12">
              <hr />
            </div>
            <div class="col-12 row justify-end items-center">
              <q-btn
                color="orange"
                no-caps
                rounded
                icon="check"
                label="Xin xác nhận"
                @click="createEquip"
              />
            </div>
          </q-card-section>
        </q-card>
        <div><br /></div>

        <q-card
          v-if="tenant_users"
          class="my-card full-width br"
          id="tenantInfor"
        >
          <q-card-section class="full-width text-primary">
            <div class="text-center co-card-header">
              <q-icon name="people_alt" /> Người đang thuê
            </div>
          </q-card-section>
          <q-card-section class="row full-width items-center">
            <div class="col-1 text-bold">Stt</div>
            <div class="col-6 text-bold">Họ tên</div>
            <div class="col-5 text-bold">Điện thoại</div>
            <div class="col-12">
              <hr />
            </div>
            <div class="col-12"><br /></div>
            <div
              v-for="(tenant_user, index) in tenant_users"
              :key="index"
              class="col-12 row items-center"
            >
              <div class="col-1">{{ ++index }}</div>
              <div class="col-6">{{ tenant_user.user.email }}</div>
              <div class="col-5">
                {{ tenant_user.user.phone_number }}
              </div>
              <div class="col-12">
                <hr />
              </div>
              <div class="col-12"><br /></div>
            </div>
            <div class="col-12"><br /></div>

            <div
              class="col-12 row items-center justify-end"
              style="margin-top: 30px"
            >
              <div class="col-12"><br /></div>
              <q-btn
                color="primary"
                icon="add"
                label=" Đăng bài tìm người"
                no-caps
                rounded
                @click="isCreate = true"
              />
            </div>
          </q-card-section>
        </q-card>
        <div><br /></div>

        <q-card v-if="posts" class="my-card full-width br" id="postsInfor">
          <q-card-section class="full-width text-primary">
            <div class="text-center co-card-header">
              <q-icon name="badge" /> Danh sách Bài đăng
            </div>
          </q-card-section>
          <q-card-section class="row items-center">
            <div class="col-1 text-bold">Stt</div>
            <div class="col-6 text-bold text-center">Trạng thái</div>
            <div class="col-5 text-bold"></div>
            <div class="col-12"><hr /></div>
          </q-card-section>
          <q-card-section class="row full-width items-center">
            <div
              v-for="(post, index) in posts"
              :key="index"
              class="col-12 row items-center"
            >
              <div class="col-1">{{ index + 1 }}</div>
              <div class="col-6 text-center">{{ check(post.status) }}</div>
              <div class="col-5 row justify-around">
                <q-btn
                  rounded
                  outline
                  color="negative"
                  icon="delete"
                  @click="deletePost(post.id, index)"
                />
                <q-btn
                  rounded
                  outline
                  class="text-black"
                  color="warning"
                  icon="autorenew"
                  @click="changeStatus(post.id, index)"
                />
                <q-btn
                  rounded
                  outline
                  color="primary"
                  icon="visibility"
                  @click="$router.push('/searchDetail/' + post.id)"
                />
              </div>
              <div class="col-12">
                <hr />
              </div>
              <div class="col-12"><br /></div>
            </div>
          </q-card-section>
        </q-card>
        <div><br /></div>

        <q-card v-if="infoShare" class="my-card full-width br" id="shareInfor">
          <q-card-section class="full-width text-primary">
            <div class="text-center co-card-header">
              <q-icon name="share" /> Chia sẽ thông tin
            </div>
          </q-card-section>
          <q-card-section class="text-red">
            * Những người trong trọ sẻ thấy các thông tin : tên , số điện thoại
          </q-card-section>
          <q-card-section class="row full-width items-center">
            <div class="col-12"><br /></div>
            <div class="col-6 text-center">
              Trạng thái :
              {{ infoShare.infor_share == 0 ? " Đang tắt" : " Đang chia sẽ" }}
            </div>
            <div class="col-5 row justify-around">
              <q-btn
                outline
                rounded
                color="warning"
                icon="autorenew"
                @click="changeInfoShare"
              />
            </div>
            <div class="col-12">
              <hr />
            </div>
            <div class="col-12"><br /></div>
          </q-card-section>
        </q-card>

        <div><br /></div>
        <q-card class="my-card br full-width" id="numInfor">
          <q-card-section class="row items-center text-primary">
            <div class="co-card-header col-12 text-center">
              <q-icon name="dialpad" /> Nhập số điện nước khi vào trọ
            </div>
          </q-card-section>
          <q-card-section v-if="num_status == 0" class="text-left text-red">
            *Chủ trọ chưa xác nhận số liệu
          </q-card-section>
          <q-card-section v-else class="text-left text-blue">
            *Chủ trọ đã xác nhận số liệu
          </q-card-section>
          <q-card-section class="row items-center justify-center">
            <div class="col-md-4 col-5 row items-center justify-center">
              <q-input
                class="col-11"
                v-model="elec_num"
                type="text"
                label=" Nhập số điện"
              />
            </div>
            <div class="col-md-4 col-5 row items-center justify-center">
              <q-input
                class="col-11"
                v-model="water_num"
                type="text"
                label=" Nhập số nước "
              />
            </div>
            <div class="col-md-4 col-2 row items-center justify-center">
              <q-btn
                color="orange"
                icon="check"
                rounded
                no-caps
                @click="confirmNum"
              >
                <div class="gt-sm">Xin xác nhận</div>
              </q-btn>
            </div>
          </q-card-section>
        </q-card>
        <div><br /></div>

        <div class="col-12 row justify-center full-width">
          <q-btn
            color="negative"
            icon="logout"
            label=" rời phòng trọ"
            @click="isOut = true"
          />
        </div>
        <div><br /></div>
        <q-dialog v-model="isCreate">
          <q-card>
            <q-card-section class="row items-center">
              <div class="col-12 text-center text-bold">
                Thiết lập nội dung khi đăng bài
              </div>
              <div class="col-12 text-center text-red">
                *Bài đăng sẽ sử dụng các thông tin có sẳng từ trọ và một vài
                thông tin cá nhân
              </div>
            </q-card-section>
            <q-card-section>
              <div>Thiết lập nội dung đăng bài</div>
              <q-input v-model="content" type="textarea" outlined />
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat label=" Hủy" color="negative" v-close-popup />
              <q-btn flat label=" Đăng bài " color="primary" @click="post" />
            </q-card-actions>
            <div class="lt-sm" style="height: 30vh"></div>
          </q-card>
        </q-dialog>
        <q-dialog v-model="isOut" persistent>
          <q-card>
            <q-card-section class="row items-center bg-warning text-white">
              <div class="col-12 text-h6 text-center">Cảnh báo</div>
            </q-card-section>
            <q-card-section>
              Bạn chắc là sẽ rời phòng trọ này không?
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat no-caps label=" thoát " v-close-popup />
              <q-btn
                flat
                label="Rời trọ"
                color="negative"
                @click="outRoom()"
                v-close-popup
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
import { useQuasar } from "quasar";
import sp from '../boot/support';
export default {
  setup() {
    const $q = useQuasar();

    function showNoti(mess, col) {
      $q.notify({
        color: col,
        message: mess,
        position: "top",
        timeout: 3000,
      });
    }
    return {
      showNoti,
    };
  },
  computed: {
    ...mapGetters("User", ["user"]),
    ...mapGetters("Tenant", ["tenant"]),
    ...mapGetters("RoomTypeUser", ["roomTypeUser"]),
  },
  methods: {
    getDate(date) {
      return date.substring(0, 10);
    },
    toNum(num) {
      return sp.toNum(num);
    },
    addRowEquip() {
      this.room_equips.push({ id: "", tenant_id: "", name: "", content: "" });
      this.room_equips_num += 1;
    },
    async deleteEquip(index) {
      let indexId = this.room_equips[index].id;
      console.log(indexId);
      if (indexId === "") {
        this.room_equips.splice(index, 1);
        this.room_equips_num--;
      } else {
        const deleteEquip = await this.$api.post("deleteTenantRoomEquip", {
          equip_id: indexId,
        });
        if (deleteEquip.data.statusCode == 1) {
          this.room_equips.splice(index, 1);
          this.showNoti("Thành công", "negative");
          this.room_equips_num--;
          this.eq_status = 0;
        }
      }
    },
    async createEquip() {
      console.log(this.room_equips);
      const res = await this.$api.post("createTenantRoomEquips", {
        equips: this.room_equips,
        equip_num: this.room_equips_num,
      });
      if (res.data.statusCode == 1) {
        this.showNoti(" Thành công", "positive");
        const equips = await this.$api.get("getTenantRoomEquips");
        this.room_equips_num = equips.data.equip_num;
        this.room_equips = equips.data.equips;
      }
    },
    async confirmNum() {
      const confirmNum = await this.$api.post("updateNumRoom", {
        water_num: this.water_num,
        elec_num: this.elec_num,
      });
      if (confirmNum.data.statusCode == 1) {
        this.showNoti("Thành công , đợi xác nhận", "positive");
      }
    },
    async post() {
      const post = await this.$api.post("createPostUser", {
        content: this.content,
      });
      if (post.data.statusCode == 1) {
        this.isCreate = false;
        this.showNoti("Thành công", "positive");
        this.posts.push(post.data.posts);
      } else {
        this.showNoti(" Bạn đã có bài đăng rồi !", "negative");
      }
    },
    check(status) {
      if (status == 1) return " Đang mở";
      if (status == 0) return " Đang đống";
    },
    async deletePost(post_id, index) {
      const del = await this.$api.post("deleteConpound", {
        post_id: post_id,
      });
      if (del.data.statusCode == 1) {
        this.posts.splice(index, 1);
        this.showNoti("Xóa thành công ", "postitive");
      } else {
        this.showNoti("Xóa thất bại ", "negative");
      }
    },
    async changeStatus(post_id, index) {
      const del = await this.$api.post("changeStatusConpound", {
        post_id: post_id,
      });
      if (del.data.statusCode == 1) {
        this.posts[index].status = this.posts[index].status == 1 ? 0 : 1;
        this.showNoti("Thay đổi thành công ", "postitive");
      } else {
        this.showNoti(" Thất bại ", "negative");
      }
    },
    async changeInfoShare() {
      const change = await this.$api.get(
        "changeInfoShare/" + this.infoShare.id
      );
      if (change.data.statusCode == 1) {
        this.infoShare.infor_share = this.infoShare.infor_share == 1 ? 0 : 1;
        this.showNoti("Thay đổi thành công ", "postitive");
      } else {
        this.showNoti(" Thất bại ", "negative");
      }
    },
    async outRoom() {
      const out = await this.$api.post("outRoom");
      if (out.data?.statusCode == 1) {
        this.showNoti("Rời trọ thành công ", "positive");
        this.$router.push("/");
      } else {
        this.showNoti(
          " Bạn không thể tự rời trọ khi chưa thanh toán toàn bộ hóa đơn!  ",
          "negative"
        );
      }
    },
    goto(id) {
      const ele = document.getElementById(id);
      var top = ele.offsetTop;
      window.scrollTo({ top: top, behavior: "smooth" });
    },
  },
  data() {
    return {
      elec_num: null,
      water_num: null,
      num_status: null,
      room_equips: null,
      room_equips_num: 0,
      eq_status: null,
      tenant_users: null,
      content: "",
      isCreate: false,
      posts: null,
      infoShare: null,
      isOut: false,
      drawLeft: false,
      baseUrlUpload: this.$api.defaults.baseURL+ '/uploadImgTenantRoomEquip/',
    };
  },
  async created() {
    const equips = await this.$api.get("getTenantRoomEquips");
    this.room_equips_num = equips.data.equip_num;
    this.room_equips = equips.data.equips;
    const numRoom = await this.$api.get("getNumRoom");
    this.water_num = numRoom.data.water_num;
    this.elec_num = numRoom.data.elec_num;
    this.num_status = numRoom.data.num_status;
    this.eq_status = numRoom.data.eq_status;
    const tenantUsers = await this.$api.get("getTenantUsers/" + this.tenant.id);
    if (tenantUsers.data.statusCode == 1) {
      this.tenant_users = tenantUsers.data.tenantUsers;
    }
    const posts = await this.$api.get("getPostConpound");
    if (posts.data.statusCode == 1) {
      this.posts = posts.data.posts;
    }
    const infoShare = await this.$api.get("getInfoShare");
    if (infoShare.data.statusCode == 1) {
      this.infoShare = infoShare.data.tenant_user;
    }
  },
};
</script>

<style lang="sass" scoped>
.br
  border-radius: 5px
.req
  margin: 5px

.co-card-header
  font-weight: 500
  letter-spacing: 2px
  font-size: 20px
</style>
