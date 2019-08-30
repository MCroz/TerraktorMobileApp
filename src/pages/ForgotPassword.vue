<template>
    <q-layout view="lHh lpr lFf" class="shadow-2 rounded-borders">

      <div class="row justify-center items-center" style="height: 100vh;">
        <q-form class="col-12" ref="myForm">
          <q-card dark bordered class="bg-grey-9"> 
            <q-card-section>
              <div class="row justify-center">
                <div class="text-h6">Forgot Password</div>
              </div>
            </q-card-section>
            <q-card-section>
              <div class="col items-center">
                <q-input dark v-model="Email" label="Email">
                  <template v-slot:prepend>
                    <q-icon color="white" name="email" />
                  </template>
                </q-input>
              </div>
            </q-card-section>
            <q-card-actions align="center">
              <q-btn color="black" class="full-width q-mt-md" label="Submit" @click="onClickSubmit"/>
              <q-btn color="black" class="full-width q-mt-md" label="Back To Login" @click="onClickBack"/>
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
      Email: "",
    }
  },
  methods: {
    onClickBack() {
        this.$router.push('/')
    },
    onClickSubmit () {
        var _this = this;
        //Show loading here
        this.$Loading.show("Processings....");
        //Run Query
        var postData = {
            Email: _this.Email
        }
        _this.Endpoints.ForgotPassword({
        data: postData,
        success: (response) => {
            if (response.data.Status === "Success") {
                //Show Message
                //_this.data = response.data.Data.Data
                //_this.pagination.rowsNumber = response.data.Data.RowsCount
                _this.$q.dialog({
                title: 'Success',
                message: 'Successfully Updated',
                persistent: true
                })
                
            } 
            else {
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
  }
}
</script>

<style>
</style>
