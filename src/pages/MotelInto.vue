<template>
  <q-page padding class="row items-start justify-center content-start">
    <div class="col-11 row items-center" v-if="notis">
      <q-table
        :rows="notis"
        :columns="columns"
        class="g-border full-width"
        title-class=" text-h6 text-primary"
        row-key="index"
        selection="single"
        v-model:selected="thisNotis"
        :pagination="pagination"
      >
        <template v-slot:top class="row items-center">
          <div class="col-12 text-left text-h6 text-bold text-primary">
            Danh Sách Người Xin Vào
          </div>
          <div
            class="col-12 row justify-end q-gutter-sm"
          >
            <q-btn
              no-caps
              :disable="thisNotis[0]?.id == null"
              color="red"
              icon="remove"
              label=" Từ chối"
              rounded
              @click="onClick"
            />
            <q-btn
              no-caps
              color="green"
              icon="check"
              :disable="thisNotis[0]?.id == null"
              label=" Chấp nhận"
              rounded
              @click="onClick"
            />
          </div>
        </template>
        <template v-slot:body="props">
          <q-tr
            class="cursor-pointer"
            :props="props"
            @click="props.selected = !props.selected"
          >
            <q-td></q-td>
            <q-td key="index" :props="props">
              <q-badge class="text-h6" color="primary" text-color="white" :label="props.row.index" />
            </q-td>
            <q-td key="title" :props="props">
              <div v-html="props.row.title"></div>
            </q-td>
            <q-td key="content" :props="props">
              <div v-html="props.row.content"></div>
            </q-td>
            <q-td key="senderName" :props="props">
              <div
                class="g-header-up text-bold"
                v-html="props.row.sender_user.name"
              ></div>
            </q-td>
            <q-td key="birth_date" :props="props">
              <div v-html="toDate(props.row.sender_user.birth_date)"></div>
            </q-td>
            <q-td key="senderEmail" :props="props">
              <div class="text-bold" v-html="props.row.sender_user.email"></div>
            </q-td>
            <q-td key="senderAddress" :props="props">
              <div
                class="g-first-up"
                v-html="props.row.sender_user.address"
              ></div>
            </q-td>
            <q-td key="senderJob" :props="props">
              <div class="g-first-up" v-html="props.row.sender_user.job"></div>
            </q-td>
            <q-td key="created_at" :props="props">
              <div
                class="text-bold"
                v-html="toDate(props.row.created_at)"
              ></div>
            </q-td>
            <q-td key="invite_status" :props="props">
              <q-badge
                class="text-subtitle2"
                :color="toIntoNotiStatusColor(props.row.invite_status)"
                text-color="white"
              >
                <div v-html="toIntoNotiStatus(props.row.invite_status)"></div>
              </q-badge>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";
import notiApi from "../boot/callApi/noti";
import notiSp from "../boot/noti/noti";
import dateSp from "../boot/noti/date";
export default {
  setup() {
    const thisNotis = ref([]);
    const thisTitle = ref(null);
    const thisContent = ref(null);
    //popup
    const isAccept = ref(false);
    const isReject = ref(false);
    //pagination table
    const pagination = ref({ rowsPerPage: 10 });
    //column table
    const columns = [
      {
        name: "index",
        label: "#",
        field: "index",
        align: "right",
        sortable: true,
      },
      {
        name: "title",
        label: "Tiêu đề",
        align: "left",
        field: "title",
        sortable: true,
      },
      {
        name: "content",
        field: "content",
        align: "left",
        label: "Nội dung",
      },
      {
        name: "senderName",
        field: (row) => row.sender_user.name,
        label: " Tên",
        align: "left",
        sortable: true,
      },
      {
        name: "birth_date",
        field: (row) => row.sender_user.birth_date,
        align: "right",
        label: " Ngày sinh",
        sortable: true,
      },
      {
        name: "senderEmail",
        field: (row) => row.sender_user.email,
        align: "left",
        label: "Email ",
        sortable: true,
      },

      {
        name: "senderAddress",
        field: (row) => row.sender_user.address,
        align: "left",
        label: " Địa chỉ nhà ",
        sortable: true,
      },
      {
        name: "senderJob",
        field: (row) => row.sender_user.job,
        align: "left",
        label: " Nghề nghiệp",
        sortable: true,
      },
      {
        name: "created_at",
        field: "created_at",
        align: "right",
        label: " Ngày gửi",
        sortable: true,
      },
      {
        name: "invite_status",
        field: "invite_status",
        label: " Trạng thái",
        align: "left",
        sortable: true,
      },
    ];
    function toDate(date) {
      return dateSp.toDate(date);
    }
    function toIntoNotiStatus(invite_status) {
      return notiApi.toIntoNotiStatus(invite_status);
    }
    function toIntoNotiStatusColor(invite_status) {
      return notiApi.toIntoNotiStatusColor(invite_status);
    }
    return {
      thisNotis,
      thisTitle,
      thisContent,
      isAccept,
      isReject,
      //column
      pagination,
      columns,
      //function
      toDate,
      toIntoNotiStatus,
      toIntoNotiStatusColor,
    };
  },
  data() {
    return {
      notis: null,
    };
  },
  async created() {
    const noti = await notiApi.getIntoNoti();
    this.notis = noti.notis;
    this.notis.forEach((row, index) => {
      row.index = index + 1;
    });
    this.pagination.rowsPerPage = this.notis.length;
  },
};
</script>

<style></style>
