export const validateCPF = (cpf: number | undefined) => {
  return /^(\d{11})$/.test(String(cpf));
};

export const validateNome = (nome: string) => {
  return /^[a-zA-ZÀ-ÿ\s]+$/.test(nome) && nome.trim() !== "";
};

export const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validateTelefone = (telefone: string) => {
  return /^\(\d{2}\) \d{5}-\d{4}$/.test(telefone);
};

export const validateNascimento = (nascimento: string) => {
  const date = new Date(nascimento);
  const today = new Date();
  return date <= today;
};
