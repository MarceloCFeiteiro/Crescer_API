
import { test as base } from '@playwright/test';
import {getTokenAuthentication} from '../utils/helpers.js';

// adiciona fixture `user` e `token`
export const test = base.extend({
  user: async ({}, use, testInfo) => {
    const config = testInfo.project.use;
    await use(config.user); // injeta user direto
  },

  token: async ({ request, user }, use) => {
    // usa helper para pegar token
    const token = await getTokenAuthentication(request, user);
    await use(token);
  }
});
