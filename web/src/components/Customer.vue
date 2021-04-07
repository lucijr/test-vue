<template>
  <div v-if="currentCustomer" class="edit-form">
    <div class="form-group">
      <label for="name">Nome</label>
      <input
        type="text"
        class="form-control"
        id="name"
        required
        v-model="currentCustomer.name"
        name="name"
      />
    </div>

    <div class="form-group">
      <label for="email">Email</label>
      <input
        type="text"
        class="form-control"
        id="email"
        required
        v-model="currentCustomer.email"
        name="email"
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
        v-model="currentCustomer.cep"
        name="cep"
      />
      <span>
        <button
          @click="getCep(currentCustomer.cep)"
          class="form-control"
          type="button"
        >
          Buscar Cep
        </button>
      </span>
    </div>

    <div class="form-group">
      <label for="street">Logradouro</label>
      <input
        readonly="true"
        type="text"
        class="form-control"
        id="street"
        required
        v-model="currentCustomer.street"
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
        v-model="currentCustomer.complement"
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
        v-model="currentCustomer.district"
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
        v-model="currentCustomer.city"
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
        v-model="currentCustomer.uf"
        name="uf"
      />
    </div>

    <button class="badge badge-danger mr-2" @click="deleteCustomer">
      Apagar
    </button>

    <button type="submit" class="badge badge-success" @click="updateCustomer">
      Update
    </button>
    <p>{{ message }}</p>
  </div>
  <div v-else>
    <br />
    <p>Por favor selecione um cliente...</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CustomerDataService from "../services/CustomerDataService";
import axios from "axios";

@Component
export default class Customer extends Vue {
  private currentCustomer: any = null;
  private message = "";

  private baseUrl = "https://viacep.com.br/ws/";
  private response: any = null;
  getCep(cep: string) {
    const url = `${this.baseUrl}${cep}/json/`;
    axios
      .get(url)
      .then((resp) => {
        const data = resp.data;
        if (!data.erro) {
          this.response = data;
          this.currentCustomer.street = this.response.logradouro;
          this.currentCustomer.district = this.response.bairro;
          this.currentCustomer.city = this.response.localidade;
          this.currentCustomer.uf = this.response.uf;
        } else {
          alert("Cep não encontrado");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getCustomer(id: string) {
    CustomerDataService.get(id)
      .then((response) => {
        this.currentCustomer = response.data;
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateCustomer() {
    CustomerDataService.update(this.currentCustomer.id, this.currentCustomer)
      .then((response) => {
        console.log(response.data);
        this.message = "Cliente atualizado com sucesso!";
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteCustomer() {
    CustomerDataService.delete(this.currentCustomer.id)
      .then((response) => {
        console.log(response.data);
        this.$router.push("/customers");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  mounted() {
    this.message = "";
    this.getCustomer(this.$route.params.id);
  }
}
</script>

<style scoped>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
