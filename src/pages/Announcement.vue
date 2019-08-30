<template>
  <div class="q-pa-md row q-gutter-md justify-center">

    <q-card dark bordered class="bg-grey-9 col-12 my-card" :key="item.ID"       
        v-for="item in data">
      <q-card-section>
        <div class="text-h6"> {{ item.Subject }} </div>
      </q-card-section>

      <q-separator dark inset />

      <q-card-section>
        {{ item.Message }}
      </q-card-section>
    </q-card>




  </div>
</template>

<script>
import ErrorDialog from '../components/ErrorDialog'
export default {
  data () {
    return {
      data: []
    }
  },
  mounted()  {
    var _this = this;
    this.$Loading.show("Fetching....");
    //Run Query
    var postData = {
    }
    _this.Endpoints.GetAllAnnouncements({
      data: postData,
      success: (response) => {
        if (response.data.Status === "Success") {
          //Show Message
          _this.data = response.data.Data
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
</script>

<style lang="stylus" scoped>


</style>