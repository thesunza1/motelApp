<template>
  <q-page padding class="row justify-center">
    <div class="col-12 col-md-10">
      <div v-if="post" class="col-12 row items-center">
        <div
          v-if="post.post_type_id == 1"
          class="col-12 row items-center justity-center"
        >
          <q-card class="col-12 my-card g-border">
            <q-card-section>
              <!-- img roomtype  -->
              <div
                class="col-12 row items-center justify-center shadow-2 g-border"
              >
                <motel-show-imgs
                  class="col-12"
                  :img_details="post.room_type.img_details"
                ></motel-show-imgs>
              </div>
            </q-card-section>
            <q-card-section class="row items-center">
              <div class="col-4 g-header-up text-h5">
                <q-icon name="apartment" class="text-h4 text-primary" />
                <b> Tên trọ: </b>
                <p class="text-black" style="display: inline">
                  {{ post.room_type.motel.name }}
                </p>
              </div>

              <div class="col-6 text-h5">
                <q-icon name="home" class="text-h4 text-primary" />
                <b> Loại phòng: </b>
                <p class="text-black g-header-up" style="display: inline">
                  {{ post.room_type.name }}
                </p>
              </div>
              <div class="col-4 text-orange text-h6">
                <q-icon name="paid" class="text-h4 text-primary" />
                <b class="text-black"> Giá phòng: </b
                >{{ toNum(post.room_type.cost) }} VNĐ
              </div>
              <div class="col-6 q-pt-md text-h6 text-accent">
                <q-icon name="bedroom_child" class="text-h4 text-primary" />
                <b class="text-black"> Phòng còn trống: </b>
                <div
                  v-for="(room, index) in rooms"
                  :key="index"
                  style="display: inline-block"
                >
                  <p v-if="room.room_status_id == 1">{{ room.name + ", " }}</p>
                </div>
              </div>

              <div class="col-12 row items-center">
                <div class="col-4">
                  <q-icon name="room" class="text-h4" />
                  &nbsp; {{ post.room_type.motel.address }}
                </div>
                <div>
                  <q-icon name="directions" class="text-h4" />
                  <b> Ngày cập nhật:</b> {{ toDate(post.updated_at) }}
                </div>
              </div>

              <div class="col-12"><br /></div>
            </q-card-section>
          </q-card>

          <div class="col-12"><br /></div>

          <!-- roomtype post  -->
          <q-card class="col-12 g-border my-card">
            <q-card-section class="row items-center justify-center">
              <div class="col-12 text-h6">
                <q-icon name="subtitles" class="g-icon-h1 text-primary" />
                Thông tin loại phòng
              </div>
              <div class="col-12"><br></div>
              <div class="col-11 row items-center">
                <div class="col-4">
                  <q-icon name="bolt" class="g-icon-h2" />
                  <b> Phí điện: </b
                  >{{ toNum(post.room_type.motel.elec_cost) }} VNĐ/kwh
                </div>
                <div class="col-4">
                  <q-icon name="water_drop" class="g-icon-h2" />
                  <b> Phí nước: </b
                  >{{ toNum(post.room_type.motel.water_cost) }} VNĐ/M3
                </div>
                <div class="col-4">
                  <q-icon name="paid" class="g-icon-h2" />
                  <b> Phụ thu: </b
                  >{{ toNum(post.room_type.motel.people_cost) }} VNĐ
                </div>
                <div class="col-4">
                  <q-icon name="paid" class="g-icon-h2" />
                  <b> Đặt cọc: </b
                  >{{ toNum(post.room_type.motel.deposit) }} VNĐ/Phòng
                </div>
                <div class="col-4">
                  <q-icon name="remove" class="g-icon-h2" />
                  <b> Diện tích: </b>{{ post.room_type.area }} M<sup>2</sup>
                </div>
                <div class="col-4 text-subtitle2">
                  <q-icon name="remove" class="g-icon-h2" />
                  <b>Cho phép:</b> {{ toNamNu(post.room_type) }}
                </div>
              </div>
              <div class="col-12"><br /></div>
              <div class="col-11 row items-center justify-center">
                <div class="col-12 row items-center"></div>
                <div class="col-12 text-subtitle2">
                  <q-icon name="subtitles" class="g-icon-h2" />
                  <b>Mô tả loại phòng: </b>
                </div>
                <div class="col-12 g-text-indent">
                  {{ post.room_type.content }}
                </div>
              </div>
              <div class="col-12"><br /></div>
            </q-card-section>
          </q-card>
          <div class="col-12"><br /></div>
          <q-card class="col-12 g-border">
            <q-card-section class="row items-center justify-center">
              <div class="col-12 text-h6">
                <q-icon name="subtitles" class="g-icon-h1 text-primary" />
                Thông tin trọ
              </div>
              <div class="col-12"><br /></div>
              <div class="col-11 row items-center justify-end">
                <div class="col-12 q-pb-md">
                  <q-icon name="remove" class="g-icon-h2 text-black" />
                  <b> Mô tả trọ:</b>
                  <div class="g-text-indent">
                    &nbsp; {{ post.room_type.motel.content }}
                  </div>
                </div>
                <div class="col-12 row items-center content-start">
                  <div class="col-4">
                    <q-icon name="remove" class="g-icon-h2" />
                    <b> Cổng:</b> mở
                    {{
                      post.room_type.motel.open +
                      "- đóng" +
                      post.room_type.motel.closed
                    }}
                  </div>
                  <div class="col-4">
                    <q-icon name="remove" class="g-icon-h2" />
                    <b>
                      {{
                        post.room_type.motel.camera == 1
                          ? "Camera: có "
                          : "Camera: không"
                      }}</b
                    >
                  </div>
                  <div class="col-4">
                    <q-icon name="remove" class="g-icon-h2" />
                    <b>Chổ để xe :</b> {{ post.room_type.motel.parking }}
                  </div>
                </div>
              </div>
              <div class="col-12"><br /></div>
              <div class="col-12 row justify-center items-center bg-dark br">
                <div class="col-12 text-subtitle2 text-white text-center">
                  Hình ảnh chung của trọ
                </div>
                <div class="col-12"><br /></div>
                <motel-show-imgs
                  class="col-12"
                  :img_details="post.room_type.motel.motel_imgs[0].img_details"
                ></motel-show-imgs>
              </div>
            </q-card-section>
          </q-card>
          <div class="col-12"><br></div>
          <q-card class="col-12 g-border">
            <q-card-section class="row items-center">
              <div class="col-12 text-h5 q-pb-md">
                <q-icon name="room" class="g-icon-h2 text-primary" />
                Vị trí trọ
              </div>
              <div class="col-12 justity-center row items-center">
                <div class="col-12">
                  <search-show-map :center="center"></search-show-map>
                </div>
              </div>
              <div class="col-12"><br /></div>
            </q-card-section>
          </q-card>
          <div class="col-12 row items-center">
            <!-- infor room -->
            <div class="col-12 justify-center row items-center">
              <!-- infor motel  -->
              <div class="col-12 row items-center">
                <div class="col-12"><br /></div>


                <!-- chinh sua hinh anh -->
                <q-card class="col-12 g-border row">
                  <q-card-section class="col-12">
                    <div class="text-h5">
                      <q-icon name="camera" />
                      &nbsp; Hình ảnh thiết bị trọ
                    </div>
                  </q-card-section>
                  <div
                    v-if="post"
                    class="col-12 row items-center justify-around"
                  >
                    <q-card class="my-card col-12 col-md-5">
                      <q-card-section>
                        <q-card-section class="col-9">
                          <div class="">
                            <div class="text-h6" style="display: inline">
                              <q-icon
                                name="fire_extinguisher"
                                class="q-pb-sm g-icon-h1"
                              />
                              Chữa cháy
                            </div>
                          </div>
                          <div class="">
                            <q-icon name="room" class="g-icon-h2" />
                            &nbsp; <b>Nơi Để:</b>
                            {{ post.room_type.motel.motel_imgs[1].place }}
                          </div>
                        </q-card-section>
                        <q-card-section class="row content-end justify-end">
                          <q-img
                            style="height: 500px"
                            :src="
                              baseUrlImg +
                              post.room_type.motel.motel_imgs[1].img_details[0]
                            "
                            @click="
                              seeImg(
                                post.room_type.motel.motel_imgs[1].img_details
                              )
                            "
                            spinner-color="primary"
                            spinner-size="82px"
                          >
                            <div
                              class="absolute-bottom text-subtitle1 text-center"
                            >
                              {{
                                toLength(
                                  post.room_type.motel.motel_imgs[1].img_details
                                )
                              }}
                              ảnh
                            </div>
                          </q-img>
                        </q-card-section>
                      </q-card-section>
                    </q-card>
                    <!-- <div class="col-2 gt-sm"></div> -->
                    <div class="col-12 lt-md"><br /></div>
                    <q-card class="my-card col-12 col-md-5">
                      <q-card-section>
                        <q-card-section class="col-9">
                          <div class="">
                            <div class="text-h6" style="display: inline">
                              <q-icon
                                name="home_repair_service"
                                class="g-icon-h2"
                              />
                              Sơ cứu
                            </div>
                          </div>
                          <div class="">
                            <q-icon name="room" class="g-icon-h2" />
                            &nbsp;<b>Nơi Để:</b>
                            {{ post.room_type.motel.motel_imgs[2].place }}
                          </div>
                        </q-card-section>
                        <q-card-section class="row content-end justify-end">
                          <q-img
                            style="height: 500px"
                            :src="
                              baseUrlImg +
                              post.room_type.motel.motel_imgs[2].img_details[0]
                            "
                            @click="
                              seeImg(
                                post.room_type.motel.motel_imgs[2].img_details
                              )
                            "
                            spinner-color="primary"
                            spinner-size="82px"
                          >
                            <div
                              class="absolute-bottom text-subtitle1 text-center"
                            >
                              {{
                                toLength(
                                  post.room_type.motel.motel_imgs[2].img_details
                                )
                              }}
                              ảnh
                            </div>
                          </q-img>
                        </q-card-section>
                      </q-card-section>
                    </q-card>
                  </div>
                  <q-card-section> </q-card-section>
                </q-card>
                <!-- chinh sua hinh anh -->
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="post.post_type_id == 2"
          class="col-12 row items-center justity-center"
        >
          <!-- <div class="col-12 row items-center justify-center bg-dark br">
            <div class="col-12 text-subtitle2 text-white text-center">
              <q-icon
                name="photo_camera"
                class="text-positive"
                style="font-size: 30px"
              />
              Hình ảnh loại phòng
            </div>
            <div class="col-12"><br /></div>
            <motel-show-imgs
              class="col-12"
              :img_details="post.room.room_type.img_details"
            ></motel-show-imgs>
          </div>
          <div class="col-12"><br /></div>

          <div class="col-12 row items-center">
            <div class="col-4 g-header-up text-h5">
              <q-icon name="apartment" class="text-h4 text-primary" />
              <b> Tên trọ: </b>
              <p class="text-black" style="display: inline">
                {{ post.room.room_type.motel.name }}
              </p>
            </div>
            <div class="col-6 text-h5">
              <q-icon name="home" class="text-h4 text-primary" />
              <b> Loại phòng: </b>
              <p class="text-black g-header-up" style="display: inline">
                {{ post.room.room_type.name }}
              </p>
            </div>
            <div class="col-4 text-orange text-h6">
              <q-icon name="paid" class="text-h4 text-primary" />
              <b class="text-black"> Giá phòng: </b
              >{{ toNum(post.room.room_type.cost) }} VNĐ
            </div>
            <div class="col-6 q-pt-md text-h6 text-accent">
              <q-icon name="bedroom_child" class="text-h4 text-primary" />
              <b class="text-black"> Phòng còn trống: </b>
              <div
                v-for="(room, index) in rooms"
                :key="index"
                style="display: inline-block"
              >
                <p v-if="room.room_status_id == 1">{{ room.name + ", " }}</p>
              </div>
            </div>

            <div class="col-12 row items-center">
              <div class="col-4">
                <q-icon name="room" class="text-h4" />
                &nbsp; {{ post.room.room_type.motel.address }}
              </div>
              <div>
                <q-icon name="directions" class="text-h4" />
                <b> Ngày cập nhật:</b> {{ toDate(post.updated_at) }}
              </div>
            </div>
            <div class="col-12"><br /></div>
            <div class="col-12 justify-center row items-center">
              <div class="col-12 text-h6">
                <q-icon name="subtitles" class="g-icon-h1 text-primary" />
                Thông tin loại phòng
              </div>
              <div class="col-11 row items-center">
                <div class="col-4">
                  <q-icon name="bolt" class="g-icon-h2" />
                  <b> Phí điện: </b
                  >{{ toNum(post.room.room_type.motel.elec_cost) }} VNĐ/kwh
                </div>
                <div class="col-4">
                  <q-icon name="water_drop" class="g-icon-h2" />
                  <b> Phí nước: </b
                  >{{ toNum(post.room.room_type.motel.water_cost) }} VNĐ/M3
                </div>
                <div class="col-4">
                  <q-icon name="paid" class="g-icon-h2" />
                  <b> Phụ thu: </b
                  >{{ toNum(post.room.room_type.motel.people_cost) }} VNĐ
                </div>
                <div class="col-4">
                  <q-icon name="paid" class="g-icon-h2" />
                  <b> Đặt cọc: </b
                  >{{ toNum(post.room.room_type.motel.deposit) }} VNĐ/Phòng
                </div>
                <div class="col-4">
                  <q-icon name="remove" class="g-icon-h2" />
                  <b> Diện tích: </b>{{ post.room.room_type.area }} M<sup
                    >3</sup
                  >
                </div>
                <div class="col-4 text-subtitle2">
                  <q-icon name="remove" class="g-icon-h2" />
                  <b>Cho phép:</b> {{ toNamNu(post.room.room_type) }}
                </div>
              </div>
              <div class="col-12"><br /></div>
              <div class="col-11 row items-center justify-center">
                <div class="col-12 row items-center"></div>
                <div class="col-12 text-subtitle2">
                  <q-icon name="subtitles" class="g-icon-h2" />
                  <b>Mô tả loại phòng: </b>
                </div>
                <div class="col-12 g-text-indent">
                  {{ post.room.room_type.content }}
                </div>
              </div>
              <div class="col-12"><br /></div>
              <div class="col-12">
                <hr />
              </div>

              <div class="col-12 row items-center">
                <div class="col-12 text-h6">
                  <q-icon name="subtitles" class="g-icon-h2 text-primary" />
                  Thông tin trọ
                </div>
                <div class="col-12"><br /></div>
                <div class="q-pl-lg col-12 row items-center justify-end">
                  <div class="col-12 q-pb-md">
                    <q-icon name="subtitles" class="g-icon-h2 text-black" />
                    <b> Mô tả trọ:</b>
                    <div class="g-text-indent">
                      &nbsp; {{ post.room.room_type.motel.content }}
                    </div>
                  </div>
                  <div class="col-12 q-pl-lg row items-center content-start">
                    <div class="col-4">
                      <q-icon name="remove" class="g-icon-h2" />
                      <b> Cổng:</b> mở
                      {{
                        post.room.room_type.motel.open +
                        "- đóng" +
                        post.room.room_type.motel.closed
                      }}
                    </div>
                    <div class="col-4">
                      <q-icon name="remove" class="g-icon-h2" />
                      <b>
                        {{
                          post.room.room_type.motel.camera == 1
                            ? "Camera: có "
                            : "Camera: không"
                        }}</b
                      >
                    </div>
                    <div class="col-4">
                      <q-icon name="remove" class="g-icon-h2" />
                      <b>Chổ để xe :</b> {{ post.room.room_type.motel.parking }}
                    </div>
                  </div>
                </div>
                <div class="col-12"><br /></div>
                <div class="col-12 row justify-center items-center bg-dark br">
                  <div class="col-12 text-subtitle2 text-white text-center">
                    Hình ảnh chung của trọ
                  </div>
                  <div class="col-12"><br /></div>
                  <motel-show-imgs
                    class="col-12"
                    :img_details="
                      post.room.room_type.motel.motel_imgs[0].img_details
                    "
                  ></motel-show-imgs>
                </div>
                <div class="col-12"><br /></div>
                <div class="col-12"><br /></div>
                <div class="col-12">
                  <hr />
                </div>
                <div class="col-12 text-h5 q-pb-md">
                  <q-icon name="room" class="g-icon-h2 text-primary" />
                  Vị trí trọ
                </div>
                <div class="col-12 justity-center row items-center">
                  <div class="col-12">
                    <search-show-map :center="center"></search-show-map>
                  </div>
                </div>
                <div class="col-12"><br /></div>
                <div class="col-12">
                  <hr />
                </div>
                <div class="col-12 row justify-center items-center bg-dark br">
                  <div class="col-12 text-subtitle2 text-white g-text-indent">
                    Hình ảnh
                    {{ post.room.room_type.motel.motel_imgs[1].content }}
                  </div>
                  <div class="col-12 text-subtitle2 text-white g-text-indent">
                    Nơi để: {{ post.room.room_type.motel.motel_imgs[1].place }}
                  </div>
                  <div class="col-12"><br /></div>
                  <motel-show-imgs
                    class="col-12"
                    :img_details="
                      post.room.room_type.motel.motel_imgs[1].img_details
                    "
                  ></motel-show-imgs>
                </div>
                <div class="col-12"><br /></div>
                <div class="col-12">
                  <hr />
                </div>
                <div class="col-12 row justify-center items-center bg-dark br">
                  <div class="col-12 text-subtitle2 text-white g-text-indent">
                    Hình ảnh
                    {{ post.room.room_type.motel.motel_imgs[2].content }}
                  </div>
                  <div class="col-12 text-subtitle2 text-white g-text-indent">
                    Nơi để: {{ post.room.room_type.motel.motel_imgs[2].place }}
                  </div>
                  <div class="col-12"><br /></div>
                  <motel-show-imgs
                    class="col-12"
                    :img_details="
                      post.room.room_type.motel.motel_imgs[2].img_details
                    "
                  ></motel-show-imgs>
                </div>
              </div>
            </div>
          </div> -->
          <q-card class="col-12 my-card g-border">
            <q-card-section>
              <!-- img roomtype  -->
              <div
                class="col-12 row items-center justify-center shadow-2 g-border"
              >
                <motel-show-imgs
                  class="col-12"
                  :img_details="post.room.room_type.img_details"
                ></motel-show-imgs>
              </div>
            </q-card-section>
            <q-card-section class="row items-center">
              <div class="col-4 g-header-up text-h5">
                <q-icon name="apartment" class="text-h4 text-primary" />
                <b> Tên trọ: </b>
                <p class="text-black" style="display: inline">
                  {{ post.room.room_type.motel.name }}
                </p>
              </div>

              <div class="col-6 text-h5">
                <q-icon name="home" class="text-h4 text-primary" />
                <b> Loại phòng: </b>
                <p class="text-black g-header-up" style="display: inline">
                  {{ post.room.room_type.name }}
                </p>
              </div>
              <div class="col-4 text-orange text-h6">
                <q-icon name="paid" class="text-h4 text-primary" />
                <b class="text-black"> Giá phòng: </b
                >{{ toNum(post.room.room_type.cost) }} VNĐ
              </div>
              <div class="col-12 row items-center">
                <div class="col-4">
                  <q-icon name="room" class="text-h4" />
                  &nbsp; {{ post.room.room_type.motel.address }}
                </div>
                <div>
                  <q-icon name="directions" class="text-h4" />
                  <b> Ngày cập nhật:</b> {{ toDate(post.updated_at) }}
                </div>
              </div>

              <div class="col-12"><br /></div>
            </q-card-section>
          </q-card>

          <div class="col-12"><br /></div>

          <!-- roomtype post  -->
          <q-card class="col-12 g-border my-card">
            <q-card-section class="row items-center justify-center">
              <div class="col-12 text-h6">
                <q-icon name="subtitles" class="g-icon-h1 text-primary" />
                Thông tin loại phòng
              </div>
              <div class="col-12"><br></div>
              <div class="col-11 row items-center">
                <div class="col-4">
                  <q-icon name="bolt" class="g-icon-h2" />
                  <b> Phí điện: </b
                  >{{ toNum(post.room.room_type.motel.elec_cost) }} VNĐ/kwh
                </div>
                <div class="col-4">
                  <q-icon name="water_drop" class="g-icon-h2" />
                  <b> Phí nước: </b
                  >{{ toNum(post.room.room_type.motel.water_cost) }} VNĐ/M3
                </div>
                <div class="col-4">
                  <q-icon name="paid" class="g-icon-h2" />
                  <b> Phụ thu: </b
                  >{{ toNum(post.room.room_type.motel.people_cost) }} VNĐ
                </div>
                <div class="col-4">
                  <q-icon name="paid" class="g-icon-h2" />
                  <b> Đặt cọc: </b
                  >{{ toNum(post.room.room_type.motel.deposit) }} VNĐ/Phòng
                </div>
                <div class="col-4">
                  <q-icon name="remove" class="g-icon-h2" />
                  <b> Diện tích: </b>{{ post.room.room_type.area }} M<sup>2</sup>
                </div>
                <div class="col-4 text-subtitle2">
                  <q-icon name="remove" class="g-icon-h2" />
                  <b>Cho phép:</b> {{ toNamNu(post.room.room_type) }}
                </div>
              </div>
              <div class="col-12"><br /></div>
              <div class="col-11 row items-center justify-center">
                <div class="col-12 row items-center"></div>
                <div class="col-12 text-subtitle2">
                  <q-icon name="subtitles" class="g-icon-h2" />
                  <b>Mô tả loại phòng: </b>
                </div>
                <div class="col-12 g-text-indent">
                  {{ post.room.room_type.content }}
                </div>
              </div>
              <div class="col-12"><br /></div>
            </q-card-section>
          </q-card>
          <div class="col-12"><br /></div>
          <q-card class="col-12 g-border">
            <q-card-section class="row items-center justify-center">
              <div class="col-12 text-h6">
                <q-icon name="subtitles" class="g-icon-h1 text-primary" />
                Thông tin trọ
              </div>
              <div class="col-12"><br /></div>
              <div class="col-11 row items-center justify-end">
                <div class="col-12 q-pb-md">
                  <q-icon name="remove" class="g-icon-h2 text-black" />
                  <b> Mô tả trọ:</b>
                  <div class="g-text-indent">
                    &nbsp; {{ post.room.room_type.motel.content }}
                  </div>
                </div>
                <div class="col-12 row items-center content-start">
                  <div class="col-4">
                    <q-icon name="remove" class="g-icon-h2" />
                    <b> Cổng:</b> mở
                    {{
                      post.room.room_type.motel.open +
                      "- đóng" +
                      post.room.room_type.motel.closed
                    }}
                  </div>
                  <div class="col-4">
                    <q-icon name="remove" class="g-icon-h2" />
                    <b>
                      {{
                        post.room.room_type.motel.camera == 1
                          ? "Camera: có "
                          : "Camera: không"
                      }}</b
                    >
                  </div>
                  <div class="col-4">
                    <q-icon name="remove" class="g-icon-h2" />
                    <b>Chổ để xe :</b> {{ post.room.room_type.motel.parking }}
                  </div>
                </div>
              </div>
              <div class="col-12"><br /></div>
              <div class="col-12 row justify-center items-center bg-dark br">
                <div class="col-12 text-subtitle2 text-white text-center">
                  Hình ảnh chung của trọ
                </div>
                <div class="col-12"><br /></div>
                <motel-show-imgs
                  class="col-12"
                  :img_details="post.room.room_type.motel.motel_imgs[0].img_details"
                ></motel-show-imgs>
              </div>
            </q-card-section>
          </q-card>
          <div class="col-12"><br></div>
          <q-card class="col-12 g-border">
            <q-card-section class="row items-center">
              <div class="col-12 text-h5 q-pb-md">
                <q-icon name="room" class="g-icon-h2 text-primary" />
                Vị trí trọ
              </div>
              <div class="col-12 justity-center row items-center">
                <div class="col-12">
                  <search-show-map :center="center"></search-show-map>
                </div>
              </div>
              <div class="col-12"><br /></div>
            </q-card-section>
          </q-card>
          <div class="col-12 row items-center">
            <!-- infor room -->
            <div class="col-12 justify-center row items-center">
              <!-- infor motel  -->
              <div class="col-12 row items-center">
                <div class="col-12"><br /></div>


                <!-- chinh sua hinh anh -->
                <q-card class="col-12 g-border row">
                  <q-card-section class="col-12">
                    <div class="text-h5">
                      <q-icon name="camera" />
                      &nbsp; Hình ảnh thiết bị trọ
                    </div>
                  </q-card-section>
                  <div
                    v-if="post"
                    class="col-12 row items-center justify-around"
                  >
                    <q-card class="my-card col-12 col-md-5">
                      <q-card-section>
                        <q-card-section class="col-9">
                          <div class="">
                            <div class="text-h6" style="display: inline">
                              <q-icon
                                name="fire_extinguisher"
                                class="q-pb-sm g-icon-h1"
                              />
                              Chữa cháy
                            </div>
                          </div>
                          <div class="">
                            <q-icon name="room" class="g-icon-h2" />
                            &nbsp; <b>Nơi Để:</b>
                            {{ post.room.room_type.motel.motel_imgs[1].place }}
                          </div>
                        </q-card-section>
                        <q-card-section class="row content-end justify-end">
                          <q-img
                            style="height: 500px"
                            :src="
                              baseUrlImg +
                              post.room.room_type.motel.motel_imgs[1].img_details[0]
                            "
                            @click="
                              seeImg(
                                post.room.room_type.motel.motel_imgs[1].img_details
                              )
                            "
                            spinner-color="primary"
                            spinner-size="82px"
                          >
                            <div
                              class="absolute-bottom text-subtitle1 text-center"
                            >
                              {{
                                toLength(
                                  post.room.room_type.motel.motel_imgs[1].img_details
                                )
                              }}
                              ảnh
                            </div>
                          </q-img>
                        </q-card-section>
                      </q-card-section>
                    </q-card>
                    <!-- <div class="col-2 gt-sm"></div> -->
                    <div class="col-12 lt-md"><br /></div>
                    <q-card class="my-card col-12 col-md-5">
                      <q-card-section>
                        <q-card-section class="col-9">
                          <div class="">
                            <div class="text-h6" style="display: inline">
                              <q-icon
                                name="home_repair_service"
                                class="g-icon-h2"
                              />
                              Sơ cứu
                            </div>
                          </div>
                          <div class="">
                            <q-icon name="room" class="g-icon-h2" />
                            &nbsp;<b>Nơi Để:</b>
                            {{ post.room.room_type.motel.motel_imgs[2].place }}
                          </div>
                        </q-card-section>
                        <q-card-section class="row content-end justify-end">
                          <q-img
                            style="height: 500px"
                            :src="
                              baseUrlImg +
                              post.room.room_type.motel.motel_imgs[2].img_details[0]
                            "
                            @click="
                              seeImg(
                                post.room.room_type.motel.motel_imgs[2].img_details
                              )
                            "
                            spinner-color="primary"
                            spinner-size="82px"
                          >
                            <div
                              class="absolute-bottom text-subtitle1 text-center"
                            >
                              {{
                                toLength(
                                  post.room.room_type.motel.motel_imgs[2].img_details
                                )
                              }}
                              ảnh
                            </div>
                          </q-img>
                        </q-card-section>
                      </q-card-section>
                    </q-card>
                  </div>
                  <q-card-section> </q-card-section>
                </q-card>
                <!-- chinh sua hinh anh -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="post" class="col-12 items-center justify-center">
        <div class="col-12"><br /></div>
        <search-comment-render
          :post_id="post.id"
          class="col-12"
        ></search-comment-render>
      </div>
    </div>
    <q-footer
      class="col-12 row justify-center items-center bg-blue-2 pd"
      v-model="footer"
      elevated
      bordered
    >
      <q-card-actions align="center">
        <q-btn
          color="negative"
          icon="person"
          label=" Báo cáo"
          @click="isReport = true"
          rounded
        />
        <q-btn
          rounded
          color="positive"
          icon="add"
          no-caps
          label=" Xin vào trọ"
          @click="confirm = true"
        />
      </q-card-actions>
    </q-footer>
    <q-dialog v-model="confirm" persistent>
      <search-send-into-room
        :postId="post.id"
        :postTypeId="post.post_type_id"
        :rooms="rooms"
        @closePU="confirm = false"
      ></search-send-into-room>
    </q-dialog>
    <q-dialog v-model="isReport">
      <user-report
        style="min-width: 70%"
        :type="1"
        :postId="postId"
      ></user-report>
    </q-dialog>
    <q-dialog v-model="isSeeImgs">
      <gobal-img-detail
        style="min-width: 90%"
        v-if="thisImgs"
        :img_details="thisImgs"
      ></gobal-img-detail>
    </q-dialog>
  </q-page>
