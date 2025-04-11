const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// GET /api/projetos
router.get('/', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM projetos ORDER BY id');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao buscar projetos.' });
    }
});

// POST /api/projetos
router.post('/', async (req, res) => {
    const { titulo, descricao, linkgithub, linkdeploy } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO projetos (titulo, descricao, linkgithub, linkdeploy) VALUES ($1, $2, $3, $4) RETURNING *',
            [titulo, descricao, linkgithub, linkdeploy]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao adicionar projeto.' });
    }
});

// PUT /api/projetos/:id
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, descricao, linkgithub, linkdeploy } = req.body;
    try {
        const result = await pool.query(
            'UPDATE projetos SET titulo=$1, descricao=$2, linkgithub=$3, linkdeploy=$4 WHERE id=$5 RETURNING *',
            [titulo, descricao, linkgithub, linkdeploy, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao atualizar projeto.' });
    }
});

// DELETE /api/projetos/:id
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM projetos WHERE id = $1', [id]);
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao deletar projeto.' });
    }
});

module.exports = router;
