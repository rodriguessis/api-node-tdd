const { User } = require("../models");

class SessionController {
    async store(req, res) {

        const { email, senha } = req.body;

        const user = await User.findOne({ where : { email } });

        if ( !user ) {
            return res.status(401).json({ mensagem : "Usuário não encontrado!" })   
        }

        if ( ! ( await user.checkPassword(senha) ) ) {
            return res.status(401).json({ mensagem : "Senha Inválida!" });
        }

        return res.json({user, token : user.generateToken() } );
        
    }

}

module.exports = new SessionController();