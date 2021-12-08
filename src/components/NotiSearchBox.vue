<template>
  <div class="" style="">
    <q-card class="my-card g-border">
      <q-card-section class="row items-center q-gutter-sm justify-end">
        <q-select
          emit-value
          class="col-5"
          map-options
          label-color="primary"
          v-model="choose"
          :options="options"
          label=" Loại thông báo"
          filled
        />
        <div class="col-4 q-mr-md g-border shadow-up-1 q-px-md" style="">
          <div class="text-primary text-h6 g-display-inline">Chọn ngày:</div>
          <q-icon
            name="event"
            class="cursor-pointer g-icon-h1 g-display-inline"
          >
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
          <p class="g-text-indent" v-if="orderDay">
            {{ orderDay.from }} - {{ orderDay.to }}
          </p>
          <p class="g-text-indent" v-else>Chưa chọn ngày</p>
        </div>
        <q-btn
          color="primary"
          label="Tìm"
          no-caps
          rounded
          icon="search"
          @click="findNoti()"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import notiApi from "../boot/callApi/noti";
import noti from "../boot/noti/noti";
import { ref } from "vue";
export default {
  setup() {
    const options = notiApi.toNotiTypeOt();
    const orderDay = ref(null);
    const choose = ref(0);
    return {
      options,
      choose,
      orderDay,
    };
  },
  methods: {
    async findNoti() {
      var res ;
      if (this.orderDay == null) {
        res = await notiApi.findNoti(this.choose);
      } else {
        res = await notiApi.findNoti(this.choose,this.orderDay.from, this.orderDay.to);
      }
      if(res.statusCode ==1) {
        noti.showNoti('Lọc thành công', 'black');
        this.$emit('updateNoti',res.noti);
      } else {
        noti.showNoti('Lọc that61 bại', 'black');
      }
    },
  },
};
</script>

<style></style>
