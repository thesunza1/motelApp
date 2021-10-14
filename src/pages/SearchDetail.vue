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
              hình ành phòng
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
            <div class="col-12 text-h6 text-blue" style="padding: 0px 5px">
              {{ post.title }}- {{ post.room_type.name }}
            </div>
            <div class="col-12">
              <q-chip icon="room" :label="post.room_type.motel.address" />
            </div>
            <div class="col-12 row items-center">
              <div class="text-h6 text-green col-5 col-md-3">
                {{ post.room_type.name }}
              </div>
              <q-chip
                class="col-4 col-md-4"
                icon="directions"
              >
                {{ toDate(post.updated_at) }}
              </q-chip>
              <q-chip
                class="col-2 col-md-4"
                icon="directions"
                :label="`id: ${post.id}`"
              />
            </div>
            <div class="col-12 text-subtitle2 text-accent">
              phòng trống còn :
              <div
                v-for="(room, index) in rooms"
                :key="index"
                style="display: inline-block"
              >
                <p v-if="room.room_status_id == 1"> {{ room.name + ", " }}</p>
              </div>
            </div>
            <div class="col-12"><br /></div>
            <div class="col-12">
              <hr />
            </div>

            <!-- infor room -->
            <div class="col-12 justify-center row items-center">
              <div class="col-12 text-h6">thông tin loại phòng</div>
              <div class="col-11 row items-center">
                <div class="col-6 text-positive">
                  <b>phòng: </b>{{ post.room_type.cost }} vnd
                </div>
                <div class="col-6">
                  <b> điện: </b>{{ post.room_type.motel.elec_cost }} vnd/kwh
                </div>
                <div class="col-6">
                  <b> nước: </b>{{ post.room_type.motel.water_cost }} vnd/m3
                </div>
                <div class="col-6">
                  <b> người: </b>{{ post.room_type.motel.people_cost }} vnd/1ng
                </div>
                <div class="col-6">
                  <b> đặt cọc: </b
                  >{{ post.room_type.motel.people_cost }} vnd/phòng
                </div>
                <div class="col-6">
                  <b> diện tích: </b>{{ post.room_type.area }} m2
                </div>
              </div>
              <div class="col-12"><br /></div>
              <div class="col-11 row items-center justify-center">
                <div class="col-12 row items-center">
                  <div class="col-8 text-h6 text-red">
                    cho phép: {{ toNamNu(post.room_type) }}
                  </div>
                </div>
                <div class="col-12">
                  <b>mô tả: </b>
                </div>
                <div class="col-12">{{ post.room_type.content }}</div>
              </div>
              <div class="col-12"><br /></div>
              <div class="col-12">
                <hr />
              </div>

              <!-- infor motel  -->
              <div class="col-12 row items-center">
                <div class="col-12 text-h6">thông tin trọ</div>
                <div class="col-12"><br /></div>
                <div class="col-12 row justify-center items-center bg-dark br">
                  <div class="col-12 text-subtitle2 text-white text-center">
                    hình ảnh chung của trọ
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
                <div class="col-11 row items-center justify-center">
                  <div
                    class="
                      col-12
                      items-center
                      justify-center
                      text-h6 text-positive
                    "
                  >
                    tên trọ: {{ post.room_type.motel.name }}
                  </div>
                  <div class="col-12">
                    <b>địa chỉ: </b>{{ post.room_type.motel.address }}
                  </div>
                  <div class="col-12">
                    <b> giờ: mở</b>
                    {{
                      post.room_type.motel.open +
                      "- đống" +
                      post.room_type.motel.closed
                    }}
                  </div>
                  <div class="col-6">
                    <b>
                      {{
                        post.room_type.motel.camera == 1
                          ? "camera: có "
                          : "camera: không"
                      }}</b
                    >
                  </div>
                  <div class="col-6">
                    <b>chổ để xe :</b> {{ post.room_type.motel.parking }}
                  </div>
                  <div class="col-12 text-subtitle2 text-accent">mô tả</div>
                  <div class="col-12">{{ post.room_type.motel.content }}</div>
                </div>
                <div class="col-12"><br /></div>
                <div class="col-12">
                  <hr />
                </div>
                <div class="col-12 justity-center row items-center">
                  <div class="col-12 text-subtitle2 text-primary">bản đồ</div>
                  <div class="col-12">
                    <search-show-map :center="center"></search-show-map>
                  </div>
                </div>
                <div class="col-12"><br /></div>
                <div class="col-12">
                  <hr />
                </div>
                <div class="col-12 row justify-center items-center bg-dark br">
                  <div class="col-12 text-subtitle2 text-white text-center">
                    hình ảnh {{ post.room_type.motel.motel_imgs[1].content }}
                  </div>
                  <div class="col-12"><br /></div>
                  <motel-show-imgs
                    class="col-12"
                    :img_details="
                      post.room_type.motel.motel_imgs[1].img_details
                    "
                  ></motel-show-imgs>
                  <div class="col-12 text-subtitle2 text-white text-center">
                    nơi để: {{ post.room_type.motel.motel_imgs[1].place }}
                  </div>
                </div>
                <div class="col-12"><br /></div>
                <div class="col-12">
                  <hr />
                </div>
                <div class="col-12 row justify-center items-center bg-dark br">
                  <div class="col-12 text-subtitle2 text-white text-center">
                    hình ảnh {{ post.room_type.motel.motel_imgs[2].content }}
                  </div>
                  <div class="col-12"><br /></div>
                  <motel-show-imgs
                    class="col-12"
                    :img_details="
                      post.room_type.motel.motel_imgs[2].img_details
                    "
                  ></motel-show-imgs>
                  <div class="col-12 text-subtitle2 text-white text-center">
                    nơi để: {{ post.room_type.motel.motel_imgs[2].place }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
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
              hình ành phòng
            </div>
            <div class="col-12"><br /></div>
            <motel-show-imgs
              class="col-12"
              :img_details="post.room.room_type.img_details"
            ></motel-show-imgs>
          </div>
          <div class="col-12"><br /></div>
          <div class="col-12 row items-center">
            <div class="col-12 text-h6 text-blue" style="padding: 0px 5px">
              {{ post.title }}- {{ post.room.room_type.name }}
            </div>
            <div class="col-12">
              <q-chip icon="room" :label="post.room.room_type.motel.address" />
            </div>
            <div class="col-12 row items-center">
              <div class="text-h6 text-green col-5 col-md-3">
                {{ post.room.room_type.name }}
              </div>
              <div class="col-6 text-h6 text-red">
                phòng đang đăng bài: {{ post.room.name }}
              </div>
              <q-chip
                class="col-6 col-md-6"
                icon="directions"
                :label="toDate(post.updated_at)"
              />
              <q-chip
                class="col-5 col-md-5"
                icon="directions"
                :label="`id: ${post.id}`"
              />
            </div>
            <div class="col-12"><br /></div>
            <div class="col-12">
              <hr />
            </div>
            <div class="col-12 justify-center row items-center">
              <div class="col-12 text-h6">thông tin loại phòng</div>
              <div class="col-11 row items-center">
                <div class="col-6 text-positive">
                  <b>phòng: </b>{{ post.room.room_type.cost }} vnd
                </div>
                <div class="col-6">
                  <b> điện: </b
                  >{{ post.room.room_type.motel.elec_cost }} vnd/kwh
                </div>
                <div class="col-6">
                  <b> nước: </b
                  >{{ post.room.room_type.motel.water_cost }} vnd/m3
                </div>
                <div class="col-6">
                  <b> người: </b
                  >{{ post.room.room_type.motel.people_cost }} vnd/1ng
                </div>
                <div class="col-6">
                  <b> đặt cọc: </b
                  >{{ post.room.room_type.motel.people_cost }} vnd/phòng
                </div>
                <div class="col-6">
                  <b> diện tích: </b>{{ post.room.room_type.area }} m2
                </div>
              </div>
              <div class="col-12"><br /></div>
              <div class="col-11 row items-center justify-center">
                <div class="col-12 row items-center">
                  <div class="col-8 text-h6 text-red">
                    cho phép: {{ toNamNu(post.room.room_type) }}
                  </div>
                </div>
                <div class="col-12">
                  <b>mô tả: </b>
                </div>
                <div class="col-12">{{ post.room.room_type.content }}</div>
              </div>
              <div class="col-12"><br /></div>
              <div class="col-12">
                <hr />
              </div>
              <div class="col-12 row items-center justify-center">
                <div class="col-12 text-h6">thông tin người dang ở</div>
                <div class="col-11 row items-center justify-center">
                  <div class="text-subtitle2 col-12">
                    số người đang ở :
                    {{ ArrCount(post.room.tenant.tenant_users) }}
                  </div>
                  <div class="col-12 text-subtitle2 text-accent">
                    nội dung bài đăng :
                  </div>
                  <div class="col-10">{{ post.conpound_content }}</div>
                </div>
              </div>
              <div class="col-12"><br /></div>
              <div class="col-12">
                <hr />
              </div>
              <div class="col-12 row items-center">
                <div class="col-12 text-h6">thông tin trọ</div>
                <div class="col-12"><br /></div>
                <div class="col-12 row justify-center items-center bg-dark br">
                  <div class="col-12 text-subtitle2 text-white text-center">
                    <q-icon
                      name="photo_camera"
                      class="text-positive"
                      style="font-size: 30px"
                    />
                    hình ảnh chung của trọ
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
                    tên trọ: {{ post.room.room_type.motel.name }}
                  </div>
                  <div class="col-12"><br /></div>
                  <div class="col-11">
                    <b>địa chỉ: </b>{{ post.room.room_type.motel.address }}
                  </div>
                  <div class="col-11">
                    <b> giờ: mở</b>
                    {{
                      post.room.room_type.motel.open +
                      "- đống" +
                      post.room.room_type.motel.closed
                    }}
                  </div>
                  <div class="col-5">
                    <b>
                      {{
                        post.room.room_type.motel.camera == 1
                          ? "camera: có "
                          : "camera: không"
                      }}</b
                    >
                  </div>
                  <div class="col-6">
                    <b>chổ để xe :</b> {{ post.room.room_type.motel.parking }}
                  </div>
                  <div class="col-11 text-subtitle2 text-accent">mô tả</div>
                  <div class="col-11">
                    {{ post.room.room_type.motel.content }}
                  </div>
                </div>
                <div class="col-12"><br /></div>
                <div class="col-12">
                  <hr />
                </div>
                <div class="col-12 justity-center row items-center">
                  <div class="col-12 text-subtitle2 text-primary">bản đồ</div>
                  <div class="col-12">
                    <search-show-map :center="center"></search-show-map>
                  </div>
                </div>
                <div class="col-12"><br /></div>
                <div class="col-12">
                  <hr />
                </div>
                <div class="col-12 row justify-center items-center bg-dark br">
                  <div class="col-12 text-subtitle2 text-white text-center">
                    <q-icon
                      name="photo_camera"
                      class="text-positive"
                      style="font-size: 30px"
                    />
                    hình ảnh
                    {{ post.room.room_type.motel.motel_imgs[1].content }}
                  </div>
                  <div class="col-12"><br /></div>
                  <motel-show-imgs
                    class="col-12"
                    :img_details="
                      post.room.room_type.motel.motel_imgs[1].img_details
                    "
                  ></motel-show-imgs>
                  <div class="col-12 text-subtitle2 text-white text-center">
                    nơi để: {{ post.room.room_type.motel.motel_imgs[1].place }}
                  </div>
                </div>
                <div class="col-12"><br /></div>
                <div class="col-12">
                  <hr />
                </div>
                <div class="col-12 row justify-center items-center bg-dark br">
                  <div class="col-12 text-subtitle2 text-white text-center">
                    <q-icon
                      name="photo_camera"
                      class="text-positive"
                      style="font-size: 30px"
                    />
                    hình ảnh
                    {{ post.room.room_type.motel.motel_imgs[2].content }}
                  </div>
                  <div class="col-12"><br /></div>
                  <motel-show-imgs
                    class="col-12"
                    :img_details="
                      post.room.room_type.motel.motel_imgs[2].img_details
                    "
                  ></motel-show-imgs>
                  <div class="col-12 text-subtitle2 text-white text-center">
                    nơi để: {{ post.room.room_type.motel.motel_imgs[2].place }}
                  </div>
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
          label=" báo cáo"
          @click="isReport = true"
        />
        <q-btn
          color="positive"
          icon="add"
          label=" xin vào trọ"
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
    <q-dialog v-model="isReport" >
      <user-report style="min-width: 70%" :type="1" :postId="postId"></user-report>
    </q-dialog>
  </q-page>
</template>

<script>
import MotelShowImgs from "../components/MotelShowImgs.vue";
import SearchShowMap from "../components/SearchShowMap.vue";
import SearchSendIntoRoom from "../components/SearchSendIntoRoom.vue";
import SearchCommentRender from "../components/SearchCommentRender.vue";
import UserReport from "../components/UserReport.vue";

import td from "../boot/noti/date";
export default {
  setup() {
    function toNamNu(data) {
      if (data.everyone == 1) {
        return " bất kì giới tính";
      } else {
        if (data.male == 1 && data.female == 1) {
          return " hoặc nam hoặc nữ ";
        } else {
          return data.male == 1 ? "chỉ cho nữ " : "chỉ cho nam";
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
      isReport: false ,
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
    }
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
