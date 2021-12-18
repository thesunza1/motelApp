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
        :filter="filter"
        v-model:selected="thisNotis"
        :pagination="pagination"
      >
        <template v-slot:top class="row items-center">
          <div class="col-12 text-left text-h6 text-bold text-primary">
            Danh Sách Người Xin Vào
          </div>
          <div class="col-12"><br /></div>
          <div class="col-12 items-center row q-gutter-md">
            <div
              class="
                flex
                items-center
                q-gutter-md
                shadow-1
                g-border
                q-mr-md q-pt-sm q-px-md
              "
              style=""
            >
              <div>
                <div class="text-primary text-subtitle2 items-center g-display-inline">
                  Chọn ngày &nbsp;
                </div>
                <q-icon
                  name="event"
                  class="
                    cursor-pointer
                    g-border
                    shadow-1
                    bg-black
                    text-white
                    g-icon-h2
                    q-px-sm q-py-sm
                    g-display-inline
                  "
                >
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="orderDay" range>
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Đóng"
                          no-caps
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
                <p class="g-text-indent" style="display: block" v-if="orderDay">
                  {{ orderDay.from }} - {{ orderDay.to }}
                </p>
                <p class="g-text-indent" style="display: block" v-else>
                  Chưa chọn ngày
                </p>
              </div>
              <div>
                <q-btn
                  class="g-display-inline"
                  color="primary"
                  :disable="orderDay == null"
                  label="Tìm"
                  no-caps
                  rounded
                  icon="search"
                  @click="findIntoNoti()"
                />
              </div>
            </div>

            <q-space />
            <q-input
              v-model="filter"
              type="text"
              placeholder="Tìm kiếm"
              debounce="300"
              dense
              filled
            />
            <q-btn
              no-caps
              :disable="thisNotis[0]?.id == null"
              color="red"
              v-if="thisNotis[0]?.invite_status == 0"
              icon="remove"
              label=" Từ chối"
              rounded
              @click="opReject()"
            />
            <q-btn
              no-caps
              color="red"
              v-if="thisNotis[0]?.invite_status == 2"
              rounded
              label=" Bạn đã từ chối"
            />
            <q-btn
              no-caps
              v-if="thisNotis[0]?.invite_status == 0"
              color="green"
              icon="check"
              :disable="thisNotis[0]?.id == null"
              label=" Chấp nhận"
              rounded
              @click="opAccept()"
            />
            <q-btn
              no-caps
              v-if="thisNotis[0]?.invite_status == 1"
              color="orange"
              icon="check"
              :disable="thisNotis[0]?.id == null"
              label=" Gửi lại"
              rounded
              @click="opAccept()"
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
              <q-badge
                class="text-h6"
                color="primary"
                text-color="white"
                :label="props.row.index"
              />
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
            <q-td key="senderEmail" :props="props">
              <div class="text-bold" v-html="props.row.sender_user.email"></div>
            </q-td>
            <q-td key="phoneNumber" :props="props">
              <div
                class="text-bold"
                v-html="props.row.sender_user.phone_number"
              ></div>
            </q-td>
            <q-td key="birth_date" :props="props">
              <div v-html="toDate(props.row.sender_user.birth_date)"></div>
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
    <q-dialog v-model="isAccept" v-if="listRoomNoti && thisMotel">
      <motel-into-accept
        :rooms="listRoomNoti"
        :motel="thisMotel"
        :thisNoti="thisNotis[0]"
        @reloadNotis="reloadNotis()"
      ></motel-into-accept>
    </q-dialog>
    <q-dialog v-model="isReject">
      <q-card class="g-border">
        <q-card-section class="">
          <div class="text-h6 text-primary text-center">
            Từ chối người xin vào trọ
            <p class="g-header-up">{{ thisMotel?.name }}</p>
          </div>
        </q-card-section>
        <q-card-section class="q-pl-lg row item-center">
          <div class="col-6">
            <q-icon name="person" class="text-primary g-icon-h2" /><b>
              Họ tên:
            </b>
            <p class="g-header-up g-display-inline">
              {{ thisNotis[0]?.sender_user.name }}
            </p>
            <br />
          </div>
          <div class="col-6">
            <q-icon name="email" class="text-primary g-icon-h2" /><b>
              Email:
            </b>
            {{ thisNotis[0]?.sender_user.email }}<br />
          </div>
          <div class="col-6">
            <q-icon name="remove" class="text-primary g-icon-h2" /><b>
              Nghề nghiệp:
            </b>
            <p class="g-first-up g-display-inline">
              {{ thisNotis[0]?.sender_user.job }}
            </p>
          </div>
        </q-card-section>
        <q-card-section>
          <q-input
            filled
            v-model="thisContent"
            type="text"
            label-color="red"
            label=" Nhập nội dung từ chối"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn no-caps flat label=" Hủy" color="red" v-close-popup />
          <q-btn
            flat
            no-caps
            label=" Gửi"
            color="primary"
            @click="sendReject()"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { ref } from "vue";
