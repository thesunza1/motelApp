<template>
  <q-page padding>
    <div v-if="users">
      <div class="full-width">
        <q-card-section class="row items-center">
          <div class="col-6 row items-center">
          </div>
        </q-card-section>
        <q-card-actions v-if="thisUser.length == 1" align="right">
          <q-btn
            color="black"
            icon="update"
            rounded
            label="Cập nhật"
            class="g-header"
            @click="isUpdate = true"
          />
          <!-- <q-btn
            color="black"
            rounded
            class="g-header"
            icon="delete"
            label="Xóa"
            @click="isDelete = true"
          /> -->
          <q-btn
            color="black"
            icon="question_answer"
            rounded
            class="g-header"
            label="Thông báo"
            @click="isCreate = true"
          />
        </q-card-actions>
      </div>
      <q-table
        class="my-header-table g-border"
        :rows="users"
        :columns="columns"
        row-key="name"
        selection="single"
        v-model:selected="thisUser"
        :pagination="pagination"
      >
        <template v-slot:top class="row items-center">
          <div class="text-h6 text-positive col-12">
            <q-icon name="list" class="g-icon-h1 q-pb-sm" />
            Danh sách người dùng:
          </div>
          <div class="col-12 row items-center justify-end">
            <q-input
              v-model="email"
              outlined
              dense
              type="text"
              label=" Nhập email"
              label-color="primary"
              class="q-mr-lg"
            />
            <q-btn
              color="black g-header"
              icon="search"
              rounded
              label="Tìm"
              @click="findUser()"
            />
          </div>
        </template>
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>
        <template v-slot:body="props">
          <q-tr
            class="cursor-pointer"
            :props="props"
            @click="props.selected = !props.selected"
          >
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.value }}
            </q-td>
          </q-tr>
        </template>
      </q-table>

      <q-footer
        class="q-py-md bg-white row items-center justify-center full-width"
        elevated
      >
        <div>
          <q-pagination
            v-model="numPage"
            :max="maxPage"
            color="accent"
            direction-links
            bounadary-links
          />
        </div>
      </q-footer>
    </div>

    <q-dialog v-model="isUpdate">
      <q-card style="min-width: 60%">
        <q-card-section class="text-center text-white text-h6 bg-positive">
          <div>Cập nhật người dùng</div>
        </q-card-section>
        <q-card-section class="row justify-center items-center">
          <div class="col-12 row">
            <q-input
              class="col-6"
              v-model="thisUser[0].name"
              type="text"
              label=" Họ Tên"
              label-color="primary"
            />
            <div class="col-1"></div>
            <q-input
              v-model="thisUser[0].email"
              type="text"
              class="col-5"
              label=" Email"
              label-color="primary"
            />
          </div>
          <div class="col-12 row items-center">
            <q-input
              v-model="password"
              class="col-6"
              type="text"
              label=" Đổi mật khẩu"
              label-color="primary"
            />
            <div class="col-1"></div>
            <q-input
              v-model="thisUser[0].phone_number"
              type="text"
              class="col-5"
              label-color="primary"
              label=" Điện thoại"
            />
          </div>
          <div class="col-12 row items-center">
            <!-- <q-input v-model="thisUser[0].birth_date" label="Ngày sinh" color="primary">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-date v-model="thisUser[0].birth_date">
                  <div class="row items-center justify-end q-gutter-sm">
                    <q-btn
                      label=" Hủy"
                      class="g-header"
                      color="primary"
                      flat
                      v-close-popup
                    />
                    <q-btn
                      label=" Chọn"
                      class="g-header"
                      color="primary"
                      flat
                      v-close-popup
                    />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-input> -->
          </div>
          <div class="col-12 row">
            <q-input
              v-model="thisUser[0].job"
              type="text"
              label=" Nghề nghiệp"
              label-color="primary"
            />
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Thoát" class="g-header" color="black" v-close-popup />
          <q-btn
            label="Thay đổi"
            color="black"
            no-caps
            v-close-popup
            @click="updateUser()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="isDelete" persistent>
      <q-card style="min-width: 50%">
        <q-card-section
          class="row items-center justify-center text-white text-h6 bg-negative"
        >
          <div>Xóa người dùng</div>
        </q-card-section>
        <q-card-section>
          <div>Bạn có muốn xóa tài khoản vĩnh viễn ?</div>
          <div>Mọi thông tin, và trọ hiện tại sẽ bị xóa.</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label=" Thoát" class="g-header" color="black" v-close-popup />
          <q-btn
            label=" Xác nhận"
            color="black"
            v-close-popup
            class="g-header"
            @click="deleteUser()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="isCreate">
      <admin-noti-create></admin-noti-create>
    </q-dialog>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import userApi from "../boot/callApi/adminUser";
