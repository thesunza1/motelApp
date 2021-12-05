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
      >
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
              {{ props.row.status }}
              <q-input v-model="props.row.status" type="text" label="Label" />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import treApi from "../boot/callApi/tenantRoomEquip";
import noti from "../boot/noti/noti";
import dateSp from "../boot/noti/date";
import sp from "../boot/support";
export default {
  data() {
    return {
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
      from: null,
      to: null,
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
  },
};
</script>

<style></style>
