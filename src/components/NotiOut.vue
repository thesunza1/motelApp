<template>
  <div class="full-width">
    <q-intersection
      v-for="(noti, index) in notis"
      :key="index"
      once
      transition="scale"
      class="full-width"
    >
      <div><br /></div>
      <q-card @click="open(noti.noti_type_id, noti)" class="my-card row g-border">
        <q-card-section
          horizontal
          class="col-2 col-md-1 flex items-center full-width"
        >
          <q-icon
            :name="
              noti.noti_type_id == 1
                ? 'info'
                : noti.noti_type_id == 2
                ? 'report_problem'
                : noti.noti_type_id == 3
                ? 'person_add'
                : 'check'
            "
            :class="
              noti.noti_type_id == 1
                ? 'text-purple'
                : noti.noti_type_id == 2
                ? 'text-red'
                : noti.noti_type_id == 3
                ? 'text-primary'
                : 'text-warning'
            "
            style="font-size: 40px; padding-left: 10px"
          />
          <q-card-section class="row col-10 col-md-11 items-center">
            <div class="col-12 col-md-6 text-h6">Tiêu Đề: {{ noti.title }}</div>
            <div class="col-12 col-md-4 text-subtitle2 g-header-up">
              <b>Người nhận:</b> {{ noti.receiver_user.name }}
            </div>
            <div class="col-12 col-md-2">
              <b>Thời gian:</b> {{ toDate(noti.created_at) }}
            </div>
            <div class="col-12"><br /></div>
            <div class="col-12" v-if="noti.noti_type_id != 3">
              <b> Nội dung:</b>
              <div v-html="noti.content"></div>
            </div>
            <div class="col-12">
              <div>Nhấn để xem thêm</div>
            </div>
          </q-card-section>
        </q-card-section>
      </q-card>
    </q-intersection>
    <div class="full-width">
      <q-dialog v-model="isInvite">
        <q-card v-if="thisRoom">
          <q-card-section class="row items-center text-white" :class="notiHDer">
            <div class="col-12 text-center text-h5">
              {{ nt.title }}
            </div>
            <div class="col-12"><br /></div>
            <div class="col-12 col-md-5 text-bold">
              Email: {{ nt.receiver_user.email }}
            </div>
            <div class="col-md-5 col-12 text-left g-header-up">
              Tên: {{ nt.receiver_user.name }}
            </div>
            <div class="col-md-2 col-12 text-right">
              Ngày: {{ toDate(nt.created_at) }}
            </div>
          </q-card-section>
          <q-card-section class="row items-center justify-center full-width">
            <div class="col-12 row items-center justify-center">
              <div class="col-6 text-left">Phòng {{ thisRoom.name }}</div>
              <div class="col-6 text-left">
                Loại: {{ thisRoom.room_type.name }}
              </div>
            </div>
            <div class="col-12 row items-center justify-center">
              <div class="col-6 text-left">
                Phòng: {{ thisRoom.room_type.cost }} VNĐ
              </div>
              <div class="col-6 text-left">
                Người: {{ thisRoom.room_type.motel.people_cost }} VNĐ
              </div>
              <div class="col-6 text-left">
                Điện: {{ thisRoom.room_type.motel.elec_cost }} VNĐ
              </div>
              <div class="col-6 text-left">
                Nước: {{ thisRoom.room_type.motel.water_cost }} VNĐ
              </div>
            </div>
            <div class="col-12"><br /></div>
            <div class="col-12 row items-center justify-center">
              <div class="col-12 text-bold">Đặc Điểm</div>
              <div class="col-12">{{ thisRoom.room_type.content }}</div>
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              flat
              label=" Đóng"
              class="g-header"
              color="negative"
              v-close-popup
            />
            <q-btn
              flat
              class="g-header"
              label=" Tạo"
              color="primary"
              v-close-popup
              @click="reply"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog v-model="isDiff">
        <q-card style="min-width: 60%">
          <q-card-section class="row items-center text-white" :class="notiHDer">
            <div class="col-12 text-center text-h5">
              {{ nt.title }}
            </div>
            <div class="col-12"><br /></div>
            <div class="col-12 col-md-5 text-bold">
              Email: {{ nt.receiver_user.email }}
            </div>
            <div class="col-md-4 col-12 text-left g-header-up">
              Tên: {{ nt.receiver_user.name }}
            </div>
            <div class="col-md-3 col-12 text-right">
              Ngày: {{ toDate(nt.created_at) }}
            </div>
          </q-card-section>
          <q-card-section>
            <div class="text-bold mr">Nội dung:</div>
            <div class="br" v-html="nt.content"></div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              flat
              label=" Đóng"
              class="g-header"
              color="negative"
              v-close-popup
            />
            <q-btn
              flat
              class="g-header"
              label=" Tạo"
              color="primary"
              v-close-popup
              @click="reply"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    notis: {
      type: Array,
    },
  },
  data() {
    return {
      isInvite: false,
      isDiff: false,
      isConfirm: false,
      thisRoom: null,
      nt: null,
      notiHDer: "",
    };
  },
  methods: {
    toDate(time) {
      return time.substring(0, 10);
    },
    async open(type_id, noti) {
      this.nt = noti;
      if (type_id == 3) {
        this.isInvite = true;
        try {
          const notiInvite = await this.$api.get("getNotiRoom/" + noti.room_id);
          this.thisRoom = notiInvite.data.room;
        } catch (error) {}
      } else {
        this.isDiff = true;
      }
      this.notiHDer =
        type_id == 1
          ? "bg-blue-6"
          : type_id == 2
          ? "bg-negative"
          : type_id == 3
          ? "bg-primary"
          : "bg-amber-14";
    },
    reply() {
      this.$emit("openCreate");
    },
  },
};
</script>

<style lang="sass" scoped>
.br
  padding: 10px 3px
  margin: 5px 1px
  border-radius: 2px
  box-shadow: 0px 0px 2px gray
  background: #f3f3f3
.mr
  padding: 10px 3px
  margin: 2px 0px
</style>
