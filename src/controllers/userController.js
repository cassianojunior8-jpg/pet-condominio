const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { nome, email, senha, id_residencia } = req.body;

    const hash = await bcrypt.hash(senha, 10);

    await pool.query(
        'INSERT INTO morador (nome, email, senha, id_residencia) VALUES ($1,$2,$3,$4)',
        [nome, email, hash, id_residencia]
    );

    res.json({ msg: 'Usuário criado' });
};

exports.login = async (req, res) => {
    const { email, senha } = req.body;

    const user = await pool.query(
        'SELECT * FROM morador WHERE email=$1',
        [email]
    );

    if (user.rows.length === 0)
        return res.status(400).json({ msg: 'Usuário não encontrado' });

    const valid = await bcrypt.compare(senha, user.rows[0].senha);

    if (!valid)
        return res.status(400).json({ msg: 'Senha inválida' });

    const token = jwt.sign(
        { id: user.rows[0].id },
        process.env.JWT_SECRET
    );

    res.json({ token });
};