<template>
  <div class="full-width row justify-center items-center pd g-border bg-white">
    <q-expansion-item
      expand-separator
      icon="search"
      label=" Tìm trọ"
      class="col-12"
      header-class="text-primary text-h6"
      label-class="g-border"
      caption=" Tìm trọ với địa chỉ và vị trí"
    >
      <div class="col-12 row items-center">
        <q-input
          class="col-12 col-md-4"
          v-model="address"
          type="text"
          outlined
          placeholder=" Địa chỉ"
        >
          <template v-slot:prepend>
            <q-icon name="room" color="primary" />
          </template>
        </q-input>
        <div class="gt-sm col-1"></div>
        <div class="col-12 lt-md"><br /></div>
        <q-input
          class="col-12 col-md-7"
          v-model="search"
          type="text"
          outlined
          placeholder=" Tên trọ"
        >
          <template v-slot:prepend>
            <q-icon name="search" color="primary" />
          </template>
        </q-input>
      </div>
      <div class="col-12"><br /></div>
      <div class="col-12 row items-center">
        <div class="col-12 col-md-4 row items-center ">
          <div class="text-h6 q-pr-sm">Loại phòng: </div>
          <q-btn-toggle
            v-model="sex"
            toggle-color="primary"
            class="g-header"
            no-caps
            :options="[
              { label: 'Nam', value: 0 },
              { label: 'Nữ', value: 1 },
              { label: 'Nam hoặc nữ', value: 2 },
              { label: ' Bất kì', value: 3 },
            ]"
          />
        </div>
        <div class="gt-sm col-1"></div>
        <div class="col-12 lt-md"><br /></div>
        <div class="col-12 col-md-7 row items-center">
          <div class="text-h6 q-pr-sm"> Loại bài đăng: </div>
          <q-btn-toggle
            v-model="post_type"
            toggle-color="primary"
            class="my-custom-toggle"
            no-caps
            color="white"
            text-color="primary"
            :options="[
              { label: ' Trọ', value: 1 },
              { label: ' Phòng ghép', value: 2 },
            ]"
          />
        </div>
        <div class="col-12"><br /></div>
        <div class="col-12">
          <q-expansion-item
            class="full-width"
            icon="add"
            label="Lọc thêm"
          >
            <div class="col-12 items-center justify-center row">
              <div class="col-12"><br /></div>
              <div class="col-12 items-center justify-center row">
                <q-item class="col-11">
                  <q-item-section class="text-h6" avatar>
                    Tiền Phòng:
                  </q-item-section>
                  <q-item-section>
                    <q-range
                      v-model="price"
                      :min="0"
                      :max="2000000"
                      :step="100000"
                      color="green"
                      :left-label-value="toPrice(price.min) + ' VNĐ'"
                      :right-label-value="toPrice(price.max) + ' VNĐ'"
                      label-always
                    />
                  </q-item-section>
                </q-item>
              </div>
              <div class="col-12"><br /></div>
              <div class="col-12"><br /></div>
              <div class="col-12 items-center justify-center row">
                <q-item class="col-11">
                  <q-item-section class="text-h6 q-mr-md" avatar>
                    Diện tích:
                  </q-item-section>
                  <q-item-section>
                    <q-range
                      v-model="area"
                      :min="0"
                      :max="100"
                      :step="5"
                      color="blue"
                      :left-label-value="area.min + ' M2'"
                      :right-label-value="area.max + ' M2'"
                      label-always
                    />
                  </q-item-section>
                </q-item>
              </div>
            </div>
          </q-expansion-item>
        </div>
        <div class="col-12"><br /></div>
        <div class="col-12 row items-center justify-end">
          <q-btn
            class="g-header"
            color="primary"
            icon="search"
            label="Tìm"
            rounded
            @click="searchRoom()"
          />
        </div>
      </div>
    </q-expansion-item>
  </div>
</template>

<script>
import noti from "../boot/noti/noti";
import sp from "../boot/support";
export default {
  data() {
    return {
      price: { min: 0, max: 1500000 },
      area: { min: 0, max: 50 },
      search: null,
      address: null,
      sex: 3,
      post_type: 1,
    };
  },
  methods: {
    async searchRoom() {
      if(this.search == null ) this.search = ' ' ;
      if(this.address == null ) this.address = ' ' ;
      const resSearch = await this.$api.post("searchPost", {
        search: this.search,
        address: this.address,
        post_type: this.post_type,
        price_max: this.price.max,
        price_min: this.price.min,
        area_max: this.area.max,
        area_min: this.area.min,
        sex: this.sex,
      });
      if (resSearch.data?.statusCode) {
        this.$emit("update", resSearch.data.post);
        noti.showNoti("Thành công");
      }
    },
    toPrice(val) {
      return sp.toNum(val) ;
    }
  },
};
</script>

<style lang="sass" scoped>
.pd
  box-sizing: border-box
  padding: 10px

.br
  border-radius: 4px
  box-shadow: 0px 2px 4px grey
</style>
