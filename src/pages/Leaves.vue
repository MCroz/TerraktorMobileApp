<template>
  <div class="q-pa-md row justify-center">

    <monthpicker
        class="col-12"
        color="purple"
        locale="en-US"
        v-model="dateFilter"
    ></monthpicker>

    <q-table
      :data="data"
      :columns="columns"
      row-key="AttendanceDate"
      :selected.sync="selected"
      :filter="dateFilter"
      grid
      hide-header
      :pagination.sync="pagination"
      @request="onRequest"
      binary-state-sort
    >
      <template v-slot:item="props">
        <div
          class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
        >
          <q-card>
            <q-card-section>
              {{ $Moment(props.row.LeaveDate).format("dddd, MMMM Do") }}
            </q-card-section>
            <q-separator />
            <q-list dense>
              <q-item>
                <q-item-section>
                  <q-item-label> Type </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label caption> {{ props.row.LeaveType }} </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </div>
      </template>

    </q-table>
  </div>
</template>

<script>
import monthpicker from 'quasar-monthpicker'
import ErrorDialog from '../components/ErrorDialog'

export default {
  components: { monthpicker },
  data () {
    return {
      dateFilter: new Date(),
      filter: '',
      pagination: {
        sortBy: 'Date',
        descending: false,
        page: 1,
        rowsPerPage: 5,
        rowsNumber: 10
      },
      selected: [],
      columns: [
        {
          name: 'desc',
          required: true,
          label: 'Test',
          align: 'left',
          sortable: true
        },
      ],
      data: []
    }
  },
  methods: {
    onRequest (props) {
      var _this = this;
      var userMainID = this.$store.getters.currentUser.ID;
      let { page, rowsPerPage, rowsNumber, sortBy, descending } = props.pagination
      //let dateFilter = props.dateFilter
      let formattedDateFilter = this.$Moment(_this.dateFilter).format("YYYY-MM-DD");

      

      //Check Amount to fetch
      let fetchCount = rowsPerPage === 0 ? rowsNumber : rowsPerPage

      // calculate starting row of data
      //this will compute offset
      let offset = (page - 1) * rowsPerPage



      //Show loading here
      this.$Loading.show("Fetching....");
      //Run Query
      var postData = {
        Offset: offset,
        Limit: fetchCount,
        EmployeeID: userMainID,
        Date: formattedDateFilter
      }
      _this.Endpoints.GetLeaves({
        data: postData,
        success: (response) => {
          if (response.data.Status === "Success") {
            //Show Message
            _this.data = response.data.Data.Data
            _this.pagination.rowsNumber = response.data.Data.RowsCount
          } 
          // else {
          //   _this.$q.dialog({
          //     component: ErrorDialog,
          //     root: _this.$root,
          //     message: response.data.Message,
          //     title: "Error"
          //   })
          // }
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

      this.pagination.page = page
      this.pagination.rowsPerPage = fetchCount
      this.pagination.sortBy = sortBy
      this.pagination.descending = descending

      //Close Loading


    },

  },
  watch: {
    dateFilter: function (val) {
      console.log(this.$Moment(val).format("YYYY-MM-DD"))
    }
  },
  mounted () {
    var thisDate = new Date();
    this.dateFilter = thisDate;
    // get initial data from server (1st page)
    this.onRequest({
      pagination: this.pagination,
      dateFilter: thisDate
    })
  },
}
</script>

<style lang="stylus">
.grid-style-transition
  transition transform .28s, background-color .28s
</style>