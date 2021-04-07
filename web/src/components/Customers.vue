<template>
  <div class="submit-form">
    <div class="form-group">
      <div class="col-12 text-center mb-3">
        <h5 class="font-weight-bold">Criando um formulário com vue</h5>
      </div>
      <div class="form-group col-6 offset-3">
        <label for="">Cep</label>
        <input
          v-model="cep"
          placeholder="Digite seu cep"
          type="text"
          maxlength="8"
          class="form-control"
        />
        <span class="form-group col-6 offset-3">
          <button @click="getCep(cep)" class="btn btn-default" type="button">
            Buscar Cep
          </button>
        </span>

        <div v-if="response !== null" class="form-group col-6 offset-3">
          <div v-for="(value, index) in response" :key="index">
            <label for="index">{{
              index[0].toUpperCase() + index.slice(1)
            }}</label>
            <input
              class="form-control"
              :v-text="index"
              v-model="response[index]"
              type="text"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";

@Component
export default class ConsultaCep extends Vue {
  private baseUrl = "https://viacep.com.br/ws/";
  private response: any = null;
  private cep: any;

  getCep(cep: string) {
    const url = `${this.baseUrl}${cep}/json/`;
    axios
      .get(url)
      .then((resp) => {
        const data = resp.data;
        if (!data.erro) {
          delete data.cep;
          delete data.ibge;
          delete data.gia;
          delete data.ddd;
          delete data.siafi;
          this.response = data;
        } else {
          alert("Cep não encontrado");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  @Watch('cep')
  cepFind(novoCep: string) {
  if (novoCep.length === 8) this.getCep(novoCep)
          else this.response = null
}
}
</script>
<style scoped>
.submit-form {
  max-width: 300px;
  margin: auto;
}