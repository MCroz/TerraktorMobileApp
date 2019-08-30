<template>
    <q-slide-transition appear>
    <div class="q-pa-md justify-content row">
        <div class="col-12 text-h5 text-center">
            Payslip
        </div>
        <div class="col-12 text-center text-body1" style="border-top: 1px solid #ccc; border-bottom: 1px solid #ccc;">
            Pay Period <br>
            {{ Payslip.CutoffDate }}
        </div>
        <div class="col-12 q-pa-sm justify-content">
            <q-item>
                <q-item-section>
                    <q-item-label> Employee ID </q-item-label>
                </q-item-section>
                <q-item-section side>
                    <q-item-label caption> {{ $store.getters.currentUser.EmployeeID }} </q-item-label>
                </q-item-section>
            </q-item>
            <q-item>
                <q-item-section>
                    <q-item-label> Position </q-item-label>
                </q-item-section>
                <q-item-section side>
                    <q-item-label caption> {{ $store.getters.currentUser.PositionName }} </q-item-label>
                </q-item-section>
            </q-item>
            <q-item>
                <q-item-section>
                    <q-item-label> Monthly Rate </q-item-label>
                </q-item-section>
                <q-item-section side>
                    <q-item-label caption> ₱{{ $store.getters.currentUser.Rate }} </q-item-label>
                </q-item-section>
            </q-item>
        </div>
        <q-item-label class="text-h6" header>Breakdown</q-item-label>
        <div class="col-12 q-pa-sm justify-content">
            <q-item>
                <q-item-section avatar>
                    Reg. Working Days
                </q-item-section>
                <q-item-section> {{ Payslip.DaysOfWork }} x ₱{{ Payslip.DayRate }} </q-item-section>
                <q-item-section side>
                    <q-item-label caption>₱{{ Payslip.RegularDayPayment }}</q-item-label>
                </q-item-section>
            </q-item>
            <q-item>
                <q-item-section avatar>
                    Holidays (Double Pay)
                </q-item-section>
                <q-item-section> {{ Payslip.DaysOfDoublePay }} x ₱{{ Payslip.DayRate }} </q-item-section>
                <q-item-section side>
                    <q-item-label caption>₱{{ Payslip.DoublePayPayment }}</q-item-label>
                </q-item-section>
            </q-item>
            <q-item>
                <q-item-section avatar>
                    Holidays (30%)
                </q-item-section>
                <q-item-section> {{ Payslip.DaysOfSpecialHoliday }} x ₱{{ Payslip.DayRate }} </q-item-section>
                <q-item-section side>
                    <q-item-label caption>₱{{ Payslip.SpecialDayPayment }}</q-item-label>
                </q-item-section>
            </q-item>

            <q-item>
                <q-item-section avatar>
                    Overtime
                </q-item-section>
                <q-item-section> {{ Payslip.OTHour }} x ₱{{ Payslip.OTRate }} </q-item-section>
                <q-item-section side>
                    <q-item-label caption>₱{{ Payslip.OTPayment }}</q-item-label>
                </q-item-section>
            </q-item>

            <q-item>
                <q-item-section avatar>
                    Overtime (Double Pay)
                </q-item-section>
                <q-item-section> {{ Payslip.OTDoublePayHour }} x ₱{{ Payslip.OTDoublePayRate }} </q-item-section>
                <q-item-section side>
                    <q-item-label caption>₱{{ Payslip.OTDoublePayPayment }}</q-item-label>
                </q-item-section>
            </q-item>

            <q-item>
                <q-item-section avatar>
                    Overtime (30%)
                </q-item-section>
                <q-item-section> {{ Payslip.OTSpecialHour }} x ₱{{ Payslip.OTSpecialRate }} </q-item-section>
                <q-item-section side>
                    <q-item-label caption>₱{{ Payslip.OTSpecialPayment }}</q-item-label>
                </q-item-section>
            </q-item> 

            <q-item v-if="Number(Payslip.VL) > 0">
                <q-item-section avatar>
                    Vacation Leave
                </q-item-section>
                <q-item-section> {{ Payslip.VL }} x ₱{{ Payslip.DayRate }} </q-item-section>
                <q-item-section side>
                    <q-item-label caption>₱{{ Payslip.VLPay }}</q-item-label>
                </q-item-section>
            </q-item>

            <q-item v-if="Number(Payslip.SL) > 0">
                <q-item-section avatar>
                    Sick Leave
                </q-item-section>
                <q-item-section> {{ Payslip.SL }} x ₱{{ Payslip.DayRate }} </q-item-section>
                <q-item-section side>
                    <q-item-label caption>₱{{ Payslip.SLPay }}</q-item-label>
                </q-item-section>
            </q-item>

            <q-item v-if="Number(Payslip.EL) > 0">
                <q-item-section avatar>
                    Emergency Leave
                </q-item-section>
                <q-item-section> {{ Payslip.EL }} x ₱{{ Payslip.DayRate }} </q-item-section>
                <q-item-section side>
                    <q-item-label caption>₱{{ Payslip.ELPay }}</q-item-label>
                </q-item-section>
            </q-item>

            <q-item v-if="Number(Payslip.ML) > 0">
                <q-item-section avatar>
                    Maternity Leave
                </q-item-section>
                <q-item-section> {{ Payslip.ML }} x ₱{{ Payslip.DayRate }} </q-item-section>
                <q-item-section side>
                    <q-item-label caption>₱{{ Payslip.MLPay }}</q-item-label>
                </q-item-section>
            </q-item>

            <q-item v-if="Number(Payslip.PL) > 0">
                <q-item-section avatar>
                    Paternity Leave
                </q-item-section>
                <q-item-section> {{ Payslip.PL }} x ₱{{ Payslip.DayRate }} </q-item-section>
                <q-item-section side>
                    <q-item-label caption>₱{{ Payslip.PLPay }}</q-item-label>
                </q-item-section>
            </q-item>

            <q-item v-if="Number(Payslip.BL) > 0">
                <q-item-section avatar>
                    Bereavement Leave
                </q-item-section>
                <q-item-section> {{ Payslip.BL }} x ₱{{ Payslip.DayRate }} </q-item-section>
                <q-item-section side>
                    <q-item-label caption>₱{{ Payslip.BLPay }}</q-item-label>
                </q-item-section>
            </q-item>

            <q-item v-if="Number(Payslip.Allowance) > 0">
                <q-item-section avatar>
                    Allowance
                </q-item-section>
                <q-item-section> ₱{{ Payslip.Allowance }} </q-item-section>
                <q-item-section side>
                    <q-item-label caption>₱{{ Payslip.Allowance }}</q-item-label>
                </q-item-section>
            </q-item>
            <q-item>
                <q-item-section avatar>
                    Total
                </q-item-section>
                <q-item-section></q-item-section>
                <q-item-section side>
                    <q-item-label caption>₱{{ Payslip.GrossPay}}</q-item-label>
                </q-item-section>
            </q-item>
        </div>
        <q-item-label class="text-h6" header>Deductions</q-item-label>
        <div class="col-12 q-pa-sm justify-content">
            <q-item>
                <q-item-section>SSS</q-item-section>
                <q-item-section side>
                    <q-item-label caption>₱{{ Payslip.SSS }}</q-item-label>
                </q-item-section>
            </q-item>
            <q-item>
                <q-item-section>Philhealth</q-item-section>
                <q-item-section side>
                    <q-item-label caption>₱{{ Payslip.Philhealth }}</q-item-label>
                </q-item-section>
            </q-item>
            <q-item>
                <q-item-section>Pag-Ibig</q-item-section>
                <q-item-section side>
                    <q-item-label caption>₱{{ Payslip.Pagibig }}</q-item-label>
                </q-item-section>
            </q-item>
            <!-- <q-item>
                <q-item-section>Tax</q-item-section>
                <q-item-section side>
                    <q-item-label caption> - </q-item-label>
                </q-item-section>
            </q-item> -->
            <q-item v-if="Number(Payslip.CashAdvance) > 0">
                <q-item-section>Cash Advance</q-item-section>
                <q-item-section side>
                    <q-item-label caption>₱{{ Payslip.CashAdvance }}</q-item-label>
                </q-item-section>
            </q-item>
            <q-item>
                <q-item-section>Total</q-item-section>
                <q-item-section side>
                    <q-item-label caption>₱{{ Payslip.AllDeductions }}</q-item-label>
                </q-item-section>
            </q-item>
        </div>
        <div class="col-12 text-center text-body1" style="border-top: 1px solid #ccc; border-bottom: 1px solid #ccc;">
            Gross Pay <br>
            ₱{{ Payslip.GrossPay }}
        </div>
        <div class="col-12 text-center text-body1" style="border-top: 1px solid #ccc; border-bottom: 1px solid #ccc;">
            Deductions <br>
            ₱{{ Payslip.AllDeductions }}
        </div>
        <div class="col-12 text-center text-body1" style="border-top: 1px solid #ccc; border-bottom: 1px solid #ccc;">
            Taxable Income <br>
            ₱{{ Payslip.TaxableIncome }}
        </div>
        <div class="col-12 text-center text-body1" style="border-top: 1px solid #ccc; border-bottom: 1px solid #ccc;">
            Tax <br>
            ₱{{ Payslip.Tax }}
        </div>
        <div class="col-12 text-center text-body1" style="border-top: 1px solid #ccc; border-bottom: 1px solid #ccc;">
            Net Pay <br>
            ₱{{ Payslip.NetIncome }}
        </div>

    </div>
    </q-slide-transition>
</template>

<script>
import ErrorDialog from '../components/ErrorDialog'

export default {
  data () {
    return {
      Payslip: {

      }
    }
  },
  methods: {
    
  },
  mounted () {
    var _this = this;
    //Show loading here
    this.$Loading.show("Fetching....");
    //Run Query
    var postData = {
        ID: _this.$route.params.id
    }
    _this.Endpoints.GetPayslipByID({
    data: postData,
    success: (response) => {
        if (response.data.Status === "Success") {
        //Show Message
        //_this.data = response.data.Data.Data
        //_this.pagination.rowsNumber = response.data.Data.RowsCount
            _this.Payslip = response.data.Data
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

    
  },
}
</script>

<style>

</style>
