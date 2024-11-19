import api from "./api";

export class UserService {
  static async get() {
    const response = await api.get("/user");

    return response.data;
  }
  static async createUser(data) {
    const response = await api.post("/user", data);

    return response.data;
  }

  static async updateUser(id, data) {
    const response = await api.put("/user", data, {
      params: { id },
    });

    return response.data;
  }

  static async deleteUser(id) {
    const response = await api.delete("/user", {
      params: { id },
    });

    return response.data;
  }
}
