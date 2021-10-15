<template>
  <q-page padding>
    <div class="row full-width items-center justify-center">
      <div v-if="user && tenant && roomTypeUser" class="col-12 col-md-8">
        <q-card class="my-card full-width br">
          <q-card-section class="row items-center text-primary">
            <div class="col-12 text-center co-card-header"> <q-icon name="home" /> phòng</div>
          </q-card-section>
          <q-card-section class="row items-center">
            <div class="col-md-3 col-6 text-left">
              phòng : {{ tenant.room.name }}
            </div>
            <div class="col-md-3 col-6 text-center">
              loại : {{ roomTypeUser.name }}
            </div>
            <div class="lt-sm col-12"><br /></div>
            <div class="col-md-3 col-6 text-left">
              ngày vào : {{ getDate(tenant.in_date) }}
            </div>
            <div class="col-md-3 col-6 text-center">
              ngày ra : {{ tenant.out_date }}
            </div>
            <div class="col-12"><br /></div>
          </q-card-section>
        </q-card>
        <div><br /></div>

        <q-card class="my-card full-width br">
          <q-card-section class="row items-center  text-primary">

            <div class="col-12  co-card-header text-center"> <q-icon name="paid" /> chi phí</div>
          </q-card-section>
          <q-card-section class="row items-center">
            <div class="col-md-3 col-6 text-left">
              phòng: {{ roomTypeUser.cost }}vnd
            </div>
            <div class="col-md-3 col-6 text-center">
              người : {{ roomTypeUser.motel.people_cost }}vnd
            </div>
            <div class="lt-sm col-12"><br /></div>
            <div class="col-md-3 col-6 text-left">
              điện: {{ roomTypeUser.motel.elec_cost }}vnd
            </div>
            <div class="col-md-3 col-6 text-center">
              nước : {{ roomTypeUser.motel.water_cost }}vnd
            </div>
            <div class="col-12"><br /></div>
          </q-card-section>
        </q-card>
        <div><br /></div>

        <q-card class="my-card br full-width">
          <q-card-section class="row items-center text-primary">
            <div class="co-card-header col-12 text-center">
              nhập số điện nước khi vào trọ
            </div>
          </q-card-section>
          <q-card-section v-if="num_status == 0" class="text-left text-red">
            *chủ trọ chưa xác nhận số liệu
          </q-card-section>
          <q-card-section v-else class="text-left text-blue">
            *chủ trọ đã xác nhận số liệu
          </q-card-section>
          <q-card-section class="row items-center justify-center">
            <div class="col-md-4 col-6 row items-center">
              <q-input
                class="col-12"
                v-model="elec_num"
                type="text"
                label=" nhập số điện"
              />
            </div>
            <div class="col-md-4 col-6 row items-center">
              <q-input
                class="col-12"
                v-model="water_num"
                type="text"
                label=" nhập số nước "
              />
            </div>
            <div class="lt-md col-12"><br /></div>
            <div class="col-md-4 col-12 row items-center justify-center">
              <q-btn
                color="orange"
                icon="check"
                label="xin xác nhận"
                @click="confirmNum"
              />
            </div>
          </q-card-section>
        </q-card>
        <div><br /></div>

        <q-card class="my-card br full-width">
          <q-card-section class="row items-center text-primary">
            <div class="co-card-header col-12 text-center">
              <q-icon name="view_agenda" /> tình trạng thiết bị phòng
            </div>
          </q-card-section>
          <q-card-section class="row items-center">
            <div class="col-9"></div>
            <q-btn
              class="col-3"
              color="positive"
              icon="add"
              @click="addRowEquip"
            />
          </q-card-section>
          <q-card-section v-if="room_equips_num == 0" class="text-red">
            *bạn chưa có thiết bị nào
          </q-card-section>
          <q-card-section v-else class="row items-center justify-center">
            <div v-if="eq_status == 0" class="col-12 text-red text-left">
              *chưa xác nhận với chủ trọ
            </div>
            <div v-else class="col-12 text-primary text-left">
              *chủ trọ đã xác nhận
            </div>
            <div class="col-12"><br /></div>
            <div class="col-md-4 col-4 text-bold text-center">tên</div>
            <div class="col-md-4 col-6 text-center">trạng thái</div>
            <div class="col-2"></div>
            <div v-if="room_equips" class="row col-md-11 col-12 items-center">
              <div
                v-for="(room_equip, index) in room_equips"
                :key="index"
                class="row col-12 items-center"
              >
                <q-input
                  class="col-5 text-center bg-purple-1 req"
                  v-model="room_equip.name"
                  type="text"
                />
                <q-input
                  class="col-6 text-center bg-purple-1 req"
                  v-model="room_equip.content"
                  type="textarea"
                  outlined
                />
                <div class="col-12 row justify-center">
                  <q-btn
                    class="col-8 col-md-2"
                    color="negative"
                    icon="delete"
                    @click="deleteEquip(index)"
                  />
                </div>
              </div>
            </div>
            <div class="col-12"><br /></div>
            <div class="col-12 row justify-end items-center">
              <q-btn
                class="col-8 col-md-3"
                color="orange"
                icon="check"
                label=" xin xác nhận"
                @click="createEquip"
              />
            </div>
          </q-card-section>
        </q-card>
        <div><br /></div>

        <q-card v-if="tenant_users" class="my-card full-width br">
          <q-card-section class="full-width text-primary">
            <div class="text-center co-card-header">người ở</div>
          </q-card-section>
          <q-card-section class="row full-width items-center">
            <div class="col-1 text-center text-bold">id</div>
            <div class="col-6 text-center text-bold">họ tên</div>
            <div class="col-5 text-center text-bold">điện thoại</div>
            <div class="col-12">
              <hr />
            </div>
            <div class="col-12"><br /></div>
            <div
              v-for="(tenant_user, index) in tenant_users"
              :key="index"
              class="col-12 row items-center"
            >
              <div class="col-1 text-center">{{ tenant_user.user.id }}</div>
              <div class="col-6 text-center">{{ tenant_user.user.email }}</div>
              <div class="col-5 text-center">
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
                class="col-10 col-md-7"
                color="primary"
                icon="add"
                label=" đăng bài tìm người"
                @click="isCreate = true"
              />
            </div>
          </q-card-section>
        </q-card>
        <div><br /></div>

        <q-card v-if="posts" class="my-card full-width br">
          <q-card-section class="full-width text-primary">
            <div class="text-center  co-card-header">bài đăng</div>
          </q-card-section>
          <q-card-section class="row full-width items-center">
            <div class="col-12"><br /></div>
            <div
              v-for="(post, index) in posts"
              :key="index"
              class="col-12 row items-center"
            >
              <div class="col-1 text-center">{{ index + 1 }}</div>
              <div class="col-6 text-center">{{ check(post.status) }}</div>
              <div class="col-5 row justify-around">
                <q-btn
                  flat
                  color="negative"
                  icon="delete"
                  @click="deletePost(post.id, index)"
                />
                <q-btn
                  flat
                  class="text-black"
                  color="warning"
                  icon="autorenew"
                  @click="changeStatus(post.id, index)"
                />
                <q-btn flat color="primary" icon="visibility"  @click="$router.push('/searchDetail/'+post.id)" />
              </div>
              <div class="col-12">
                <hr />
              </div>
              <div class="col-12"><br /></div>
            </div>
          </q-card-section>
        </q-card>
        <div><br /></div>

        <q-card v-if="infoShare" class="my-card full-width br">
          <q-card-section class="full-width text-primary">
            <div class="text-center  co-card-header">chia sẽ thông tin</div>
          </q-card-section>
          <q-card-section class="text-red">
            * những người trong trọ sẻ thấy các thông tin : tên , số điện thoại
          </q-card-section>
          <q-card-section class="row full-width items-center">
            <div class="col-12"><br /></div>
            <div class="col-6 text-center">
              trạng thái :
              {{ infoShare.infor_share == 0 ? "đang đóng" : "đang mở" }}
            </div>
            <div class="col-5 row justify-around">
              <q-btn

                flat
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
        <div class="col-12 row justify-center full-width">
          <q-btn
            class="col-10"
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
                thiết lập nội dung khi đăng bài
              </div>
              <div class="col-12 text-center text-red">
                *bài đăng sẽ sử dụng các thông tin có sẳng từ trọ và một vài
                thông tin cá nhân
              </div>
            </q-card-section>
            <q-card-section>
              <div>thiết lập nội dung đăng bài</div>
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
              <div class="col-12 text-h6 text-center">cảnh báo</div>
            </q-card-section>
            <q-card-section>
              Bạn chắc là sẽ rời phòng trọ này không
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat label=" thoát " v-close-popup />
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
          this.showNoti("thành công", "negative");
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
        this.showNoti("thanh cong ", "positive");
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
        this.showNoti("thành công , đợi xác nhận", "positive");
      }
    },
    async post() {
      const post = await this.$api.post("createPostUser", {
        content: this.content,
      });
      if (post.data.statusCode == 1) {
        this.isCreate = false;
        this.showNoti("thành công", "positive");
        this.posts.push(post.data.posts);
      } else {
        this.showNoti(" bạn đã có bài đăng rồi !", "negative");
      }
    },
    check(status) {
      if (status == 1) return "đang mở";
      if (status == 0) return "đang đống";
    },
    async deletePost(post_id, index) {
      const del = await this.$api.post("deleteConpound", {
        post_id: post_id,
      });
      if (del.data.statusCode == 1) {
        this.posts.splice(index, 1);
        this.showNoti("xóa thành công ", "postitive");
      } else {
        this.showNoti("xóa thất bại ", "negative");
      }
    },
    async changeStatus(post_id, index) {
      const del = await this.$api.post("changeStatusConpound", {
        post_id: post_id,
      });
      if (del.data.statusCode == 1) {
        this.posts[index].status = this.posts[index].status == 1 ? 0 : 1;
        this.showNoti("thay đổi thành công ", "postitive");
      } else {
        this.showNoti(" thất bại ", "negative");
      }
    },
    async changeInfoShare() {
      const change = await this.$api.get(
        "changeInfoShare/" + this.infoShare.id
      );
      if (change.data.statusCode == 1) {
        this.infoShare.infor_share = this.infoShare.infor_share == 1 ? 0 : 1;
        this.showNoti("thay đổi thành công ", "postitive");
      } else {
        this.showNoti(" thất bại ", "negative");
      }
    },
    async outRoom() {
      const out = await this.$api.post("outRoom");
      if (out.data?.statusCode == 1) {
        this.showNoti("rời trọ thành công ", "positive");
        this.$router.push("/");
      } else {
        this.showNoti(" lỗi do còn bill chưa trả  ", "negative");
      }
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
