import axios from "axios";

const API_URL = "http://localhost:8080";

interface LoginData {
  email: string;
  password: string;
}

interface UserData {
  id?: string;
  name: string;
  email: string;
  password?: string; // Senha pode ser opcional
}

export const signIn = async (data: LoginData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signUp = async (data: UserData) => {
  try {
    const response = await axios.post(`${API_URL}/user/register`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUserService = async (user: UserData, token: string) => {
  if (!user.id) {
    throw new Error("ID do usuário não fornecido");
  }

  try {
    const response = await axios.put(`${API_URL}/user/${user.id}`, user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    alert("Usuário atualizado com sucesso");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserByEmailService = async (email: string, token: string) => {
  try {
    const response = await axios.get(`${API_URL}/user/email/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id: string, token: string | null) => {
  try {
    if (!token) {
      throw new Error("Token não fornecido");
    }

    await axios.delete(`${API_URL}/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw error;
  }
};
