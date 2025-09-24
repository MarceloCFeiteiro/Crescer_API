import { test } from '../fixtures/authFixture.js';
import { expect } from '@playwright/test';
import body from '../api/jsonFiles/BodyPostRegisterUer.json' assert { type: 'json' };
import { HatStoreApi } from '../api/hatStoreApi.js';
import { CreateUserToRegister } from '../utils/helpers.js';

let hatApi;

test.describe('Registar Usuario No Sistema', () => {
    test.beforeEach(async ({ request }) => {
        hatApi = new HatStoreApi(request);
    })

    test('Realizar Cadastro De Usuário Com Sucesso', async () => {

        //ARRANJE
        let modifiedBody = await CreateUserToRegister(body)

        //ACT
        const response = await hatApi.post('/auth/register', modifiedBody);

        //ASSERT
        const data = await response.json();

        expect(await response.ok()).toBeTruthy();

        expect(data).toHaveProperty('message');

        expect(data.message).toBe('Usuário criado com sucesso!');

    });

    test('Realizar Cadastro De Usuário Já Cadastrado', async ({ user }) => {

        //ARRANJE
        //ACT
        const response = await hatApi.post('/auth/register', user);

        //ASSERT
        expect(await response.status()).toBe(409);

        expect(await response.text()).toBe("Usuário já existe\n");
    });

     test('Realizar Cadastro De Usuário Com email Igual 110', async ({ user }) => {

        //ARRANJE
        user.email = 100

        //ACT
        const response = await hatApi.post('/auth/register', user);

        //ASSERT
        expect(await response.status()).toBe(400);

        expect(await response.text()).toBe("Requisição inválida\n");
    });
});
