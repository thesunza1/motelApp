<template>
  <q-page padding>
    <div v-if="motels">
      <div class="full-width">
        <q-card-section class="row items-center">
          <div class="col-6 row items-center justify-around">
            <div class="text-bold">Tìm trọ:</div>
            <q-input
              v-model="email"
              type="text"
              label="Email chủ trọ"
              label-color="primary"
            />
            <q-btn
              color="primary"
              icon="search"
              label=" Tìm"
              @click="searchMotel()"
            />
          </div>
        </q-card-section>
        <q-card-actions v-if="thisMotel.length == 1" align="right">
          <q-btn color="primary" icon="question_answer">
            <router-link
              :to="{ name: 'adminThisMotel', params: { motelId: thisMotel[0].id } }"
              style="text-decoration: none; color: white"
            >
               Đi tới
            </router-link>
          </q-btn>
        </q-card-actions>
        <q-card-section v-if="thisMotel.length == 1">
          <div>
            Id : <b>{{ thisMotel[0].id }}</b
            >- Email: <b>{{ thisMotel[0].user.email }}</b
            >- Điện thoại: <b>{{ thisMotel[0].user.phone_number }}</b> - Tên trọ
            : <b> {{ thisMotel[0].name }} </b>
          </div>
        </q-card-section>
      </div>
      <q-table
        class="my-header-table"
        title=" Danh sách trọ"
        :rows="motels"
        :columns="columns"
        row-key="name"
        selection="single"
        v-model:selected="thisMotel"
        :pagination="pagination"
      />
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
          <q-input
            class="col-8"
            v-model="thisMotel[0].name"
            type="text"
            label=" Họ Tên"
            label-color="primary"
          />
          <div class="col-12 row justify-around items-center mr">
            <q-input
              v-model="thisMotel[0].email"
              type="text"
              label=" Email"
              label-color="primary"
            />
            <q-input
              v-model="password"
              type="text"
              label=" Đổi mật khẩu"
              label-color="primary"
            />
          </div>
          <div class="col-12 row justify-around items-center mr">
            <q-input
              v-model="thisMotel[0].phone_number"
              type="text"
              label-color="primary"
              label=" Điện thoại"
            />
            <q-input v-model="thisMotel[0].birth_date" color="primary">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-date v-model="thisMotel[0].birth_date">
                  <div class="row items-center justify-end q-gutter-sm">
                    <q-btn label=" Thoát" class="g-header" color="primary" flat v-close-popup />
                    <q-btn label=" Chọn" class="g-header" color="primary" flat v-close-popup />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-input>
          </div>
          <div class="col-12 row justify-around items-center mr">
            <q-input
              v-model="thisMotel[0].job"
              type="text"
              label=" Nghề nghiệp"
              label-color="primary"
            />
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn class="g-header" label=" Thoát" color="primary" v-close-popup />
          <q-btn  class="g-header" label=" Thay đổi" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="isDelete" persistent>
      <q-card style="min-width: 80%">
        <q-card-section
          class="row items-center justify-center text-white text-h6 bg-negative"
        >
          <div>Xóa người dùng</div>
        </q-card-section>
        <q-card-section>
          <div>Bạn có muốn xóa tài khoảng vĩnh viễn ?</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label=" Thoát"  class="g-header" color="negative" v-close-popup />
          <q-btn label=" Xác nhận"  class="g-header" color="primary" v-close-popup />
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
import { ref } from "vue";
import { mapGetters } from "vuex";
import adminMotel from "../boot/callApi/adminMotel";
export default {
  setup() {
    const $q = useQuasar();
    const numPage = ref(1);
    function showNoti(mess, col) {
      $q.notify({
        message: mess,
        color: col,
        position: "top",
        timeout: 3000,
      });
    }
    function toDate(date) {
      return date.slice(0, 10);
    }
    function noti(statusCode) {
      if (statusCode == 1) {
        this.showNoti("thành công", "primary");
      } else if (statusCode == 2) {
        this.showNoti(" Không tìm thấy trọ", "dark");
      } else {
        this.showNoti(" thất bại", "negative");
      }
    }
    return {
      showNoti,
      numPage,
      noti,
      toDate,
    };
  },
  async created() {
    const res = await adminMotel.getAllMotel();
    if (res?.statusCode) {
      this.maxPage = res.motels.last_page;
      this.motels = res.motels.data;
    }
  },
  data() {
    return {
      motels: null,
      thisMotel: [],
      maxPage: 1,
      columns: [
        {
          name: "name",
          label: " Tên trọ",
          field: "name",
          sortable: true,
          align: "left",
        },
        {
          name: "address",
          label: " Địa chỉ",
          field: "address",
          align: "left",
        },
        {
          name: "created_at",
          label: " Ngày tạo",
          field: "created_at",
          format: (val) => this.toDate(val),
          align: "left",
        },
        {
          name: "email",
          label: "Email",
          field: (row) => row.user.email,
          align: "left",
        },
        {
          name: "name",
          label: " Tên chủ",
          field: (row) => row.user.name,
          align: "left",
        },
      ],
      pagination: {
        rowsPerPage: 10,
      },
      email: null,
      motelId: null,
    };
  },

  methods: {
    async loadpage(num_page) {
      const res = await this.$api.get("getAllMotel?page=" + num_page);
      if (res.data?.statusCode == 1) {
        this.motels = res.data?.motels.data;
        this.maxPage = res.data?.motels.last_page;
      }
      return;
    },
    async searchMotel() {
      const res = await adminMotel.findMotel(this.email);
      if (res.statusCode == 1) {
        this.thisMotel = [res.motel];
      }
      this.noti(res.statusCode);
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
};
</script>

<style lang="sass" >
.mr
  margin-top: 10px
.my-header-table
  .q-table__top,
  .q-table__bottom,
  thead tr:first-child
    background-color: $blue-2 !important
</style>
