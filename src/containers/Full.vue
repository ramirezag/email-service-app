<template>
  <div class="app">
    <AppHeader/>
    <div class="app-body">
      <Sidebar :navItems="nav"/>
      <main class="main">
        <breadcrumb :list="list"/>
        <div class="container-fluid">
          <Notifications :store="notificationStore"/>
          <router-view></router-view>
        </div>
      </main>
      <AppAside/>
    </div>
    <AppFooter/>
  </div>
</template>

<script>
  import nav from '../_nav'
  import { Notifications, NotificationStore } from '../components/notifications'
  import { Header as AppHeader, Sidebar, Aside as AppAside, Footer as AppFooter, Breadcrumb } from '../components/'

  export default {
    name: 'full',
    components: {
      Notifications,
      AppHeader,
      Sidebar,
      AppAside,
      AppFooter,
      Breadcrumb
    },
    data () {
      return {
        nav: nav.items,
        notificationStore: NotificationStore
      }
    },
    computed: {
      name () {
        return this.$route.name
      },
      list () {
        return this.$route.matched
      }
    },
    methods: {
      showSuccessMessage: function (message) {
        NotificationStore.addNotification({
          text: message,
          type: 'success'
        })
      },
      showAlertMessage: function (message) {
        NotificationStore.addNotification({
          text: message,
          type: 'danger'
          // timeout not specified - defaults to true
          // delay not specified, defaults to 3000
        })
      },
      showStickyMessage: function (message) {
        NotificationStore.addNotification({
          title: 'Sticky!!',
          text: message,
          type: 'primary',
          timeout: false // won't disappear on it's own
        })
      },
      clearMessages: function () {
        NotificationStore.clearNotification()
      }
    }
  }
</script>
