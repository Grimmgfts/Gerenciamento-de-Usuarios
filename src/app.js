const express = require("express");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api", userRoutes);

app.listen(PORT, () => {
  console.log(`[API Connect] Servidor rodando na porta ${PORT}`);
});