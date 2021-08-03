const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const models = require('../../models');
const { Op } = require('sequelize');


const mutations = {
    async registerUser(root, { pseudo, email, password }) {
        try {
            const [user, created] = await models.User.findOrCreate({
                where: {
                    [Op.or]: [
                        { pseudo: pseudo },
                        { email: email },
                    ]
                },
                defaults: {
                    pseudo: pseudo,
                    email: email,
                    password: await bcrypt.hash(password, 10)
                }
            })
            let token = ''
            if (!created) {
                let field = "unknown"
                if (user.pseudo === pseudo)
                    field = "pseudo"
                else if (user.email === email)
                    field = "email"
                return {
                    token,
                    status: "error",
                    message: field + " already exists"
                }
            }
            token = jsonwebtoken.sign(
                { id: user.id, email: user.email},
                process.env.JWT_SECRET,
                { expiresIn: '1y' }
            )
            return {
                token, status: "success", message: "Authentication successful"
            }
        } catch (error) {
            throw new Error(error.message)
        }
    },
    async login(_, { email, password }) {
        try {
            const user = await models.User.findOne({ where: { email }})
            if (!user) {
                throw new Error('No user with that email')
            }
            const isValid = await bcrypt.compare(password, user.password)
            if (!isValid) {
                throw new Error('Incorrect password')
            }
            // return jwt
            const token = jsonwebtoken.sign(
                { id: user.id, email: user.email},
                process.env.JWT_SECRET,
                { expiresIn: '1d'}
            )
            return {
                token, user
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }
};

module.exports.mutations = mutations;