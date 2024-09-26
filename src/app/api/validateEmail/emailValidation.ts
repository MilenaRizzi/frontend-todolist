export const validateEmail = async (email: string): Promise<boolean> => {
  try {
    const response = await fetch(
      `https://api.hunter.io/v2/email-verifier?email=${email}&api_key=62e5dc3b3a61f1b6e8d3a04b6dd48b815160248b`
    );
    const result = await response.json();

    return result.data.result === "deliverable";
  } catch (error) {
    console.error("Erro ao validar o e-mail:", error);
    return false;
  }
};
