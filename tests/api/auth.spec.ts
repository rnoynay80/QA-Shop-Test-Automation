import { test, expect } from '@playwright/test';

test('successful login with valid credentials', async ({ request }) => {
  const response = await request.post('/api/v1/auth/login', {
    headers: {
      'X-Sandbox-Key': process.env.QA_SHOP_SANDBOX_KEY ?? '',
    },
    data: {
      email: 'demo@qashop.test',
      password: 'Password123!',
    },
  });

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.token).toBeTruthy();
  expect(body.tokenType).toBe('Bearer');
  expect(body.expiresIn).toBe(3600);

  expect(body.user).toBeTruthy();
  expect(body.user.email).toBe('demo@qashop.test');
  expect(body.user.name).toBe('Demo User');
});

test('login fails with invalid password', async ({ request }) => {
  const response = await request.post('/api/v1/auth/login', {
    headers: {
      'X-Sandbox-Key': process.env.QA_SHOP_SANDBOX_KEY ?? '',
    },
    data: {
      email: 'demo@qashop.test',
      password: 'WrongPassword123!',
    },
  });

  expect(response.status()).toBe(401);
});

test('login fails with unknown user', async ({ request }) => {
  const response = await request.post('/api/v1/auth/login', {
    headers: {
      'X-Sandbox-Key': process.env.QA_SHOP_SANDBOX_KEY ?? '',
    },
    data: {
      email: 'unknown@qashop.test',
      password: 'Password123!',
    },
  });

  expect(response.status()).toBe(401);
});

test('login fails when credentials are missing', async ({ request }) => {
  const response = await request.post('/api/v1/auth/login', {
    headers: {
      'X-Sandbox-Key': process.env.QA_SHOP_SANDBOX_KEY ?? '',
    },
    data: {
      email: '',
      password: '',
    },
  });

  expect(response.status()).toBe(400);

  const body = await response.json();

  expect(body.error.code).toBe('BAD_REQUEST');
  expect(body.error.details.missing).toEqual(['email', 'password']);
});