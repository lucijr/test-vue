import Axios from "axios";
import http from "../http-common";

class CustomerDataService {
  getAll() {
    return http.get("/customers");
  }

  get(id: string) {
    return http.get(`/customers/${id}`);
  }

  create(data: any) {
    return http.post("/customers", data);
  }

  update(id: string, data: any) {
    return http.put(`/customers/${id}`, data);
  }

  delete(id: string) {
    return http.delete(`/customers/${id}`);
  }

  searchCep(cep: string) {
    return Axios.get(`https://viacep.com.br/ws/${cep}/json/`);
  }
}

export default new CustomerDataService();
