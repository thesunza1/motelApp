<template>
  <q-page>
    <div class="row justify-center">
      <div class="text-h4 title col-12">
        wellcome to search and manager motel application
        <br />
      </div>

      <q-carousel
        v-model="slide"
        transition-prev="jump-right"
        transition-next="jump-left"
        swipeable
        animated
        :autoplay="true"
        control-color="white"
        prev-icon="arrow_left"
        next-icon="arrow_right"
        padding
        arrows
        height="300px"
        class="col-12 col-md-8 bg-teal-6 text-white shadow-1 rounded-borders"
      >
        <q-carousel-slide name="style" class="column no-wrap flex-center">
          <q-icon name="search" size="56px" />
          <div class="q-mt-md text-center">
            <p>dễ dàng tìm kiếm các trọ , và phòng ghép,..</p>
            <p>
              xem được tất cả thông tin về trọ một cách nhanh chống: giá phòng ,
              điện nước , thuế , chổ để xe , giờ đống mở cửa
            </p>
            <p>xem được tất cả thông tin về người đăng tin ở ghép</p>
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="tv" class="column no-wrap flex-center">
          <q-icon name="home" size="56px" />
          <div class="q-mt-md text-center">
            <p>giao diện quản lý đơn giản , dễ dùng</p>
            <p>đảm bảo các chức năng: trạng thái phòng , tiền phòng , ...</p>
            <p>
              chức năng hữu ít : tạo bill nhanh cho tất cả phòng , thông báo
              user , xác nhận trạng thái thiết bị
            </p>
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="tt" class="column no-wrap flex-center">
          <q-icon name="live_tv" size="56px" />
          <div class="q-mt-md text-center">
            <p>
              xem các thông tin phòng: trạng thái bill , tiền phòng , điện ,
              nước, thiết bị sử dụng , trạng thái thiết bị phòng
            </p>
            <p>
              cho phép điều chỉnh các thiết bị , cũng như báo cáo các thiết bị
              và xác nhận với chủ trọ
            </p>
            <p>có thể tạo bài đăng để tìm bạn ở ghép với vài bước đơn giản</p>
          </div>
        </q-carousel-slide>
      </q-carousel>
      <q-card class="my-cards col-12 col-md-8">
         <q-card-section style="min-height:10%" class="row justify-center bg-dark" >
          <q-responsive :ratio="16/9" style="min-width:70%; bg-dark ">
            <q-carousel animated v-model="slide1" thumbnails swipeable control-color="red">
              <q-carousel-slide :name="1" :img-src="'/images/searchIndex.png'">
              </q-carousel-slide>
              <q-carousel-slide :name="2" :img-src="'/images/searchDetail1.png'" />
              <q-carousel-slide :name="3" :img-src="'/images/searchDetail2.png'" />
            </q-carousel>
          </q-responsive>
        </q-card-section>
        <q-card-section vertical>
          <q-card-section class="col-12">
            <div class="text-h6">Tìm kiếm trọ</div>
          </q-card-section>
          <q-card-section class="col-12">
            <p>dễ dàng tìm kiếm các trọ , và phòng ghép,..</p>
            <p>
              xem được tất cả thông tin về trọ một cách nhanh chống: giá phòng ,
              điện nước , thuế , chổ để xe , giờ đống mở cửa
            </p>
            <p>xem được tất cả thông tin về người đăng tin ở ghép</p>
            <p>đăng ký vào phòng nhanh</p>
          </q-card-section>
          <q-card-actions vertical align="right" class="col-12">
            <q-btn flat label="Tìm kiếm trọ" class="bg-info" />
          </q-card-actions>
        </q-card-section>
      </q-card>

      <q-card class="my-cards col-12 col-md-8">
        <q-card-section style="height: auto;" class="row justify-center bg-dark" >
          <q-responsive :ratio="16/9" style="min-width:70%; bg-dark ">
            <q-carousel animated v-model="slide1" thumbnails swipeable control-color="red">
              <q-carousel-slide :name="1" :img-src="'/images/motelAll.png'">
              </q-carousel-slide>
              <q-carousel-slide :name="2" :img-src="'/images/motelBill.png'" />
              <q-carousel-slide :name="3" :img-src="'/images/motelConfig.png'" />
            </q-carousel>
          </q-responsive>
        </q-card-section>
        <q-card-section>
          <div class="text-h6">quản lý trọ</div>
        </q-card-section>
        <q-card-section>
          <p>giao diện quản lý đơn giản , dễ dùng</p>
          <p>đảm bảo các chức năng: trạng thái phòng , tiền phòng , ...</p>
          <p>
            chức năng hữu ít : tạo bill nhanh cho tất cả phòng , thông báo user
            , xác nhận trạng thái thiết bị
          </p>
          <p>tính thuế các thiết bị tiêu thụ nhiều điện , nước</p>
        </q-card-section>
        <q-card-actions vertical align="right">
          <q-btn flat label="quản lý trọ" class="bg-info" />
        </q-card-actions>
      </q-card>

      <q-card class="my-cards col-12 col-md-8">
        <q-card-section style="height: auto;" class="row justify-center bg-dark" >
          <q-responsive :ratio="9/16" style="width:70%; bg-dark ">
            <q-carousel animated v-model="slide1" thumbnails swipeable control-color="red">
              <q-carousel-slide :name="1" :img-src="'/images/roomIndex.png'">
              </q-carousel-slide>
              <q-carousel-slide :name="2" :img-src="'/images/roomBill.png'" />
              <q-carousel-slide :name="3" :img-src="'/images/roomShare.png'" />
            </q-carousel>
          </q-responsive>
        </q-card-section>
        <q-card-section>
          <div class="text-h6">quản lý phòng</div>
        </q-card-section>
        <q-card-section>
          <p>
            xem các thông tin phòng: trạng thái bill , tiền phòng , điện , nước,
            thiết bị sử dụng , trạng thái thiết bị phòng
          </p>
          <p>
            cho phép điều chỉnh các thiết bị , cũng như báo cáo các thiết bị và
            xác nhận với chủ trọ
          </p>
          <p>có thể tạo bài đăng để tìm bạn ở ghép với vài bước đơn giản</p>
        </q-card-section>
        <q-card-actions vertical align="right">
          <q-btn flat label="quản lý phòng" class="bg-info" />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { ref } from "vue";
export default defineComponent({
  setup() {
    return {
      slide: ref("style"),
    };
  },
  name: "PageIndex",
  methods: {},
  data() {
    return {
      slide1: 1,
    };
  },
});
</script>
<style scoped lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Acme&display=swap')
div.title
  margin: 10px 0
  text-align: center
  font-family: 'Acme', sans-serif
.my-cards
  margin-top: 20px
</style>
