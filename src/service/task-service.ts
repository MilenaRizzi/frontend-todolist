import axios from "axios";

const API_BASE_URL = "http://localhost:8080/tasks";

interface TaskData {
  id?: number;
  description: string;
  completed: boolean;
}

export const getTasks = async (token: string | null) => {
  try {
    const response = await axios.get(API_BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response)
    // Filtrar tarefas para garantir que task.id seja um número
    const tasks = response.data;
    return tasks.filter((task: any) => typeof task.id === "number");
  } catch (error) {
    console.error("Erro ao conectar ao backend:", error);
    throw error;
  }
};

export const postTask = async (
  task: TaskData,
  token: string | null
): Promise<TaskData> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/add`, task, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao conectar ao backend:", error);
    throw error;
  }
};

export const updateTask = async (
  task: TaskData,
  token: string | null
): Promise<TaskData> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${task.id}`, task, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao conectar ao backend:", error);
    throw error;
  }
};

export const deleteTask = async (id: number, token: string | null) => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Erro ao conectar ao backend:", error);
    throw error;
  }
};
