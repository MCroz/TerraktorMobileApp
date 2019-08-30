<template>
    <q-layout view="lHh lpr lFf" class="shadow-2 rounded-borders">

      <div class="row justify-center items-center" style="height: 100vh;">
        <q-form class="col-12" ref="myForm">
          <q-card dark bordered class="bg-grey-9"> 
            <q-card-section>
              <div class="row justify-center">
                <div class="text-h6">TERRAKTOR</div>
              </div>
            </q-card-section>
            <q-card-section>
              <div class="col items-center">
                <q-input dark v-model="Username" label="Username">
                  <template v-slot:prepend>
                    <q-icon color="white" name="account_circle" />
                  </template>
                </q-input>
                <q-input dark v-model="Password" label="Password" :type="showPasswordString">
                  <template v-slot:prepend>
                    <q-icon color="white" name="vpn_key" />
                  </template>
                  <template v-slot:append>
                    <q-icon color="white" :name="showPasswordIconString" @click="showPassword" />
                  </template>
                </q-input>

                <q-input dark v-model="ServerAddress" label="Server Address">
                </q-input>

              </div>
            </q-card-section>
            <q-card-actions align="center">
              <q-btn color="black" class="full-width q-mt-md" label="Login" @click="onClickLogin"/>
              <q-btn color="black" class="full-width q-mt-md" label="Forgot Password" @click="onClickForgotPassword"/>
              <q-btn color="black" class="full-width q-mt-md" label="Update Server" @click="onClickUpdate"/>
            </q-card-actions>
          </q-card>
        </q-form>
      </div>

    </q-layout>
</template>


<script>
import ErrorDialog from '../components/ErrorDialog'

export default {
  data() {
    return {
      isDesktop: false,
      Username: "",
      Password: "",
      showPasswordString: "password",
      showPasswordIconString: "visibility",
      ServerAddress: ""
    }
  },
  methods: {
    onClickUpdate() {
      this.$store.commit("setServerUrl", this.ServerAddress);
    },
    onClickForgotPassword() {
      this.$router.push('/forgot-password');
    },
    showPassword() {
      if (this.showPasswordString === "password") {
        this.showPasswordString = "text";
        this.showPasswordIconString = "visibility_off";
      } else {
        this.showPasswordString = "password";
        this.showPasswordIconString = "visibility";
      }
    },
    onClickLogin() {
      var password = this.Password;
      var username = this.Username;
      var _this = this;
      this.$refs.myForm.validate().then(success => {
          if (success) {
              
              var postData = {
                  Username: username,
                  Password: password
              };
              _this.$Loading.show();
              _this.Endpoints.login({
                  data: postData,
                  success: (response) => {
                      //var apiResponse = response.data
                      if (response.data.Status === "Success") {
                          //Set store
                          _this.$store.commit("setCurrentUser", response.data.Data);
                          _this.$router.push('/main/announcement');
                      } else {
                          _this.$q.dialog({
                              component: ErrorDialog,
                              root: _this.$root,
                              message: response.data.Message,
                              title: "Error"
                          })
                      }
                      _this.$Loading.hide();
                  },
                  error: () => {
                      _this.$q.dialog({
                          component: ErrorDialog,
                          root: _this.$root,
                          message: "An Error Occurred Please Try Again.",
                          title: "Error"
                      })
                      _this.$Loading.hide();
                  }
              });
          }
      });
    }
  },
  beforeMount() {
    if (this.$store.getters.currentUser != null) {
      this.$router.push('/main/announcement');
    }
  },
  mounted() {
    if (this.$store.getters.currentUser != null) {
      this.$router.push('/main/announcement');
    }
  }
}
</script>

<style>
</style>
