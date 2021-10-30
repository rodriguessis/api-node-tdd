const { User } = require('../../src/app/models');
const bcrypt    = require('bcryptjs');
const truncate = require('../utils/truncate');

describe( 'User', () => {

    beforeEach( async () => {
        await truncate();
    })

    it( 'deve encrypt o usuario', async () => {
  
        const user = await User.create(
            {   nome : "Ricardo ", 
                email : "ros.fricardo@gmail.com", 
                password : "123456"});

        const hash = await bcrypt.hash('123456', 8);

        expect( await bcrypt.compare('123456', user.password_hash)).toBe(true) ;

  })
})



















