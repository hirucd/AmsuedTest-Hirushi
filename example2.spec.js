const { test, expect, request } = require('@playwright/test');

const BASE_URL = 'https://api.restful-api.dev';
let createdObjectId;

const logResponse = async (response) => {
    console.log('Status:', response.status());
    console.log('Response:', await response.text());
    console.log();
};
const expectedFirstObject = {
    id: "1",
    name: "Google Pixel 6 Pro",
    data: {
        color: "Cloudy White",
        capacity: "128 GB"
    }
};
const newObject = {
    name: 'Apple MacBook Air M2',
    data: {
        color: "Cloudy Blue",
        capacity: "200 GB"
    }
};
const updatedObject = {
    name: 'Apple MacBook Air M3',
    data: {
        color: "Cloudy Dark Blue",
        capacity: "298 GB"
    }
};

test.describe('API Automation Tests Assignment', () => {
    test('1) Get all objects', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/objects`);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBeTruthy();
        expect(responseBody.length).toBeGreaterThanOrEqual(0); // Ensure there's at least one object
        if (responseBody.length > 0) {
            const firstObject = responseBody[0];
            expect(firstObject).toEqual(expectedFirstObject); // Compare first object with expected data
        }
        await logResponse(response);
    });

    test('2) Create an object', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/objects`, { data: newObject });
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toMatchObject(newObject);
        expect(responseBody.id).toBeDefined(); // Ensure that the response contains an ID
        createdObjectId = responseBody.id;
        console.log("New object Id: " + createdObjectId);
        await logResponse(response);
    });

    test('3) Retrieve the created object', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/objects/${createdObjectId}`);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.id).toBe(createdObjectId);
        expect(responseBody.name).toBe('Apple MacBook Air M2'); // Ensure the correct object is retrieved
        await logResponse(response);
    });

    test('4) Update the object', async ({ request }) => {
        const response = await request.put(`${BASE_URL}/objects/${createdObjectId}`, { data: updatedObject });
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toMatchObject(updatedObject);
        expect(responseBody.name).toBe('Apple MacBook Air M3'); // Ensure the name is updated
        //Validate the structure of the response
        expect(responseBody).toHaveProperty('id');
        expect(responseBody).toHaveProperty('name');
        expect(responseBody).toHaveProperty('data');
        expect(responseBody.data).toHaveProperty('color');
        expect(responseBody.data).toHaveProperty('capacity');
        //print the updated object body 
        console.log('Response ID:', responseBody.id);
        console.log('Response Name:', responseBody.name);
        console.log('Response Color:', responseBody.data.color);
        console.log('Response Capacity:', responseBody.data.capacity);
        await logResponse(response);
    });

    test('5) Delete the object', async ({ request }) => {
        const response = await request.delete(`${BASE_URL}/objects/${createdObjectId}`);
        expect(response.status()).toBe(200);
        await logResponse(response);
        const getResponse = await request.get(`${BASE_URL}/objects/${createdObjectId}`);
        expect(getResponse.status()).toBe(404); // Ensure that the object is no longer found
        await logResponse(getResponse);
    });
});
