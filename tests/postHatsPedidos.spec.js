import { test } from '../fixtures/authFixture.js';
import { expect } from '@playwright/test';
import body from '../api/jsonFiles/BodyPostHatPedido.json' assert { type: 'json' };
import { HatStoreApi } from '../api/hatStoreApi.js';

test.describe('Testes Loja de Chapeus Endpoint Post Pedidos', () => {

    test('Realizar Pedido', async ({ request, token }) => {

        //ARRANJE
        const hatApi = new HatStoreApi(request);

        //ACT
        const response = await hatApi.post('/api/pedido', body, {
            headers: {
                Authorization: token
            }
        })

        //ASSERT

        const data = await response.json()

        expect(await response.ok()).toBeTruthy()

        expect(data).toHaveProperty('mensagem')

        expect(data.mensagem).toBe('Pedido registrado com sucesso')
    });

    test('Realizar Pedido Para Chapeu Inexistente', async ({ request, token }) => {

        //ARRANJE
        const hatApi = new HatStoreApi(request);

        let modifiedBody = { ...body }

        modifiedBody.itens[0].id = 100

        //ACT
        const response = await hatApi.post('/api/pedido', body, {
            headers: {
                Authorization: token
            }
        })

        //ASSERT
        expect(await response.status()).toBe(400);

        expect(await response.text()).toBe("Chapéu não encontrado: Chapéu Gustavo Carvalho\n");
    });
});