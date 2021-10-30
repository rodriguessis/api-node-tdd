const factory = require('../factories');
const request   = require("supertest");
const app       = require("../../src/app");
const truncate  = require('../utils/truncate' )

describe('Authentication',  () => {
    const senha_valida   = '123456'
    const senha_invalida = '999999';

    beforeEach( async () => { 
        await truncate();
    })

    it('deve autenticar com credenciais validas', async () => {

        const user = await factory.create('User', { password : senha_valida } )

        const response = await request(app).post('/sessions')
                                       .send({email : user.email, senha : senha_valida } )

        expect(response.status).toBe(200);

    });

    it('nao deve autenticar com credenciais invalidas', async () => {

        const user = await factory.create('User');

        const response = await request(app).post('/sessions')
                                       .send({email : user.email, senha : senha_invalida } )

        expect(response.status).toBe(401);
        
    });

    it('deve receber um jwt token quando autenticar', async () => {

        const user = await factory.create('User', { password : senha_valida } );

        const response = await request(app).post('/sessions')
                                       .send({email : user.email, senha : senha_valida } );

        expect(response.body).toHaveProperty('token');

    });

    it('Deve poder acessar a rota DASHBORD quando tiver autenticado', async () => {

        const user = await factory.create('User', { password : senha_valida } );

        const response = await request(app)
                .get('/dashboard')
                .set('Authorization', `Bearer ${user.generateToken()}`);

        expect(response.status).toBe(200);

    });

    it('Não Deve poder acessar a rota DASHBORD sem um token', async () => {

        const user = await factory.create('User', { password : senha_valida } );

        const response = await request(app)
                .get('/dashboard');

        expect(response.status).toBe(401);

    });

    it('Não Deve poder acessar a rota DASHBORD com um token invalido', async () => {
        const user = await factory.create('User', { password : senha_valida } );

        const response = await request(app)
                .get('/dashboard')
                .set('Authorization', `Bearer 123123123123`);

        expect(response.status).toBe(401);

    });



});