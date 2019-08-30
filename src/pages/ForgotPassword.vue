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
              <q-btn color="black" class="full-width q-mt-md" label="Submit" @click="onClickLogin"/>
              <q-btn color="black" class="full-width q-mt-md" label="Back To Login" @click="onClickBack"/>
            </q-card-actions>
          </q-card>
        </q-form>
      </div>

    </q-layout>
</template>


<script>
//import ErrorDialog from '../components/ErrorDialog'

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
    }
  }
}
</script>

<style>
</style>
