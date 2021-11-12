<template>
  <div class="row items-center">
    <q-checkbox class="col-5" right-lable v-model="is" :label="name" />
    <q-input
      :disable="!is"
      class="col-7"
      v-model="cost1"
      label-color="positive"
      type="number"
      label="Số tiền"
      suffix="VNĐ"
    />
  </div>
</template>

<script>
export default {
  props: {
    cost: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    cost1: {
      get() {
        return this.cost;
      },
      set(value) {
        return this.$emit("update:cost", value);
      },
    },
  },
  data() {
    return {
      is: true,
    };
  },
};
</script>

<style></style>
