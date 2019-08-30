import Api from './Api'


export default {
    login (params) {
        return Api().post('api/Login.php',params.data)
        .then(params.success)
        .catch(params.error);
    },
    GetAnnouncements (params) {
        return Api().post('api/GetAnnouncements.php',params.data)
        .then(params.success)
        .catch(params.error);
    },
    GetLatestAnnouncements (params) {
        return Api().post('api/GetLatestAnnouncement.php',params.data)
        .then(params.success)
        .catch(params.error);
    },
    GetOlderAnnouncements (params) {
        return Api().post('api/GetOlderAnnouncement.php',params.data)
        .then(params.success)
        .catch(params.error);
    },
    GetAllAnnouncements (params) {
        return Api().post('api/GetAllAnnouncement.php',params.data)
        .then(params.success)
        .catch(params.error);
    },
    GetAttendance (params) {
        return Api().post('api/GetAttendance.php',params.data)
        .then(params.success)
        .catch(params.error);
    },
    GetLeaves (params) {
        return Api().post('api/GetLeaves.php',params.data)
        .then(params.success)
        .catch(params.error);
    },
    UpdatePassword (params) {
        return Api().post('api/UpdatePassword.php',params.data)
        .then(params.success)
        .catch(params.error);
    },
    GetAllPayslips(params) {
        return Api().post('api/GetPayslips.php',params.data)
        .then(params.success)
        .catch(params.error);
    },
    GetPayslipByID(params) {
        return Api().post('api/GetPayslipByID.php',params.data)
        .then(params.success)
        .catch(params.error);
    },
}