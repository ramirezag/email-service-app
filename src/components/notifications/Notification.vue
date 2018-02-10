<template>
  <div class="notification callout animated" :class="notification.type ? notification.type : 'secondary'" transition="fade">
    <button @click="triggerClose(notification)" class="close-button" aria-label="Close alert" type="button">
      <span aria-hidden="true">&times;</span>
    </button>
    <h5 v-if="notification.title">{{notification.title}}</h5>
    <p>
      {{notification.text}}
    </p>
  </div>
</template>
<script>
  export default {
    name: 'notification',
    props: ['notification'],
    data: function () {
      return {timer: null}
    },
    ready: function () {
      let timeout = this.notification.hasOwnProperty('timeout') ? this.notification.timeout : true
      if (timeout) {
        let delay = this.notification.delay || 3000
        this.timer = setTimeout(function () {
          this.triggerClose(this.notification)
        }.bind(this), delay)
      }
    },

    methods: {
      triggerClose: function (notification) {
        clearTimeout(this.timer)
        this.$dispatch('close-notification', notification)
      }
    }
  }
</script>
