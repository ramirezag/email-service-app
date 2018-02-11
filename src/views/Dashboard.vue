<template>
  <b-container class="animated fadeIn">
    <b-row class="justify-content-md-center">
      <b-col cols="12" md="8">
        <b-card bg-variant="light">
          <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group horizontal breakpoint="md" label-cols="2" label-class="text-sm-right"
              id="from" label="From:" label-for="from">
              <b-form-input id="fromInput" v-model="form.from" ref="from"
                placeholder="Sender email address"></b-form-input>
            </b-form-group>
            <b-form-group horizontal breakpoint="md" label-cols="2" label-class="text-sm-right"
              id="to" label="To:" label-for="to">
              <b-form-input id="toInput" v-model="form.to" ref="to"
                placeholder="Comma separated email addresses"></b-form-input>
            </b-form-group>
            <b-form-group horizontal breakpoint="md" label-cols="2" label-class="text-sm-right" id="cc" label="Cc:"
              label-for="cc">
              <b-form-input id="ccInput" label-cols="2" v-model="form.cc" ref="cc"
                placeholder="Comma separated email addresses"></b-form-input>
            </b-form-group>
            <b-form-group horizontal breakpoint="md" label-cols="2" label-class="text-sm-right" id="bcc" label="Bcc:"
              label-for="bcc">
              <b-form-input id="bccInput" label-cols="2" v-model="form.bcc" ref="bcc"
                placeholder="Comma separated email addresses"></b-form-input>
            </b-form-group>
            <b-form-group horizontal breakpoint="md" label-cols="2" label-class="text-sm-right" id="subject"
              label="Subject:"
              label-for="subject">
              <b-form-input id="subjectInput" required v-model="form.subject"></b-form-input>
            </b-form-group>
            <b-form-group horizontal breakpoint="md" label-cols="2" label-class="text-sm-right" id="body" label="Body:"
              label-for="body">
              <b-form-textarea id="bodyInput" v-model="form.body" :rows="6" :max-rows="9"></b-form-textarea>
            </b-form-group>
            <b-row class="action-buttons" align-h="center">
              <b-button type="submit" variant="primary" :disabled="sending">Submit</b-button>
              <b-button type="reset" variant="danger" :disabled="sending">Reset</b-button>
            </b-row>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
    <b-tooltip target="fromInput" placement="bottom"><span
      v-html="tooltips.from.title"></span></b-tooltip>
    <b-tooltip target="toInput" placement="bottom"><span
      v-html="tooltips.to.title"></span></b-tooltip>
    <b-tooltip target="ccInput" placement="bottom"><span
      v-html="tooltips.cc.title"></span></b-tooltip>
    <b-tooltip target="bccInput" placement="bottom"><span
      v-html="tooltips.bcc.title"></span></b-tooltip>
  </b-container>
</template>

<script>
  export default {
    name: 'dashboard',
    data: function () {
      return {
        show: true,
        sending: false,
        emailRegex: /^[\w!#$%&'*+-/=?^_`{|}~]+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/,
        validEmailMessage: `<h4>Invalid email address.</h4>
        These are the rules for a valid email address:
        <ul>
          <li>Local-parts (characters before <code>@</code>) may consist of any combination of alphabetic characters, digits, or any of the special characters - <code>! # $ % & ' * + - / = ? ^ _ \` { | } ~</code></li>
          <li>Character . ( period, dot or fullstop) provided that it is not the first or last character.</li>
        </ul>`,
        form: {
          from: '', to: '', cc: '', bcc: '', subject: '', body: ''
        },
        tooltips: {
          from: {
            title: 'Example<ul><li>John &#60;jdoe@mail.com&#62;</li><li>emusk@tesla.com</li></ul><strong>',
            show: false
          },
          to: {
            title: 'Example<ul><li>Nik &#60;ntesla@mail.com&#62;, emusk@tesla.com</li></ul><strong>',
            show: false
          },
          cc: {
            title: 'Example<ul><li>Nik &#60;ntesla@mail.com&#62;, emusk@tesla.com</li></ul><strong>',
            show: false
          },
          bcc: {
            title: 'Example<ul><li>Nik &#60;ntesla@mail.com&#62;, emusk@tesla.com</li></ul><strong>',
            show: false
          }
        }
      }
    },
    methods: {
      onSubmit: function (evt) {
        evt.preventDefault()
        // TODO: Bad practice to use this.$parent
        this.$parent.clearMessages()
        const isEmailStringListValid = (emailsString) => {
          let valid = true
          const emails = emailsString.split(',')
          for (let i = 0; i < emails.length; i++) {
            let email = emails[i].trim()
            if (email) {
              const openingIdx = email.indexOf('<')
              if (openingIdx !== -1) {
                const closingIdx = email.lastIndexOf('>')
                if (closingIdx !== -1) {
                  email = email.substring(openingIdx + 1, closingIdx).trim()
                }
              }
              if (!this.emailRegex.test(email.trim())) {
                valid = false
                break
              }
            } else if (i !== emails.length - 1) {
              valid = false
              break
            }
          }
          return valid
        }

        if (!this.form.from || !this.emailRegex.test(this.form.from.trim())) {
          this.$parent.showAlertMessage(this.validEmailMessage)
          this.$nextTick(() => { this.$refs.from.$el.focus() })
        } else if (!this.form.to || !isEmailStringListValid(this.form.to)) {
          this.$parent.showAlertMessage(this.validEmailMessage)
          this.$nextTick(() => { this.$refs.to.$el.focus() })
        } else if (this.form.cc.trim() && !isEmailStringListValid(this.form.cc)) {
          this.$parent.showAlertMessage(this.validEmailMessage)
          this.$nextTick(() => { this.$refs.cc.$el.focus() })
        } else if (this.form.bcc.trim() && !isEmailStringListValid(this.form.bcc)) {
          this.$parent.showAlertMessage(this.validEmailMessage)
          this.$nextTick(() => { this.$refs.bcc.$el.focus() })
        } else {
          this.sending = true
          this.axios.post(`${process.env.API_BASE_URL}/email`, this.form).then(() => {
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
        }
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

  .tooltip-inner {
    max-width: 400px;
    text-align: left;
  }

  .tooltip-inner ul li {
    font-weight: bold;
  }
</style>

