<template>
  <q-page padding class="row justify-center">
    <div class="col-10" v-if="tenantRoomEquips">
      <q-table
        title=" Danh sách phản ảnh"
        title-class="text-primary text-h6"
        :columns="columns"
        :rows="tenantRoomEquips"
        class="g-border"
        row-key="name"
        :pagination="pagination"
        :filter="filter"
      >
        <template v-slot:top-right>
          <div class="q-mr-md g-border shadow-up-1 q-px-md q-py-sm" style="">
            <div class="text-primary text-h6 g-display-inline">Chọn ngày:</div>
            <q-icon name="event" class="cursor-pointer g-icon-h1 g-display-inline">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="orderDay" range>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
            <p v-if="orderDay">{{ orderDay.from }} - {{ orderDay.to }}</p>
          </div>
          <q-btn :disable="orderDay == null " color="primary" label="Tìm" no-caps rounded icon="search" @click="search()" />
        </template>
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              class="text-bold text-purple"
            >
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="name" :props="props">
              <q-badge class="text-h6" color="primary" text-color="white">
                Phòng {{ props.row.tenant.room.name }}
              </q-badge>
            </q-td>
            <q-td class="text-h6" key="roomType" :props="props">
              <div>
                {{ props.row.tenant.room.room_type.name }}
              </div>
            </q-td>
            <q-td key="content" class="text-h6" :props="props">
              {{ props.row.name }}: {{ props.row.content }}
            </q-td>
            <q-td key="imgs" :props="props">
              <div v-if="toLength(props.row.img_details) > 0">
                <q-img
                  class="g-border shadow-up-2"
                  :src="`${imgUrl}${props.row.img_details[0].img}`"
                  :ratio="16 / 9"
                  spinner-color="primary"
                  spinner-size="82px"
                  @click="showImgs(props.row.img_details)"
                >
                  <div class="absolute-bottom text-subtitle1 text-center">
                    {{ toLength(props.row.img_details) }} ảnh
                  </div>
                </q-img>
              </div>
              <div v-else>Chưa có hình ảnh nào</div>
            </q-td>
            <q-td key="created_at" :props="props">
              <div class="text-h6">
                {{ toDate(props.row.created_at) }}
              </div>
            </q-td>
            <q-td key="status" :props="props">
              <q-select
                emit-value
                map-options
                :disable="props.row.status != 0"
                v-model="props.row.status"
                :options="statusOt"
                label=" Trạng thái phản ánh"
                label-color="primary"
                filled
                @update:model-value="changeEq($event, props.row.id)"
              >
                <template v-slot:selected>
                  <div
                    class="text-bold"
                    :class="`text-${statusOt[props.row.status].color}`"
                  >
                    {{ statusOt[props.row.status].label }}
                  </div>
                </template>
              </q-select>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
    <q-dialog v-model="isSeeImgs">
      <gobal-img-detail-obj
        style="min-width: 90%"
        :img_details="thisImgs"
      ></gobal-img-detail-obj>
    </q-dialog>
  </q-page>
</template>

<script>
import treApi from "../boot/callApi/tenantRoomEquip";
import noti from "../boot/noti/noti";
import dateSp from "../boot/noti/date";
import GobalImgDetailObj from "../components/GobalImgDetailObj.vue";
import sp from "../boot/support";
export default {
  components: {
    GobalImgDetailObj,
  },
  data() {
    return {
      filter: "",
      statusOt: [
        {
          label: " Chưa xác nhận",
          value: 0,
          color: "black",
        },
        {
          label: " Đã đồng ý",
          value: 1,
          color: "positive",
        },
        {
          label: " Không đồng ý",
          value: 2,
          color: "negative",
        },
      ],
      isSeeImgs: false,
      thisImgs: null,
      pagination: {
        rowsPerPage: 10,
      },
      tenantRoomEquips: null,
      columns: [
        {
          label: "Số phòng",
          name: "name",
          field: (row) => row.tenant.room.name,
          sortable: true,
        },
        {
          label: "Loại phòng",
          name: "roomType",
          field: "roomType",
          sortable: true,
        },
        {
          label: " Nội dung, phản ánh ",
          name: "content",
          field: (row) => `${row.name}: ${row.conten}`,
        },
        {
          label: " Hình ảnh",
          name: "imgs",
          field: (row) => row.img_details,
        },
        {
          label: " Ngày đăng (mm/dd/yyyy)",
          name: "created_at",
          // field: (row) => row.created_at,
          // format: (val) => this.toDate(val),
          field: "created_at",
          sortable: true,
        },
        {
          label: " Trạng thái",
          name: "status",
          // field: (row) => row.status,
          field: "status",
          sortable: true,
        },
      ],
      orderDay: null,
      order: 0,
      orderOt: [
        {
          label: "Tăng dần",
          value: 0,
          icon: "arrow_upward",
        },
        {
          label: "Giảm dần",
          value: 1,
          icon: "arrow_downward",
        },
      ],
      motelId: this.$route.params.motelId,
      imgUrl: this.$api.defaults.baseURL + "/image/",
    };
  },
  async created() {
    const data = await treApi.getAllTRE(this.motelId);

    this.tenantRoomEquips = data.tenantRE;
    console.log(this.tenantRoomEquips);
  },
  methods: {
    toDate(date) {
      return dateSp.toDate(date);
    },
    toLength(arr) {
      return sp.length(arr);
    },
    showImgs(imgs) {
      this.thisImgs = imgs;
      this.isSeeImgs = true;
    },
    async changeEq(status, eqId) {
      const res = await treApi.changeStatusRE(eqId, status);
      if (res.statusCode == 1) {
        noti.showNoti("Thay đổi thành công", "black");
      }
      return;
    },
    async search() {
      const res = await treApi.getAllTRE(this.motelId,0, this.orderDay.from, this.orderDay.to);
      this.tenantRoomEquips = res.tenantRE;
      return ;
    }
  },
};
</script>

<style></style>
