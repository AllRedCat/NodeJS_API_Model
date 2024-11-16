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

    controller.getUserById = async (req, res) => {
        const id = req.params.id;

        try {
            const connection = await connectionPromise();
            const [rows, fields] = await connection.execute('SELECT * FROM users WHERE id = ?', [id]);
            if (rows.length === 0) {
                return res.status(404).json({error: 'User not found'});
            }
            res.status(200).json(rows[0])
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    controller.postUser = async (req, res) => {
        const {name, email, password, rule} = req.body;

        if (!name || !email || !password || !rule) {
            return res.status(400).json({error: "All fields are required"});
        }

        const passwordHash = crypto.createHash('sha256').update(password).digest('hex');

        try {
            const connection = await connectionPromise();
            const [result] = await connection.execute('INSERT INTO users (name, email, passwordHash, rule) VALUES (?,?,?,?)', [name, email, passwordHash, rule]);
            res.status(200).json({message: 'User created successfully.'});
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    controller.putUser = async (req, res) => {
        const id = req.params.id;
        const {name, email, password, rule} = req.body;

        try {
            const connection = await connectionPromise();
            const [rows] = await connection.execute('SELECT * FROM users WHERE id = ?', [id]);
            if (rows.length === 0) {
                return res.status(404).json({error: 'User not found'});
            }

            const user = rows[0];

            const updates = [];
            const params = [];

            if (name !== undefined && name !== null) {
                updates.push('name = ?');
                params.push(name);
            } else {
                updates.push('name = ?');
                params.push(user.name);
            }

            if (email !== undefined && email !== null) {
                updates.push('email = ?');
                params.push(email);
            } else {
                updates.push('email = ?');
                params.push(user.email);
            }

            if (password !== undefined && password !== null) {
                const passwordHash = crypto.createHash('sha256').update(password).digest('hex');
                updates.push('passwordHash = ?');
                params.push(passwordHash);
            } else {
                updates.push('passwordHash = ?');
                params.push(user.passwordHash);
            }

            if (rule !== undefined && rule !== null) {
                updates.push('rule = ?');
                params.push(rule);
            } else {
                updates.push('rule = ?');
                params.push(rule);
            }

            params.push(id);

            const query = `UPDATE users SET ${updates.join(', ')} WHERE id = ?`;
            await connection.execute(query, params);

            res.status(200).json({message: 'User updated successfully.'});
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    return controller;
};
