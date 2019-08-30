<template>
  <!-- <div class="q-pa-md row q-gutter-md justify-center"> -->
<q-page>
    <q-card>
    <q-img src="statics/user_bg3.jpg" />

    <q-card-section>
        <q-avatar style="top: 0; right: 12px; transform: translateY(-50%);" class="absolute" size="100px" font-size="52px" color="teal" text-color="white">
            <img :src="currentUserImage">
        </q-avatar>

        <div class="row no-wrap items-center">
            <div class="col-12 text-h6 ellipsis">{{ currentUserFullName }}</div>
        </div>
    </q-card-section>

    <q-card-section>
        <q-form
        @submit="onSubmitForm"
        class="q-gutter-md"
        >
        <q-input
            readonly
            filled
            v-model="FirstName"
            label="First Name"
        />
        <q-input
            readonly
            filled
            v-model="MiddleName"
            label="Middle Name"
        />
        <q-input
            readonly
            filled
            v-model="LastName"
            label="Last Name"
        />
        <q-input
            readonly
            filled
            v-model="Allowance"
            label="Allowance"
        />
        <q-input
            readonly
            filled
            v-model="MonthlyRate"
            label="Monthly Rate"
        />
        <q-input
            readonly
            filled
            v-model="Gender"
            label="Gender"
        />
        <q-input
            readonly
            filled
            v-model="Dependents"
            label="Dependents"
        />
        <q-input
            readonly
            filled
            v-model="CivilStatus"
            label="Civil Status"
        />
        <q-input
            readonly
            filled
            v-model="Address"
            label="Address"
        />
        <q-input
            readonly
            filled
            v-model="BirthDate"
            label="Birth Date"
        />
        <q-input
            readonly
            filled
            v-model="ContactInfo"
            label="Contact Information"
        />
        <q-input
            readonly
            filled
            v-model="Position"
            label="Position"
        />
        <q-input
            readonly
            filled
            v-model="Schedule"
            label="Schedule"
        />
        <q-input
            v-if="$store.getters.currentUser.Contractual != 1"
            readonly
            filled
            v-model="EmploymentStartDate"
            label="Employment Start Date"
        />
        <q-input
            v-if="$store.getters.currentUser.Contractual != 1"
            readonly
            filled
            v-model="RegularizationDate"
            label="Regularization Date"
        />
        <q-input
            v-if="$store.getters.currentUser.Contractual == 1"
            readonly
            filled
            v-model="ContractStart"
            label="Contract Start Date"
        />
        <q-input
            v-if="$store.getters.currentUser.Contractual == 1"
            readonly
            filled
            v-model="ContractEnd"
            label="Contract End Date"
        />




        <q-input
            filled
            v-model="NewPassword"
            label="New Password"
            hint="New Password"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
        />
        <q-input
            filled
            v-model="ConfirmNewPassword"
            label="Confirm New Password"
            hint="Confirm New Password"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
        />

        <div>
            <q-btn label="Update" type="submit" color="primary"/>
        </div>
        </q-form>
    </q-card-section>

    <q-separator />

    <!-- <q-card-actions>
        <q-btn flat round icon="event" v-close-popup />
        <q-btn flat v-close-popup>5:30PM</q-btn>
        <q-btn flat v-close-popup>7:30PM</q-btn>
        <q-btn flat v-close-popup>9:00PM</q-btn>
        <q-btn flat color="primary" v-close-popup>Reserve</q-btn>
    </q-card-actions> -->
    </q-card>
</q-page>
  <!-- </div> -->
</template>

<script>
import ErrorDialog from '../components/ErrorDialog'


export default {
  data () {
    return {
      carousel: false,
      card: false,
      sliders: false,

      slide: 1,
      stars: 3,

      slideVol: 39,
      slideAlarm: 56,
      slideVibration: 63,
      LastName: '',
      FirstName: '',
      MiddleName: '',

      Allowance: 0,
      MonthlyRate: 0,
      Gender: '',
      Dependents: 0,
      CivilStatus: '',
      Address: '',
      BirthDate: '',
      ContactInfo: '',
      Position: '',
      Schedule: '',
      EmploymentStartDate: '',
      RegularizationDate: '',
      ContractStart: '',
      ContractEnd: '',  


      NewPassword: '',
      ConfirmNewPassword: '',
      ChangePassword: true
    }
  },
  methods: {
      onSubmitForm() {
        var _this = this;
        var userID = this.$store.getters.currentUser.ID;
        var postData = {
            UserID : userID,
            NewPassword: this.NewPassword,
            ConfirmNewPassword: this.ConfirmNewPassword
        };
        _this.Endpoints.UpdatePassword({
            data: postData,
            success: (response) => {
            if (response.data.Status === "Success") {
                //Show Message
                _this.$q.dialog({
                title: 'Success',
                message: 'Successfully Updated',
                persistent: true
                })
                _this.$store.commit("setCurrentUser", response.data.Message);
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
  },
  computed: {
    currentUserFullName () {
        let curUser = this.$store.getters.currentUser;
        if (curUser === null) {
            return "";
        }
        return curUser.FirstName + " " + curUser.MiddleName + " " + curUser.LastName;
    },
    currentUserImage () {
        var image = this.$store.getters.currentUser.Image;
        var serverUrl = this.$store.getters.serverUrl;
        return image == "" ? serverUrl + "images/profile.jpg" : serverUrl + "images/" + image;
    }
  },
  mounted () {
      this.FirstName = this.$store.getters.currentUser.FirstName;
      this.MiddleName = this.$store.getters.currentUser.MiddleName;
      this.LastName = this.$store.getters.currentUser.LastName;
      this.Allowance  = this.$store.getters.currentUser.Allowance;
      this.MonthlyRate = this.$store.getters.currentUser.Rate;
      this.Gender = this.$store.getters.currentUser.Gender;
      this.Dependents = this.$store.getters.currentUser.Dependents;
      this.CivilStatus = this.$store.getters.currentUser.CivilStatus;
      this.Address = this.$store.getters.currentUser.Address;
      this.BirthDate = this.$store.getters.currentUser.BirthDate;
      this.ContactInfo = this.$store.getters.currentUser.ContactInfo;
      this.Position = this.$store.getters.currentUser.PositionName;
      this.Schedule = this.$Moment(this.$store.getters.currentUser.TimeIn,"LTS").format("LT") + " - " + this.$Moment(this.$store.getters.currentUser.TimeOut,"LTS").format("LT");
      this.EmploymentStartDate = this.$store.getters.currentUser.EmploymentStartDate;
      this.RegularizationDate = this.$store.getters.currentUser.RegularizationDate;
      this.ContractStart = this.$store.getters.currentUser.ContractStart;
      this.ContractEnd = this.$store.getters.currentUser.ContractEnd;


  }
}
</script>

<style lang="stylus" scoped>
.my-card
  margin-bottom 20px

</style>