</template>

<script>
import MotelShowImgs from "../components/MotelShowImgs.vue";
import SearchShowMap from "../components/SearchShowMap.vue";
import SearchSendIntoRoom from "../components/SearchSendIntoRoom.vue";
import SearchCommentRender from "../components/SearchCommentRender.vue";
import GobalImgDetail from "../components/GobalImgDetail.vue";
import UserReport from "../components/UserReport.vue";
import sp from "../boot/support";
import td from "../boot/noti/date";
export default {
  setup() {
    function toNamNu(data) {
      if (data.everyone == 1) {
        return " Bất kì giới tính";
      } else {
        if (data.male == 1 && data.female == 1) {
          return " Hoặc nam hoặc nữ ";
        } else {
          return data.male == 1 ? "Chỉ cho nữ " : "Chỉ cho nam";
        }
      }
    }
    function ArrCount(data) {
      return data.length;
    }
    return {
      toNamNu,
      ArrCount,
    };
  },
  data() {
    return {
      postId: this.$route.params.post_id,
      post: null,
      rooms: null,
      center: {},
      baseUrlImg: this.$api.defaults.baseURL + "/image/",
      confirm: false,
      isReport: false,
      thisImgs: null,
      isSeeImgs: false,
    };
  },
  async created() {
    const resPost = await this.$api.get(
      `detailPost/${this.$route.params.post_id}`
    );
    if (resPost.data?.statusCode == 1) {
      this.post = resPost.data?.post;
      // console.log(this.post.room.room_type.motel.id);
      if (resPost.data?.post.post_type_id == 1) {
        this.center = {
          lat: resPost.data.post.room_type.motel.latitude,
          lng: resPost.data.post.room_type.motel.longitude,
        };
        console.log(this.center);
      }
      if (resPost.data?.post.post_type_id == 2) {
        this.center = {
          lat: resPost.data.post.room.room_type.motel.latitude,
          lng: resPost.data.post.room.room_type.motel.longitude,
        };
        console.log(this.center);
      }
    } else {
      console.log("test");
    }
    if (resPost.data?.rooms) {
      this.rooms = resPost.data.rooms;
    }
  },
  methods: {
    toDate(date) {
      return td.toDate(date);
    },
    toNum(num) {
      return sp.toNum(num);
    },
    toLength(arr) {
      return sp.length(arr);
    },
    seeImg(img_details) {
      this.thisImgs = img_details;
      this.isSeeImgs = true;
      console.log(img_details);
    },
  },
  components: {
    MotelShowImgs,
    SearchShowMap,
    SearchSendIntoRoom,
    SearchCommentRender,
    UserReport,
    GobalImgDetail,
  },
};
</script>

<style lang="sass" scoped>
.mr
  margin: 10px 0px
.pd
  padding: 5px 0px
.br
  padding: 10px 0px
  border-radius: 5px
  box-shadow: 0px 1px 3px $blue-2

</style>
