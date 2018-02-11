<template>
    <b-container class="animated fadeIn notifications">
      <b-row class="justify-content-md-center"
        v-for="notification in notifications" :key="notification.text" :notification="notification"
        @close-notification="removeNotification"
        transition="fade">
        <b-col cols="12" md="8">
          <b-alert v-bind:variant="notification.type" show dismissible>
            <span v-html="notification.text"></span>
          </b-alert>
        </b-col>
      </b-row>
    </b-container>
</template>

<script>
  export default {
    name: 'notifications',
    props: {
      store: {
        type: Object,
        required: true
      }
    },
    components: {
      Notification
    },
    data () {
      return {
        notifications: this.store.state
      }
    },
    methods: {
      removeNotification: function (notification) {
        this.store.removeNotification(notification)
      }
    }
  }
</script>

<style>
  .notifications {
    z-index: 100;
  }

  .notifications .alert {
    margin-bottom: .4rem;
  }
</style>
