<template>
<b-row>
  <b-modal :id=name centered :title=title @ok=onOk @cancel="onCancel" >
        <b-form-group id="urlInputGroup"
                    label="Url"
                    label-for="urlInput"
                    description="Адрес для проверки">
            <b-form-input id="urInput"
                        type="url"
                        v-model="form.url"
                        required
                        placeholder="http://www.host.ru">
            </b-form-input>
        </b-form-group>
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

  </b-modal>
</b-row>
</template>

<script>
export default {
  props: {
    name: String,
    title: String
  },
  data: function() {
    return {
      form: {
        url: "",
        interval: 5
      }
    };
  },
  methods: {
    onCancel() {
        this.form.url = ''
        this.interval = 5
    },
    onOk() {
      this.$emit("onOk", this.form);
    }
  }
};
</script>


