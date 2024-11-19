import api from "./api";

export class SessionService {
  static async login({ email, password }) {
    const response = await api.post("/session", { email, password });

    return response.data;
  }
}