import user from "../boot/callApi/user";
import { ref } from "vue";
import { mapGetters } from "vuex";
import AdminNotiCreate from "../components/AdminNotiCreate.vue";
import dt from "../boot/noti/date";
export default {
  setup() {
    const $q = useQuasar();
    const isDelete = ref(false);
    const isUpdate = ref(false);
    const isCreate = ref(false);
    const numPage = ref(1);
    function showNoti(mess, col) {
      $q.notify({
        message: mess,
        color: col,
        position: "top",
        timeout: 3000,
      });
    }
    /**
     * have_room to string
     * sex to string
     * @param {string} key
     * @param {int} val 0, 1
     * @returns {string}
     */
    function boolNumToString(key, val) {
      if (key == "sex") {
        return val == 0 ? "Nam" : " Nữ";
      }
      if (key == "have_room") {
        return val == 0 ? " Chưa vào" : " Đã vào";
      }
    }
    function noti(statusCode) {
      if (statusCode == 1) {
        this.showNoti("thành công", "positive");
      }
      if (statusCode == 2) {
        this.showNoti(" Không tìm thấy user", "dark");
      }
      if (statusCode == 0) {
        this.showNoti(" thất bại", "negative");
      }
    }
    return {
      isDelete,
      isUpdate,
      isCreate,
      showNoti,
      boolNumToString,
      numPage,
      noti,
    };
  },
  async created() {
    const res = await userApi.getAllUser();
    if (res?.statusCode) {
      this.maxPage = res.users.last_page;
      this.users = res.users.data;
    }
  },
  data() {
    return {
      users: null,
      thisUser: [],
      maxPage: 1,
      columns: [
        {
          name: "name",
          label: " Tên",
          field: "name",
          align: "left",
          classes: "g-header-up",
          sortable: true,
        },
        {
          name: "email",
          label: "Email",
          field: "email",
          align: "left",
          sortable: true,
        },
        {
          name: "phone_number",
          label: "Số Điện thoại",
          field: "phone_number",
          align: "left",
        },
        {
          name: "birth_date",
          label: " Ngày sinh",
          field: "birth_date",
          align: "left",
          format: (val) => this.toDate(val),
        },
        {
          name: "sex",
          label: " Giới tính",
          field: "sex",
          align: "left",
          format: (val) => this.boolNumToString("sex", val),
        },
        {
          name: "have_room",
          label: " Phòng",
          field: "have_room",
          align: "left",
          sortable: true,
          format: (val) => this.boolNumToString("have_room", val),
        },
      ],
      pagination: {
        rowsPerPage: 11,
      },
      password: null,
      email: null,
    };
  },

  methods: {
    async updateUser() {
      const res = await userApi.updateUser(this.thisUser[0], this.password);
      this.noti(res?.statusCode);
      this.updateUsers();
    },
    toDate(date) {
      return dt.toDate(date);
    },
    async deleteUser() {
      const res = await userApi.deleteUser(this.thisUser[0].id);
      this.noti(res?.statusCode);
      this.updateUsers();
    },
    async updateUsers() {
      const res = await userApi.getAllUser();
      if (res?.statusCode) {
        this.maxPage = res.users.last_page;
        this.users = res.users.data;
      }
      this.numPage = 1;
      return;
    },
    async findUser() {
      if (this.email == null) {
        this.email = " ";
      }
      const res = await user.findUser(this.email);
      if (res) {
        this.thisUser = res ? res : [];
        // console.log(this.thisUser[0].email) ;
        const check = this.users.find((o) => o.email == this.thisUser[0].email);
        console.log(check);
        if (!check) {
          this.users.splice(0, 0, res[0]);
        }
        this.noti(1);
      } else {
        this.noti(2);
      }
      // this.noti(res ? 1 : 2);
    },
    async loadpage(num_page) {
      const res = await this.$api.get("getAllUser?page=" + num_page);
      if (res.data?.statusCode == 1) {
        this.users = res.data?.users.data;
        this.maxPage = res.data?.user.last_page;
      }
      return;
    },
  },
  watch: {
    numPage(newVal) {
      this.loadpage(newVal);
    },
  },
  computed: {
    ...mapGetters("User", ["user"]),
  },
  components: {
    AdminNotiCreate,
  },
};
</script>

<style scoped lang="sass">
.mr
  margin-top: 10px
.my-header-table
  .q-table__top,
  .q-table__bottom,
  thead tr:first-child
    background-color: white !important
    color: blue
    font-weight: bold
</style>
