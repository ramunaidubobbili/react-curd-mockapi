import api from "./CreateAPI";

class ServiceRequest {
  getData(){
    return api.get("/articles");
  }
  get(id) {
    return api.get(`/articles/${id}`);
  }

  create(data) {
    return api.post("/articles", data);
  }

  update(id, data) {
    return api.put(`/articles/${id}`, data);
  }

  delete(id) {
    return api.delete(`/articles/${id}`);
  }

  findByName(name) {
    return api.get(`/articles?name=${name}`);
  }
}

export default new ServiceRequest();