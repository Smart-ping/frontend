<template>
<b-row>
  <b-modal :id=name centered :title=title @ok=onOk @cancel="onCancel" @show="onShow" >
  
    <b-form-row>
      <b-col>
        <b-form-group id="titleInputGroup"
                    label="Название"
                    label-for="titleInput">
          <b-form-input id="titleInput"
                        type="text"
                        v-model="form.title"
                        ref="title"
                        v-bind:class="{ 'is-invalid' : !validTitle() }">
          </b-form-input>
          <b-form-invalid-feedback id="urlInputFeedback">Название проверки</b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>
  
    <b-form-row>
      <b-col>
        <b-form-group id="urlInputGroup"
                    label="Url"
                    label-for="urlInput"
                    description="Адрес для проверки">
          <b-form-input id="urInput"
                        type="url"
                        v-model="form.url"
                        placeholder="http://www.host.ru"
                        v-bind:class="{ 'is-invalid' : !validUrl() }">
          </b-form-input>
          <b-form-invalid-feedback id="urlInputFeedback">Введите url</b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>
    
    
    <b-form-row>
      <b-col>
        <b-form-group id="intervalInputGroup"
                    label="Интервал"
                    label-for="intervalInput"
                    description="Интервал проверки в минутах">
          <b-form-input id="urInput"
                        type="number"
                        v-model="form.interval"
                        required
                        placeholder="1">
            </b-form-input>
        </b-form-group>
      </b-col>
    </b-form-row>

  </b-modal>
</b-row>
</template>

<script>

import Url from 'url'

export default {
  props: {
    name: String,
    title: String
  },
  data: function() {
    return {
      form: {
        title: '',
        url: '',
        interval: 5
      }
    };
  },
  methods: {
    onCancel() {
        this.form.title = ''
        this.form.url = ''
        this.form.interval = 5
    },
    onOk() {
      this.$emit("onOk", this.form);
    },
    onShow() {
      this.form.title = ''
      this.form.url = ''
      this.form.interval = 5

      this.$refs.title.focus() 
    },
    validTitle() {
      return this.form.title.length > 0
    },
    validUrl() {

      if (this.form.url == '')
        return false 

      try {
        const url = Url.parse(this.form.url)
        
        if ((this.form.title == '') || (this.form.url == url.host))
        {
          console.log(url.host)
          this.form.title == url.host
        }
        return true
      }
      catch(e){
        return false
      }
    }

  }
};
</script>


