const { User } = require("../../../src/app/models");

describe('Authentication',  () => {

it('deve cadastrar um usuário', async () => {

    const user = await User.create(
        { nome : "Ricardo", 
            email : "rodrigues@gmail.com", 
            password_hash : "123123"});

    console.log( user );
    expect(user.email).toBe("rodrigues@gmail.com");

});

});