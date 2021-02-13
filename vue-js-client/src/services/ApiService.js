import http from "../http-common";

class DataService {
  getAll() {
    return http.get("/songs");
  }

  get(id) {
    return http.get(`/songs/${id}`);
  }

  create(data) {
    return http.post("/songs", data);
  }

  update(id, data) {
    return http.put(`/songs/${id}`, data);
  }

  delete(id) {
    return http.delete(`/songs/${id}`);
  }

  findByTitle(title) {
    return http.get(`/songs?title=${title}`);
  }
}

export default new DataService();