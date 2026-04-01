const pool = require('../config/db');

exports.createPet = async (req, res) => {
    const { nome, especie, raca, idade } = req.body;
    const userId = req.user.id;

    await pool.query(
        'INSERT INTO pet (nome, especie, raca, idade, id_morador) VALUES ($1,$2,$3,$4,$5)',
        [nome, especie, raca, idade, userId]
    );

    res.json({ msg: 'Pet cadastrado' });
};

exports.getPets = async (req, res) => {
    const userId = req.user.id;

    const pets = await pool.query(
        'SELECT * FROM pet WHERE id_morador=$1',
        [userId]
    );

    res.json(pets.rows);
};