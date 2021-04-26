<template>
  <div>
    <Add />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Add from "./Provider/Add.vue";
@Component({
  components: {
    Add,
  },
})
export default class AddCustomer extends Vue {}
</script>

<style scoped>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
