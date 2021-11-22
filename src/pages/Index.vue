<template>
  <q-page class="g-size">
    <div class="row justify-center">
      <div class="text-h4 title col-12">
        <p class="padding-header">
          Chào mừng bạn đến quản lý và Tìm trọ Tmq-motel
        </p>
      </div>

      <q-carousel
        v-model="slide"
        transition-prev="jump-right"
        transition-next="jump-left"
        swipeable
        animated
        :autoplay="true"
        control-color="primary"
        prev-icon="arrow_left"
        next-icon="arrow_right"
        padding
        arrows
        height="340px"
        class="col-12 col-md-8 text-primary shadow-1 g-border"
      >
        <q-carousel-slide name="style" class="column no-wrap flex-center">
          <q-icon name="search" size="56px" />
          <div class="q-mt-md text-center">
            <p>Dễ dàng tìm kiếm các trọ , và phòng ghép,..</p>
            <p>
              Xem được thông tin về trọ một cách nhanh chóng: giá phòng , điện
              nước , thuế , chổ để xe , giờ đóng mở cửa
            </p>
            <p>Xem được tất cả thông tin về người đăng tin ở ghép</p>
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="tv" class="column no-wrap flex-center">
          <q-icon name="apartment" size="56px" />
          <div class="q-mt-md text-center">
            <p>Giao diện quản lý đơn giản, dễ dùng</p>
            <p>Các chức năng: trạng thái phòng, tiền phòng, ...</p>
            <p>
              Chức năng hữu ít : tạo bill nhanh cho tất cả phòng, thông báo
              user, xác nhận trạng thái thiết bị
            </p>
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="tt" class="column no-wrap flex-center">
          <q-icon name="live_tv" size="56px" />
          <div class="q-mt-md text-center">
            <p>
              Xem được: trạng thái bill, tiền phòng, điện, nước, phản ánh tình
              trạng phòng.
            </p>
            <p>Phản ánh tình trạng phòng và xác nhận với chủ trọ.</p>
            <p>Có thể tạo bài đăng để tìm bạn ở ghép với vài bước đơn giản.</p>
          </div>
        </q-carousel-slide>
      </q-carousel>
      <q-card class="my-cards col-12 col-md-8 g-border">
        <q-card-section style="min-height: 10%" class="row justify-center">
          <q-responsive :ratio="21 / 11" style="min-width: 90%">
            <q-carousel
              animated
              v-model="slide1"
              thumbnails
              swipeable
              control-color="red"
            >
              <q-carousel-slide :name="1" :img-src="'/images/searchIndex.png'">
              </q-carousel-slide>
              <q-carousel-slide
                :name="2"
                :img-src="'/images/searchIndex2.png'"
              />
              <q-carousel-slide
                :name="3"
                :img-src="'/images/searchIndex3.png'"
              />
            </q-carousel>
          </q-responsive>
        </q-card-section>
        <q-card-section vertical>
          <q-card-section class="text-center text-primary">
            <q-icon name="search" style="font-size: 56px" />
          </q-card-section>
          <q-card-section class="col-12">
            <div class="text-h5 text-primary text-center">Tìm kiếm trọ</div>
          </q-card-section>
          <q-card-section class="col-12 text-center">
            <p>Dễ dàng tìm kiếm các trọ , và phòng ghép,..</p>
            <p>
              Xem được thông tin về trọ một cách nhanh chóng: giá phòng , điện
              nước , thuế , chổ để xe , giờ đống mở cửa
            </p>
            <p>Xem được tất cả thông tin về người đăng tin ở ghép</p>

          </q-card-section>
        </q-card-section>
      </q-card>

      <q-card class="my-cards col-12 col-md-8 g-border">
        <q-card-section style="height: auto" class="row justify-center">
          <q-responsive :ratio="21 / 11" style="min-width: 90%">
            <q-carousel
              animated
              v-model="slideMotel"
              thumbnails
              swipeable
              control-color="red"
            >
              <q-carousel-slide :name="1" :img-src="'/images/motelList.png'" />
              <q-carousel-slide :name="2" :img-src="'/images/motelAll.png'">
              </q-carousel-slide>
              <q-carousel-slide :name="3" :img-src="'/images/motelBill.png'" />
              <q-carousel-slide :name="4" :img-src="'/images/motelPost.png'" />
            </q-carousel>
          </q-responsive>
        </q-card-section>
        <q-card-section class="text-center">
          <q-card-section class="text-center text-primary">
            <q-icon name="apartment" style="font-size: 56px" />
          </q-card-section>
          <q-card-section>
            <div class="text-h5 text-primary">Quản lý trọ</div>
          </q-card-section>
          <q-card-section>
            <p>Giao diện quản lý đơn giản, dễ dùng</p>
            <p>Các chức năng: trạng thái phòng, tiền phòng, ...</p>
            <p>
              Chức năng hữu ít : tạo bill nhanh cho tất cả phòng, thông báo
              user, xác nhận trạng thái thiết bị
            </p>
          </q-card-section>
        </q-card-section>
      </q-card>

      <q-card class="my-cards col-12 col-md-8 g-border">
        <q-card-section style="height: auto" class="row justify-center">
          <q-responsive :ratio="21 / 12" style="width: 90%">
            <q-carousel
              animated
              v-model="slideRoom"
              thumbnails
              swipeable
              control-color="red"
            >
              <q-carousel-slide :name="1" :img-src="'/images/roomIndex.png'">
              </q-carousel-slide>
              <q-carousel-slide :name="2" :img-src="'/images/roomBill.png'" />
              <q-carousel-slide :name="3" :img-src="'/images/roomBill2.png'" />
              <q-carousel-slide :name="4" :img-src="'/images/roomBill3.png'" />
              <q-carousel-slide :name="5" :img-src="'/images/roomShare.png'" />
            </q-carousel>
          </q-responsive>
        </q-card-section>
        <q-card-section class="text-center">
          <q-card-section class="text-center text-primary">
            <q-icon name="tv" style="font-size: 56px" />
          </q-card-section>
          <q-card-section>
            <div class="text-h5 text-black">Quản lý phòng</div>
          </q-card-section>
          <q-card-section>
            <p>
              Xem được: trạng thái bill, tiền phòng, điện, nước, phản ánh tình
              trạng phòng.
            </p>
            <p>Phản ánh tình trạng phòng và xác nhận với chủ trọ.</p>
            <p>Có thể tạo bài đăng để tìm bạn ở ghép với vài bước đơn giản.</p>
          </q-card-section>
        </q-card-section>
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
      slideMotel: 1,
      slideRoom: 1,
    };
  },
});
</script>
<style scoped lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Acme&display=swap')
div.title
  text-align: center
  letter-spacing: 0.1px
  // font-family: 'Acme', sans-serif
.my-cards
  margin-top: 20px
.padding-header
  padding: 10px 0px
</style>
