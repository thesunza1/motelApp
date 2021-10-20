<template>
  <div class="full-width row justify-center items-center pd br bg-white">
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
      <div class="col-12 col-md-6 row items-center justify-center">
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
      <div class="col-12 col-md-6 row items-center justify-center">
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
          icon="perm_identity"
          label=" Lọc thêm"
        >
          <div class="col-12 items-center justify-center row">
            <div class="col-12"><br /></div>
            <div class="col-12 items-center justify-center row">
              <q-item class="col-11">
                <q-item-section avatar>
                  <q-avatar
                    color="primary"
                    text-color="white"
                    icon="local_atm"
                  />
                </q-item-section>
                <q-item-section>
                  <q-range
                    v-model="price"
                    :min="0"
                    :max="2000000"
                    :step="100000"
                    color="green"
                    :left-label-value="price.min + ' Vnd'"
                    :right-label-value="price.max + ' Vnd'"
                    label-always
                  />
                </q-item-section>
              </q-item>
            </div>
            <div class="col-12"><br /></div>
            <div class="col-12"><br /></div>
            <div class="col-12 items-center justify-center row">
              <q-item class="col-11">
                <q-item-section avatar>
                  <q-avatar color="primary" text-color="white" icon="tab" />
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
      <div class="col-11 row items-center justify-end">
        <q-btn
          class="g-header"
          color="primary"
          icon="search"
          label="Tìm"
          @click="searchRoom()"
        />
      </div>
    </div>
  </div>
</template>

<script>
import noti from "../boot/noti/noti";
export default {
  data() {
    return {
      price: { min: 0, max: 1500000 },
      area: { min: 0, max: 50 },
      search: null,
      address: null,
      sex: 0,
      post_type: 1,
    };
  },
  methods: {
    async searchRoom() {
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
