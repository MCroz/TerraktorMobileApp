// import axios from "axios";
import Dialog from "../components/Dialog"
import Loading from "../components/Loading"
import Endpoints from "../services/Endpoints"
// import { date } from 'quasar'
import moment from 'moment'

export default async ({ Vue }) => {
  Vue.prototype.$TerraktorDialog = Dialog
  // Vue.prototype.$axios = axios;
  Vue.prototype.$Loading = Loading
  Vue.prototype.Endpoints = Endpoints
  Vue.prototype.$Moment = moment

  Vue.filter('formatDate', function (value) {
    if (!value) return ''
    
    //return moment(value).format("LL");
    return moment(value).calendar();
  })
  Vue.filter('toCurrency', function (value) {
    if (typeof value !== "number") {
        return value;
    }
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PHP',
        minimumFractionDigits: 0
    });
    return formatter.format(value);
});

};
