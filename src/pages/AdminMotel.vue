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
              rounded
              @click="searchMotel()"
            />
          </div>
        </q-card-section>
        <q-card-actions v-if="thisMotel.length == 1" align="right">
          <q-btn color="primary" icon="question_answer">
            <router-link
              :to="{
                name: 'adminThisMotel',
                params: { motelId: thisMotel[0].id },
              }"
              style="text-decoration: none; color: white"
            >
              Đi tới
            </router-link>
          </q-btn>
        </q-card-actions>
      </div>
      <q-table
        title=" Danh sách trọ"
        :rows="motels"
        :columns="columns"
        row-key="name"
        selection="single"
        v-model:selected="thisMotel"
      >
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
        this.showNoti("Thành công", "primary");
      } else if (statusCode == 2) {
        this.showNoti(" Không tìm thấy trọ", "dark");
      } else {
        this.showNoti(" Không tìm thấy trọ", "negative");
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
          classes: "g-header-up",
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
          classes: "g-header-up",
          field: (row) => row.user.name,
          align: "left",
        },
      ],
      pagination: {
        rowsPerPage: 11,
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
      try {
        const res = await adminMotel.findMotel(this.email);
        if (res.statusCode == 1) {
          this.thisMotel = [res.motel];
          this.noti(res.statusCode);
        }
      } catch (error) {
        this.noti(0);
      }
    },
    toDetail(sd) {
      console.log(sd);
    }
  },
  watch: {
    numPage(newVal) {
      this.loadpage(newVal);
    },
    thisMotel(newVal) {
      this.$router.push({ name: 'adminThisMotel' , params: {motelId:newVal[0].id} });
    }
  },
  computed: {
    ...mapGetters("User", ["user"]),
  },
};
</script>

<style lang="sass">
.mr
  margin-top: 10px
.my-header-table
  .q-table__top,
  .q-table__bottom,
  thead tr:first-child
    background-color: $blue-2 !important
</style>
