<template>
  <q-page padding class="row justify-center">
    <div class="col-12 col-md-10">
      <div v-if="post" class="col-12 row items-center">
        <div
          v-if="post.post_type_id == 1"
          class="col-12 row items-center justity-center"
        >
          <!-- img roomtype  -->
          <div class="col-12 row items-center justify-center bg-dark br">
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
              :img_details="post.room_type.img_details"
            ></motel-show-imgs>
          </div>
          <div class="col-12"><br /></div>

          <!-- roomtype post  -->
          <div class="col-12 row items-center">
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
                <b> Ngày cập nhật:</b> {{ toDate(post.updated_at)}}
               </div>
            </div>
            <div class="col-12"><br /></div>
            <div class="col-12">
              <hr />
            </div>
            <!-- infor room -->
            <div class="col-12 justify-center row items-center">
              <div class="col-12 text-h6">
                <q-icon name="subtitles" class="g-icon-h1 text-primary" />
                Thông tin loại phòng
              </div>
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
                  <b> Diện tích: </b>{{ post.room_type.area }} M2
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
              <div class="col-12">
                <hr />
              </div>

              <!-- infor motel  -->
              <div class="col-12 row items-center">
                <div class="col-12 text-h6">
                  <q-icon name="subtitles" class="g-icon-h1 text-primary" />
                  Thông tin trọ
                </div>
                <div class="col-12"><br /></div>
                <div class="q-pl-lg col-12 row items-center justify-end">
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
                <div class="col-12"><br></div>
                <div class="col-12 row justify-center items-center bg-dark br">
                  <div class="col-12 text-subtitle2 text-white text-center">
                    Hình ảnh chung của trọ
                  </div>
                  <div class="col-12"><br /></div>
                  <motel-show-imgs
                    class="col-12"
                    :img_details="
                      post.room_type.motel.motel_imgs[0].img_details
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
                    Hình ảnh {{ post.room_type.motel.motel_imgs[1].content }}
                  </div>
                  <div class="col-12 text-subtitle2 text-white g-text-indent">
                    Nơi để: {{ post.room_type.motel.motel_imgs[1].place }}
                  </div>
                  <div class="col-12"><br /></div>
                  <motel-show-imgs
                    class="col-12"
                    :img_details="
                      post.room_type.motel.motel_imgs[1].img_details
                    "
                  ></motel-show-imgs>
                </div>
                <div class="col-12"><br /></div>
                <div class="col-12">
                  <hr />
                </div>
                <div class="col-12 row justify-center items-center bg-dark br">
                  <div class="col-12 text-subtitle2 text-white g-text-indent">
                    Hình ảnh {{ post.room_type.motel.motel_imgs[2].content }}
                  </div>
                  <div class="col-12 text-subtitle2 text-white g-text-indent">
                    Nơi để: {{ post.room_type.motel.motel_imgs[2].place }}
                  </div>
                  <div class="col-12"><br /></div>
                  <motel-show-imgs
                    class="col-12"
                    :img_details="
                      post.room_type.motel.motel_imgs[2].img_details
                    "
                  ></motel-show-imgs>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div
          v-if="post.post_type_id == 2"
          class="col-12 row items-center justity-center"
        >
          <div class="col-12 row items-center justify-center bg-dark br">
            <div class="col-12 text-subtitle2 text-white text-center">
              <q-icon
                name="photo_camera"
                class="text-positive"
                style="font-size: 30px"
              />
              Hình ành phòng
            </div>
            <div class="col-12"><br /></div>
            <motel-show-imgs
              class="col-12"
              :img_details="post.room.room_type.img_details"
            ></motel-show-imgs>
          </div>
          <div class="col-12"><br /></div>
          <div class="col-12 row items-center">
            <div
              class="col-12 text-h6 text-blue g-header-up"
              style="padding: 0px 5px"
            >
              {{ post.title }}- {{ post.room.room_type.name }}
            </div>
            <div class="col-12">
              <q-chip icon="room" :label="post.room.room_type.motel.address" />
            </div>
            <div class="col-12 row items-center">
              <div class="text-h6 text-green col-5 col-md-3 g-header-up">
                {{ post.room.room_type.name }}
              </div>
              <div class="col-6 text-h6 text-red">
                Phòng đang đăng bài: {{ post.room.name }}
              </div>
              <q-chip
                icon="directions"
                :label="`Ngày cập nhật: ${toDate(post.updated_at)}`"
              />
            </div>
            <div class="col-12"><br /></div>
            <div class="col-12">
              <hr />
            </div>
            <div class="col-12 justify-center row items-center">
              <div class="col-12 text-h6">Thông tin loại phòng</div>
              <div class="col-11 row items-center">
                <div class="col-6 text-positive">
                  <b>Phòng: </b>{{ post.room.room_type.cost }} VNĐ
                </div>
                <div class="col-6">
                  <b> Điện: </b
                  >{{ post.room.room_type.motel.elec_cost }} VNĐ/kwh
                </div>
                <div class="col-6">
                  <b> Nước: </b
                  >{{ post.room.room_type.motel.water_cost }} VNĐ/m3
                </div>
                <div class="col-6">
                  <b> Người: </b
                  >{{ post.room.room_type.motel.people_cost }} VNĐ/1ng
                </div>
                <div class="col-6">
                  <b> Đặt cọc: </b
                  >{{ post.room.room_type.motel.people_cost }} VNĐ/phòng
                </div>
                <div class="col-6">
                  <b> Diện tích: </b>{{ post.room.room_type.area }} M2
                </div>
              </div>
              <div class="col-12"><br /></div>
              <div class="col-11 row items-center justify-center">
                <div class="col-12 row items-center">
                  <div class="col-8 text-h6 text-red">
                    Cho phép: {{ toNamNu(post.room.room_type) }}
                  </div>
                </div>
                <div class="col-12">
                  <b>Mô tả chi tiết: </b>
                </div>
                <div class="col-12">{{ post.room.room_type.content }}</div>
              </div>
              <div class="col-12"><br /></div>
              <div class="col-12">
                <hr />
              </div>
              <div class="col-12 row items-center justify-center">
                <div class="col-12 text-h6">Thông tin người dang ở</div>
                <div class="col-11 row items-center justify-center">
                  <div class="text-subtitle2 col-12">
                    Số người đang ở :
                    {{ ArrCount(post.room.tenant.tenant_users) }}
                  </div>
                  <div class="col-12 text-subtitle2 text-accent">
                    Nội dung bài đăng :
                  </div>
                  <div class="col-10">{{ post.conpound_content }}</div>
                </div>
              </div>
              <div class="col-12"><br /></div>
              <div class="col-12">
                <hr />
              </div>
              <div class="col-12 row items-center">
                <div class="col-12 text-h6">Thông tin trọ</div>
                <div class="col-12"><br /></div>
                <div class="col-12 row justify-center items-center bg-dark br">
                  <div class="col-12 text-subtitle2 text-white text-center">
                    <q-icon
                      name="photo_camera"
                      class="text-positive"
                      style="font-size: 30px"
                    />
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
                <div class="col-11 row items-center justify-center">
                  <div
                    class="
                      col-12
                      items-center
                      justify-center
                      text-h6 text-positive
                    "
                  >
                    Tên trọ: {{ post.room.room_type.motel.name }}
                  </div>
                  <div class="col-12"><br /></div>
                  <div class="col-11">
                    <b> Địa chỉ: </b>{{ post.room.room_type.motel.address }}
                  </div>
                  <div class="col-11">
                    <b> Giờ: mở</b>
                    {{
                      post.room.room_type.motel.open +
                      "- đóng" +
                      post.room.room_type.motel.closed
                    }}
                  </div>
                  <div class="col-5">
                    <b>
                      {{
                        post.room.room_type.motel.camera == 1
                          ? "camera: Có "
                          : "camera: không"
                      }}</b
                    >
                  </div>
                  <div class="col-6">
                    <b>Chổ để xe :</b> {{ post.room.room_type.motel.parking }}
                  </div>
                  <div class="col-11 text-subtitle2 text-accent">Mô tả</div>
                  <div class="col-11">
                    {{ post.room.room_type.motel.content }}
                  </div>
                </div>
                <div class="col-12"><br /></div>
                <div class="col-12">
                  <hr />
                </div>
                <div class="col-12 justity-center row items-center">
                  <div class="col-12 text-subtitle2 text-primary">
                    Vị trí nhà trọ
                  </div>
                  <div class="col-12">
                    <search-show-map :center="center"></search-show-map>
                  </div>
                </div>
                <div class="col-12"><br /></div>
                <div class="col-12">
                  <hr />
                </div>
                <div class="col-12 row justify-center items-center bg-dark br">
                  <div class="col-12 text-subtitle2 text-white">
                    <q-icon
                      name="photo_camera"
                      class="text-positive"
                      style="font-size: 30px"
                    />
                    Hình ảnh
                    {{ post.room.room_type.motel.motel_imgs[1].content }}
                  </div>
                  <div class="col-12"><br /></div>
                  <motel-show-imgs
                    class="col-12"
                    :img_details="
                      post.room.room_type.motel.motel_imgs[1].img_details
                    "
                  ></motel-show-imgs>
                  <div class="col-12 text-subtitle2 text-white">
                    Nơi để: {{ post.room.room_type.motel.motel_imgs[1].place }}
                  </div>
                </div>
                <div class="col-12"><br /></div>
                <div class="col-12">
                  <hr />
                </div>
                <div class="col-12 row justify-center items-center bg-dark br">
                  <div class="col-12 text-subtitle2 text-white">
                    <q-icon
                      name="photo_camera"
                      class="text-positive"
                      style="font-size: 30px"
                    />
                    Hình ảnh
                    {{ post.room.room_type.motel.motel_imgs[2].content }}
                  </div>
                  <div class="col-12"><br /></div>
                  <motel-show-imgs
                    class="col-12"
                    :img_details="
                      post.room.room_type.motel.motel_imgs[2].img_details
                    "
                  ></motel-show-imgs>
                  <div class="col-12 text-subtitle2 text-white">
                    Nơi để: {{ post.room.room_type.motel.motel_imgs[2].place }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> -->
        <div
          v-if="post.post_type_id == 2"
          class="col-12 row items-center justity-center"
        >
          <!-- img roomtype  -->
          <div class="col-12 row items-center justify-center bg-dark br">
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

          <!-- roomtype post  -->
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
                <b> Ngày cập nhật:</b> {{ toDate(post.updated_at)}}
               </div>
            </div>
            <div class="col-12"><br /></div>
            <div class="col-12">
              <hr />
            </div>
            <!-- infor room -->
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
                  <b> Diện tích: </b>{{ post.room.room_type.area }} M2
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

              <!-- infor motel  -->
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
                <div class="col-12"><br></div>
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
                    Hình ảnh {{ post.room.room_type.motel.motel_imgs[1].content }}
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
                    Hình ảnh {{ post.room.room_type.motel.motel_imgs[2].content }}
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
  </q-page>
</template>

<script>
import MotelShowImgs from "../components/MotelShowImgs.vue";
import SearchShowMap from "../components/SearchShowMap.vue";
import SearchSendIntoRoom from "../components/SearchSendIntoRoom.vue";
import SearchCommentRender from "../components/SearchCommentRender.vue";
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
      confirm: false,
      isReport: false,
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
  },
  components: {
    MotelShowImgs,
    SearchShowMap,
    SearchSendIntoRoom,
    SearchCommentRender,
    UserReport,
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
