<template>
  <q-page padding>
    <div v-if="users">
      <div class="full-width">
      <q-card-actions v-if="thisUser.length ==1" align="right">
        <q-btn color="warning" icon="update" label="Cập nhật" @click="isUpdate = true"/>
        <q-btn color="negative" icon="delete"  label="Xóa"  @click="isDelete = true"/>
        <!-- <q-btn color="warning" icon="update" /> -->
      </q-card-actions>
      <q-card-section v-if="thisUser.length ==1" >
        <div>id : <b>{{thisUser[0].id}}</b>- email:  <b>{{thisUser[0].email  }}</b>- điện thoại: <b>{{thisUser[0].phone_number}}</b></div>
      </q-card-section>
      </div>
      <q-table
        title=" Danh sách người dùng"
        :rows="users"
        :columns="columns"
        row-key="name"
        selection="single"
        v-model:selected="thisUser"
        :pagination="pagination"
      />
    </div>
    <q-dialog v-model="isUpdate">
      <q-card style="min-width:60%">
        <q-card-section class="text-center text-white text-h6 bg-positive">
          <div> Cập nhật người dùng</div>
        </q-card-section>
        <q-card-section class="row justify-center items-center">
          <q-input class="col-8" v-model="thisUser[0].name" type="text"  label=" Họ Tên" />
          <div class="col-12 row justify-center items-center">
            <q-input v-model="thisUser[0].email" type="text" label=" email" />
            <q-input v-model="password" type="text" label=" đổi mật khẩu" />
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label=" Thoát" color="primary" v-close-popup />
          <q-btn  label=" Thay đổi" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="isDelete" persistent>
      <q-card style="min-width:80%">
        <q-card-section class="row items-center">
          <div> Xóa người dùng</div>
        </q-card-section>
        <q-card-section>
          <div>Bạn có muốn xóa tài khoảng vĩnh viễn ? </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label=" Thoát" color="negative" v-close-popup />
          <q-btn  label=" Xác nhận" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import userApi from "../boot/callApi/adminUser";
import { ref } from "vue";
export default {
  setup() {
    const $q = useQuasar();
    const isDelete = ref(false);
    const isUpdate = ref(false);
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
        return val == 0 ? "nam" : " nữ";
      }
      if (key == "have_room") {
        return val == 0 ? " chưa có" : "đã có";
      }
    }

    return {
      isDelete,
      isUpdate,
      showNoti,
      boolNumToString,
      numPage,
    };
  },
  data() {
    var columns = [
      { name: "id", label: "id", field: "id", align: "center" },
      { name: "name", label: " tên", field: "name", align: "center" },
      { name: "email", label: "email", field: "email", align: "center" },
      {
        name: "sex",
        label: " giới tính",
        field: "sex",
        align: "center",
        format: (val) => this.boolNumToString("sex", val),
      },
      {
        name: "have_room",
        label: " phòng",
        field: "have_room",
        align: "center",
        sortable: true,
        format: (val) => this.boolNumToString("have_room", val),
      },
    ];
    var pagination = {
      rowsPerPage:10,
    }
    return {
      users: null,
      thisUser: [],
      maxPage: 1,
      columns,
      pagination,
    };
  },
  async created() {
    const res = await userApi.getAllUser();
    if (res?.statusCode) {
      this.maxPage = res.users.last_page;
      this.users = res.users.data;
      console.table(this.users);
    } else {
      console.log("kkk");
    }
    console.log("alskdjf");
  },
};
</script>

<style>
</style>
