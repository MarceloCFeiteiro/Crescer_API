import { test } from '../fixtures/authFixture.js';
import { expect } from '@playwright/test';
import body from '../api/jsonFiles/BodyPostLogin.json' assert {type: 'json'}
import { HatStoreApi } from '../api/hatStoreApi.js';
import { jwtRegex } from '../utils/regexs.js';

let hatApi;
let bodyLogin = body;

test.describe('Teste de Login', () => {
    test.beforeEach(async ({ request, user }) => {
        hatApi = new HatStoreApi(request);
        bodyLogin.email = "mcardoso@yahoo.com.br";
        bodyLogin.password = "123qa";
    })


    test('Realizar Login com Sucesso', async () => {
        //ARRANJE
        //ACT
        const response = await hatApi.post('/auth/login', bodyLogin)

        //ASSERT
        const data = await response.json();

        expect(await response.ok()).toBeTruthy();

        expect(data).toHaveProperty('token');

        expect(jwtRegex.test(data.token)).toBeTruthy();
    });

    
})