import axios from "axios";

type LoginData = {
  email: string;
  password: string;
}

type LoginResponse = {
  id: number
}

export const authService = {
  login: async ({ email, password }: LoginData) => {
    const { id } = (await axios.post<LoginResponse>("http://localhost:5000/auth", { data: { username: email, password } })).data

    if (!!id) {
      return {
        id,
        name: 'Usuário',
        email,
        token: 'fake-jwt-token'
      };
    }
    throw new Error('Credenciais inválidas');
  }
};