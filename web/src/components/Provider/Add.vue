<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="nick">Nick</label>
        <input
          type="text"
          class="form-control"
          id="nick"
          required
          v-model="customer.nick"
          name="nick"
        />
      </div>

      <div class="form-group">
        <label for="cep">CEP</label>
        <input
          type="text"
          class="form-control"
          maxlength="8"
          id="cep"
          required
          v-model="customer.postalCode"
          name="cep"
        />
      </div>

      <div v-if="response !== null">
        <div class="form-group">
          <label for="street">Logradouro</label>
          <input
            readonly="true"
            type="text"
            class="form-control"
            id="street"
            required
            v-model="customer.street"
            name="street"
          />
        </div>

        <div class="form-group">
          <label for="complement">Complemento</label>
          <input
            type="text"
            class="form-control"
            id="complement"
            required
            v-model="customer.complement"
            name="complement"
          />
        </div>

        <div class="form-group">
          <label for="district">Bairro</label>
          <input
            readonly="true"
            type="text"
            class="form-control"
            id="district"
            required
            v-model="customer.district"
            name="district"
          />
        </div>

        <div class="form-group">
          <label for="city">Localidade</label>
          <input
            readonly="true"
            type="text"
            class="form-control"
            id="city"
            required
            v-model="customer.city"
            name="city"
          />
        </div>

        <div class="form-group">
          <label for="uf">UF</label>
          <input
            readonly="true"
            type="text"
            class="form-control"
            id="uf"
            required
            v-model="customer.uf"
            name="uf"
          />
        </div>

        <button @click="saveCustomer" class="btn btn-success">Salvar</button>
      </div>
    </div>
    <div v-else>
      <h4>
        <b>{{ customer.name }}</b> salvo!
      </h4>
      <button class="btn btn-success" @click="newCustomer">Novo</button>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { Component, Vue, Watch } from "vue-property-decorator";
import CustomerDataService from "../../services/CustomerDataService";

@Component
export default class Add extends Vue {
  private customer: any = {
    id: "",
    nick: "",
    postalCode: "",
    street: "",
    complement: "",
    district: "",
    city: "",
    uf: "",
    created: "",
    updated: "",
  };

  private cep: any = null;
  private submitted = false;

  private baseUrl = "https://viacep.com.br/ws/";
  private response: any = null;
  @Watch("customer.postalCode")
  cepFind(novoCep: string) {
    if (novoCep.length === 8) this.getCep(novoCep);
    else this.response = null;
  }
  getCep(cep: string) {
    const url = `${this.baseUrl}${cep}/json/`;
    axios
      .get(url)
      .then((resp) => {
        const data = resp.data;
        if (!data.erro) {
          this.response = data;
          console.log("1");
          this.customer.street = this.response.logradouro;
          this.customer.district = this.response.bairro;
          this.customer.city = this.response.localidade;
          this.customer.uf = this.response.uf;
        } else {
          alert("Cep não encontrado");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  saveCustomer() {
    var data = {
      id: this.customer.id,
      nick: this.customer.nick,
      cep: this.customer.postalCode,
      street: this.customer.street,
      complement: this.customer.complement,
      district: this.customer.district,
      city: this.customer.city,
      uf: this.customer.uf,
      created: this.customer.created,
      updated: this.customer.updated,
    };

    CustomerDataService.create(data)
      .then((response) => {
        this.customer.id = response.data.id;
        console.log(response.data);
        this.submitted = true;
      })
      .catch((e) => {
        console.error(e);
      });
  }
  newCustomer() {
    this.submitted = false;
    this.cep = null;
    this.customer = {};
  }
}
</script>

<style scoped>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
