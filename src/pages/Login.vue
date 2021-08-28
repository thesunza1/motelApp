<template>
  <q-page  padding>
    <q-dialog v-model="isError" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="negative" text-color="white" class="q-mr-20" />
          <span class="q-ml-sm"> {{ statusMes  }} </span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="oke" color="negative" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-ajax-bar position="top" size="4px" color="red" />
    <div class="row justify-center">
      <q-card class="my-card col-12 col-md-8">
        <q-card-section>
          <h3 class="text-center">login</h3>
        </q-card-section>
        <q-card-section class="row justify-center">
          <q-input class="col-11" v-model="email" type="text" label="email" />
          <q-input
            class="col-11"
            v-model="password"
            type="text"
            label="password"
          />
        </q-card-section>
        <q-card-section> </q-card-section>
        <q-card-actions horizontal align="center">
          <q-btn flat label="Login" @click="login" />
          <router-link to="/">
            <q-btn flat label="user register"  class="bg-primary text-white" />
          </router-link>
          <q-btn flat label="motel register" />
        </q-card-actions>
      </q-card>
    </div>
    <div class="lt-md" style="height:100vh;"></div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      isError : false ,
      statusMes : '' ,
    };
  },
  methods: {
    async login() {
      let response = await this.$api.post('/login',{
        email: this.email,
        password: this.password
      });
      const loginStatus = response.data.loginStatus ;
      if (loginStatus ==1) {
        this.isError = true ;
        this.statusMes = 'email không tồn tại';
      }
      else if(loginStatus ==2) {
        this.isError = true ;
        this.statusMes = 'password không đúng';
      }
      else {
        this.$store.dispatch('User/user', response.data.user);
        localStorage.setItem('key', response.data.tokenUser);
        this.$router.push('/');
      }
    }
  }
};
</script>

<style scoped lang='sass'>
a
  text-decoration: none
.my-card
  margin-top: 10vh
</style>
