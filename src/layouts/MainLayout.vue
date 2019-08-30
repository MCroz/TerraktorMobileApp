<template>
  <q-layout view="lHh LpR lFf">

    <q-header bordered class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title>
          {{ currentPageName }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer 
        v-model="left" 
        side="left" 
        behavior="mobile" 
        :width="250"
        :breakpoint="400"
        show-if-above
        elevated
    >

        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
          <q-list padding>

            <q-item @click="onClickItem(item)" v-for="item in drawerItems" :key="item.path" :active="item.isSelected" clickable v-ripple>
              <q-item-section avatar>
                <q-icon :name="item.icon" />
              </q-item-section>

              <q-item-section>
                {{ item.label }}
              </q-item-section>
            </q-item>

            <q-item @click="onClickLogout" clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="exit_to_app" />
              </q-item-section>

              <q-item-section>
                Logout
              </q-item-section>
            </q-item>

          </q-list>


        </q-scroll-area>

        <q-img class="absolute-top" src="statics/material.png" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img :src="userImage">
            </q-avatar>
            <div class="text-weight-bold">{{ currentUserFullName }}</div>
            <div>{{ currentUserType }}</div>
          </div>
        </q-img>

    </q-drawer>



    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      left: true,
      drawerItems: [
        {
          label: "My Profile",
          icon: "inbox",
          isSelected: false,
          path: "/main/myprofile",
          pageName: "My Profile"
        },
        {
          label: "Announcement",
          icon: "inbox",
          isSelected: true,
          path: "/main/announcement",
          pageName: "Announcement"
        },
        {
          label: "Attendance",
          icon: "star",
          isSelected: false,
          path: "/main/attendance",
          pageName: "Attendance"
        },
        {
          label: "Payslip",
          icon: "send",
          isSelected: false,
          path: "/main/payslips",
          pageName: "Payslip"
        },
        {
          label: "Leaves",
          icon: "drafts",
          isSelected: false,
          path: "/main/leaves",
          pageName: "Leaves"
        },
      ],
      currentPageName: "Announcement",
      userImage: ""
    }
  },
  methods: {
    onClickItem (drawerItem) {
      this.drawerItems.forEach(item => {
        item.isSelected = false;
      });
      drawerItem.isSelected = true;
      this.currentPageName = drawerItem.pageName;
      this.$router.push(drawerItem.path);
    },
    onClickLogout() {
      this.$store.commit("setCurrentUser", null);
      this.$router.push('/');
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
    currentEmployeeID () {
      let curUser = this.$store.getters.currentUser;
      if (curUser === null) {
        return "";
      }
      return curUser.EmployeeID;
    },
    currentUserType () {
      let curUser = this.$store.getters.currentUser;
      if (curUser === null) {
        return "";
      }
      return curUser.Type;
    },
  },
  beforeMount() {
    if (this.$store.getters.currentUser == null) {
      this.$router.push('/');
    } else {
      var image = this.$store.getters.currentUser.Image;
      var serverUrl = this.$store.getters.serverUrl;
      image = image == "" ? serverUrl + "images/profile.jpg" : serverUrl + "images/" + image;
      this.userImage = image;
    }

  },
  mounted() {
    if (this.$store.getters.currentUser == null) {
      this.$router.push('/');
    } else {
      var image = this.$store.getters.currentUser.Image;
      var serverUrl = this.$store.getters.serverUrl;
      image = image == "" ? serverUrl + "images/profile.jpg" : serverUrl + "images/" + image;
      this.userImage = image;
    }
  }
}
</script>