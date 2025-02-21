const { test, expect, request } = require('@playwright/test');

const BASE_URL = 'https://api.restful-api.dev';
let createdObjectId;

test.describe('API Automation Tests Assignment', () => {
    const logResponse = async (response) => {
        console.log('Status:', response.status());
        console.log('Response:', await response.text());
        console.log();
    };

    test('Get all objects', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/objects`);
        expect(response.status()).toBe(200);
        expect(Array.isArray(await response.json())).toBeTruthy();
        await logResponse(response);
    });

    test('Create an object', async ({ request }) => {
        const newObject = {
            name: 'Apple MacBook Air M2', data: {
                "year": 2023,
                "price": 1299.99,
                "CPU model": "Apple M2",
                "Hard disk size": "512 GB",
                "color": "Space Gray"
            }
        };
        const response = await request.post(`${BASE_URL}/objects`, { data: newObject });
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toMatchObject(newObject);
        createdObjectId = responseBody.id;
        await logResponse(response);
    });

    test('Retrieve the created object', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/objects/${createdObjectId}`);
        expect(response.status()).toBe(200);
        expect((await response.json()).id).toBe(createdObjectId);
        await logResponse(response);
    });

    test('Update the object', async ({ request }) => {
        const updatedObject = { name: 'Apple MacBook Air M3', data: {
            "year": 2024,
            "price": 2000.99,
            "CPU model": "Apple M3",
            "Hard disk size": "600 GB",
            "color": "Space Black"
        }
    };
        const response = await request.put(`${BASE_URL}/objects/${createdObjectId}`, { data: updatedObject });
        expect(response.status()).toBe(200);
        expect(await response.json()).toMatchObject(updatedObject);
        await logResponse(response);
    });

    test('Delete the object', async ({ request }) => {
        const response = await request.delete(`${BASE_URL}/objects/${createdObjectId}`);
        expect(response.status()).toBe(200);
        await logResponse(response);
        const getResponse = await request.get(`${BASE_URL}/objects/${createdObjectId}`);
        expect(getResponse.status()).toBe(404);
        await logResponse(getResponse);
    });
});
