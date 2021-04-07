<template>
  <div class="list row">
    <div class="col-md-6">
      <h4>Lista de Cliente</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          v-for="customer in customers"
          :key="customer.id"
          @click="setActiveCustomer(customer)"
        >
          {{ customer.email }}
        </li>
      </ul>
    </div>
    <div class="col-md-6">
      <div v-if="currentCustomer">
        <h4>Cliente</h4>
        <div>
          <label><strong>Nome:</strong></label>
          {{ currentCustomer.name }}
        </div>
        <div>
          <label><strong>Email:</strong></label> {{ currentCustomer.email }}
        </div>
        <div>
          <label><strong>CEP:</strong></label>
          {{ currentCustomer.cep }}
        </div>
        <div>
          <label><strong>Logradouro:</strong></label>
          {{ currentCustomer.street }}
        </div>
        <div>
          <label><strong>Complemento:</strong></label>
          {{ currentCustomer.complement }}
        </div>
        <div>
          <label><strong>Bairro:</strong></label> {{ currentCustomer.district }}
        </div>
        <div>
          <label><strong>Localidade:</strong></label>
          {{ currentCustomer.city }}
        </div>
        <div>
          <label><strong>UF:</strong></label> {{ currentCustomer.uf }}
        </div>
        <a
          class="badge badge-warning"
          :href="'/customers/' + currentCustomer.id"
        >
          Editar
        </a>
        <button class="badge badge-danger mr-2" @click="deleteCustomer">
          Apagar
        </button>
      </div>
      <div v-else>
        <br />
        <p>Selecione um Cliente...</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CustomerDataService from "../services/CustomerDataService";

@Component
export default class CustomersList extends Vue {
  private customers: any[] = [];
  private currentCustomer: any = null;
  private currentIndex = -1;
  private email = "";

  retrieveCustomers() {
    CustomerDataService.getAll()
      .then((response) => {
        this.customers = response.data;
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteCustomer() {
    CustomerDataService.delete(this.currentCustomer.id)
      .then((response) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveCustomers();
    this.currentCustomer = null;
    this.currentIndex = -1;
  }

  setActiveCustomer(customer: any, index: number) {
    this.currentCustomer = customer;
    this.currentIndex = index;
  }

  mounted() {
    this.retrieveCustomers();
  }
}
</script>

<style scoped>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