import notiApi from "../boot/callApi/noti";
import notiSp from "../boot/noti/noti";
import dateSp from "../boot/noti/date";
import MotelIntoAccept from "../components/MotelIntoAccept.vue";
export default {
  components: {
    MotelIntoAccept,
  },
  setup() {
    const orderDay = ref(null);
    const thisNotis = ref([]);
    const thisTitle = ref(null);
    const thisContent = ref(null);
    const filter = ref();
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
        name: "senderEmail",
        field: (row) => row.sender_user.email,
        align: "left",
        label: "Email ",
        sortable: true,
      },
      {
        name: "phoneNumber",
        field: (row) => row.sender_user.phone_number,
        label: "Số điện thoại",
        align: "left" ,
      },
      {
        name: "birth_date",
        field: (row) => row.sender_user.birth_date,
        align: "right",
        label: " Ngày sinh",
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
        // format: (val) => this.toDate(val),
      },
      {
        name: "invite_status",
        field: "invite_status",
        label: " Trạng thái",
        align: "left",
        sortable: true,
        // format: (val) => toStatus(val),
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
      filter,
      thisContent,
      isAccept,
      isReject,
      orderDay,
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
      thisMotel: null,
      listRoomNoti: null,
    };
  },
  methods: {
    async findIntoNoti() {
      const res = await notiApi.findNoti(
        5,
        this.orderDay.from,
        this.orderDay.to
      );
      if (res.statusCode == 1) {
        this.notis = res.noti;
        this.pagination.rowsPerPage = this.notis.length;
        this.notis.forEach((row, index) => {
          row.index = index + 1;
        });
        notiSp.showNoti('Lọc thành công');
      }
    },
    async opAccept() {
      const res = await notiApi.getRoomInto(this.thisNotis[0].id);
      this.listRoomNoti = res.room;
      this.thisMotel = res.motel;
      console.log(this.listRoomNoti);
      this.isAccept = !this.isAccept;
    },
    toStatus(val) {
      return noti.toIntoNotiStatus(val);
    },
    opReject() {
      this.isReject = !this.isReject;
    },
    async sendReject() {
      const res = await notiApi.getRoomInto(this.thisNotis[0].id);
      this.thisMotel = res.motel;
      if (res.statusCode == 1) {
        const send = await notiApi.sendReject(
          this.thisMotel.id,
          this.thisNotis[0].sender_user.id,
          this.thisContent
        );
        if (send.statusCode == 1) {
          notiSp.showNoti("Gửi thành công", "black");
          notiApi.changeIntoStatus(this.thisNotis[0].id, 2);
          this.reloadNotis();
        }
      }
    },
    async reloadNotis() {
      const noti = await notiApi.getIntoNoti();
      this.notis = noti.notis;
      this.notis.forEach((row, index) => {
        row.index = index + 1;
      });
      this.pagination.rowsPerPage = this.notis.length;
      return;
    },
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
