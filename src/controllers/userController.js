let users = [
  { id: 1, name: "Alice Silva", email: "alice@email.com" },
  { id: 2, name: "Bob Santos", email: "bob@email.com" }
];
let nextId = 3;

// 1. Listar todos os usuários (GET)
exports.getAllUsers = (req, res) => {
  return res.status(200).json(users);
};

// 2. Buscar usuário por ID (GET)
exports.getUserById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({
      error: "Usuário não encontrado.",
      details: `Nenhum registro associado ao ID ${id} foi localizado.`
    });
  }

  return res.status(200).json(user);
};

// 3. Cadastrar usuário (POST) com validações
exports.createUser = (req, res) => {
  const { name, email } = req.body;

  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({
      status: "fail",
      error: {
        message: "Validação de dados falhou.",
        details: "O campo 'name' é obrigatório e deve ser um texto válido."
      }
    });
  }

  if (!email || typeof email !== "string" || email.trim() === "") {
    return res.status(400).json({
      status: "fail",
      error: {
        message: "Validação de dados falhou.",
        details: "O campo 'email' é obrigatório e deve ser um texto válido."
      }
    });
  }

  const newUser = {
    id: nextId++,
    name: name.trim(),
    email: email.trim().toLowerCase()
  };

  users.push(newUser);

  return res.status(201).json({
    status: "success",
    data: newUser
  });
};