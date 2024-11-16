const connectionPromise = require('../database/connection');
const crypto = require('crypto');

module.exports = () => {
    const controller = {}

    controller.getUsers = async (req, res) => {
        try {
            const connection = await connectionPromise();
            const [rows, fields] = await connection.execute('SELECT * FROM users');
            res.status(200).json(rows);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    controller.postUser = async (req, res) => {
        const { name, email, password, rule } = req.body;

        if (!name || !email || !password || !rule) {
            return res.status(400).json({error: "All fields are required"});
        }

        const passwordHash = crypto.createHash('sha256').update(password).digest('hex');

        try {
            const connection = await connectionPromise();
            const [result] = await connection.execute('INSERT INTO users (name, email, passwordHash, rule) VALUES (?,?,?,?)', [name, email, passwordHash, rule]);
            res.status(200).json({ message: 'User created successfully.' });
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    return controller;
};
