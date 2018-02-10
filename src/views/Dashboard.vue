<template>
  <b-container class="animated fadeIn">
    <b-row class="justify-content-md-center">
      <b-col cols="12" md="8">
        <b-card bg-variant="light">
          <b-form v-if="show">
            <b-form-group horizontal breakpoint="md" label-cols="2" label-class="text-sm-right" id="from" label="From:"
              label-for="from">
              <b-form-input id="fromInput" type="email" v-model="form.from" placeholder="Enter email"></b-form-input>
            </b-form-group>
            <b-form-group horizontal breakpoint="md" label-cols="2" label-class="text-sm-right" id="to" label="To:"
              label-for="to">
              <b-form-input id="toInput" type="email" v-model="form.to" placeholder="Enter email"></b-form-input>
            </b-form-group>
            <b-form-group horizontal breakpoint="md" label-cols="2" label-class="text-sm-right" id="cc" label="Cc:"
              label-for="cc">
              <b-form-input id="ccInput" type="email" label-cols="2" v-model="form.cc"></b-form-input>
            </b-form-group>
            <b-form-group horizontal breakpoint="md" label-cols="2" label-class="text-sm-right" id="bcc" label="Bcc:"
              label-for="bcc">
              <b-form-input id="bccInput" type="email" label-cols="2" v-model="form.bcc"></b-form-input>
            </b-form-group>
            <b-form-group horizontal breakpoint="md" label-cols="2" label-class="text-sm-right" id="subject"
              label="Subject:"
              label-for="subject">
              <b-form-input id="subjectInput" v-model="form.subject"></b-form-input>
            </b-form-group>
            <b-form-group horizontal breakpoint="md" label-cols="2" label-class="text-sm-right" id="body" label="Body:"
              label-for="body">
              <b-form-textarea id="bodyInput" v-model="form.body" :rows="9" :max-rows="12"></b-form-textarea>
            </b-form-group>
            <b-row class="action-buttons" align-h="center">
              <b-button @click="onSubmit" variant="primary" :disabled="sending">Submit</b-button>
              <b-button @click="onReset" variant="danger" :disabled="sending">Reset</b-button>
            </b-row>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  export default {
    name: 'dashboard',
    data: function () {
      return {
        show: true,
        sending: false,
        form: {
          from: '', to: '', cc: '', bcc: '', subject: '', body: ''
        }
      }
    },
    methods: {
      onSubmit: function (evt) {
        // TODO: Bad practice to use this.$parent
        evt.preventDefault()
        this.$parent.clearMessages()
        this.sending = true
        this.axios.post(process.env.API_BASE_URL, this.form).then(() => {
          this.$parent.showSuccessMessage('Email successfully sent.')
          this.sending = false
        }).catch((error) => {
          this.sending = false
          // Error TODO: Make this error handler global
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            this.$parent.showAlertMessage(error.response.data)
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request)
            this.$parent.showAlertMessage(error.message ? error.message : 'Internal server error in sending email.')
          } else {
            // Something happened in setting up the request that triggered an Error
            this.$parent.showAlertMessage(error.message)
          }
        })
      },
      onReset: function () {
        this.$parent.clearMessages()
        this.form.from = ''
        this.form.to = ''
        this.form.cc = ''
        this.form.bcc = ''
        this.form.subject = ''
        this.form.body = ''
        /* Trick to reset/clear native browser form validation state */
        this.show = false
        this.$nextTick(() => { this.show = true })
      }
    }
  }
</script>

<style lang="css">
  .action-buttons button {
    margin-right: 10px;
    width: 100px;
  }

  .action-buttons button:last-of-type {
    margin-right: 0;
  }

  .action-buttons .btn.disabled {
    cursor: default;
  }

  form {
    padding-right: 15px;
  }
</style>

