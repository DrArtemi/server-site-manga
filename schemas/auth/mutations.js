const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const models = require('../../models');
const { Op } = require('sequelize');
const passwordValidator = require('password-validator');

var schema = new passwordValidator();
schema
.is().min(8)
.is().max(100)
.has().not().spaces();

const mutations = {
    async registerUser(root, { pseudo, email, password }) {
        try {
            let token = '';
            let passResult = schema.validate(password, { list: true });
            if (passResult.length > 0) {
                return {
                    token,
                    status: "failure",
                    message: "password:" + "Mot de passe non valide (min 8 charactères)."
                }
            }
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
            if (!created) {
                let field = "unknown"
                if (user.pseudo === pseudo)
                    field = "pseudo"
                else if (user.email === email)
                    field = "mail"
                return {
                    token,
                    status: "failure",
                    message: field + ":" + field + " déjà utilisé."
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
                return {
                    token: "",
                    status: "failure",
                    message: "mail:Aucun utilisateur enregistré avec cet email."
                }
            }
            const isValid = await bcrypt.compare(password, user.password)
            if (!isValid) {
                return {
                    token: "",
                    status: "failure",
                    message: "password:Mot de passe invalide."
                }
            }
            // return jwt
            const token = jsonwebtoken.sign(
                { id: user.id, email: user.email},
                process.env.JWT_SECRET,
                { expiresIn: '1y'}
            )
            return {
                token,
                status: "success",
                message: "Authentication successful"
            }
        } catch (error) {
            throw new Error(error.message)
        }
    },
    async like(root, args, context, info) {
        const { manga_id } = args;
        const { user } = context;
        try {
            if(!user) throw new Error('You are not authenticated!');
            let user_model = await models.User.findByPk(user.id);
            let manga = await models.Manga.findOne({ where: { id: manga_id } });
            if (manga) {
                await user_model.addManga(manga);
                return {
                    success: true,
                    message: "Manga successfully liked."
                }
            } else {
                return {
                    success: false,
                    message: "Liked manga not found."
                }
            }            
        } catch (error) {
            throw new Error(error.message)
        }
    },
    async unlike(root, args, context, info) {
        const { manga_id } = args;
        const { user } = context;
        try {
            if(!user) throw new Error('You are not authenticated!');
            let user_model = await models.User.findByPk(user.id);
            let manga = await models.Manga.findOne({ where: { id: manga_id } });
            if (manga) {
                await user_model.removeManga(manga);
                return {
                    success: true,
                    message: "Manga successfully unliked."
                }
            } else {
                return {
                    success: false,
                    message: "Unliked manga not found."
                }
            }            
        } catch (error) {
            throw new Error(error.message)
        }
    },
};

module.exports.mutations = mutations;