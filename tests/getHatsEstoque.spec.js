import { test, expect } from '@playwright/test';
import { HatStoreApi } from '../api/hatStoreApi.js';

test.describe('Testes Loja de Chapeus Get do Estoque', () => {

    test.only('Buscar Estoque', async ({ request }) => {

        //ARRANJE
        const hatApi = new HatStoreApi(request);

        //ACT
        const response = await hatApi.get('/api/estoque')

        //ASSERT
        expect(await response.ok()).toBeTruthy();

        const hats = await response.json()

        expect(hats.length).toBeGreaterThanOrEqual(1)

        for (const hat of hats) {
            // Garante que seja objeto
            expect(typeof hat).toBe('object');

            // Verifica se tem as propriedades obrigatórias
            expect(hat).toHaveProperty('id');
            expect(hat).toHaveProperty('nome');
            expect(hat).toHaveProperty('quantidade');

            // (Opcional) Valida tipos
            expect(typeof hat.id).toBe('number');
            expect(typeof hat.nome).toBe('string');
            expect(typeof hat.quantidade).toBe('number');
        }

    });
});