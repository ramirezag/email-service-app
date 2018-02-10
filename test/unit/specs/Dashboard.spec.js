import Vue from 'vue'
import Dashboard from '@/views/Dashboard.vue'

describe('Dashboard', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Dashboard)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('b-form').innerHTML)
      .to.equal('<b-form-group horizontal="" breakpoint="md" label-cols="2" label-class="text-sm-right" id="from" label="From:" label-for="from"><b-form-input id="fromInput" type="email" placeholder="Enter email"></b-form-input></b-form-group> <b-form-group horizontal="" breakpoint="md" label-cols="2" label-class="text-sm-right" id="to" label="To:" label-for="to"><b-form-input id="toInput" type="email" placeholder="Enter email"></b-form-input></b-form-group> <b-form-group horizontal="" breakpoint="md" label-cols="2" label-class="text-sm-right" id="cc" label="Cc:" label-for="cc"><b-form-input id="ccInput" type="email" label-cols="2"></b-form-input></b-form-group> <b-form-group horizontal="" breakpoint="md" label-cols="2" label-class="text-sm-right" id="bcc" label="Bcc:" label-for="bcc"><b-form-input id="bccInput" type="email" label-cols="2"></b-form-input></b-form-group> <b-form-group horizontal="" breakpoint="md" label-cols="2" label-class="text-sm-right" id="subject" label="Subject:" label-for="subject"><b-form-input id="subjectInput"></b-form-input></b-form-group> <b-form-group horizontal="" breakpoint="md" label-cols="2" label-class="text-sm-right" id="body" label="Body:" label-for="body"><b-form-textarea id="bodyInput" rows="9" max-rows="12"></b-form-textarea></b-form-group> <b-row align-h="center" class="action-buttons"><b-button variant="primary">Submit</b-button> <b-button variant="danger">Reset</b-button></b-row>')
  })
})
