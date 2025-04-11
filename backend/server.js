require('dotenv').config();
const express = require('express');
const cors = require('cors');
const projetosRoutes = require('./controllers/projetos');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/projetos', projetosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
