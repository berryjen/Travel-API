const request = require('supertest');
const app = require('./app.js');

/* 
TODO: write describe function for /Italy/Rome
- think of getting description correct: how should it respond? ex) /Italy/London
- then fill in code part

describe("Test the root path", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });
}); 

describe("Test get path /:country", () => {
  test("get request for /Croatia", async () => {
    const response = await request(app).get("/Croatia");
    expect(response.statusCode).toBe(200);
  });
});
 */

describe('Test get path /:country/:city', () => {
	test('get request for /England/Split', async () => {
		const response = await request(app).get('/England/Split');
		expect(response.statusCode).toBe(404);
	});
});

describe('Test get path /:country/:city', () => {
	test('get request for /Mars/London', async () => {
		const response = await request(app).get('/Mars/London');
		expect(response.statusCode).toBe(404);
	});
});

describe('Test get path /:country/:city', () => {
	test('get request for /Croatia/Split', async () => {
		const response = await request(app).get('/Croatia/Split');
		expect(response.statusCode).toBe(200);
	});
});

describe('GET /v2/:country', () => {
	test('should be ok, status 200', async () => {
		const response = await request(app).get('/v2/Italy');
		expect(response.statusCode).toBe(200);
	});

	test('should respond with a non-empty list of cities', async () => {
		const response = await request(app).get('/v2/Italy');
		expect(response.body.cities.length >= 1).toBe(true);
	});

	test('should respond with 404 for invalid country', async () => {
		const response = await request(app).get('/v2/Venus');
		expect(response.statusCode).toBe(404);
	});

	test('should respond with a JSON error message', async () => {
		const response = await request(app).get('/v2/Venus');
		expect(response.body.status).toBe(404);
		expect(typeof response.body.message === 'string').toBe(true);
	});

	test("should respond with a 'visited' property", async () => {
		const response = await request(app).get('/v2/Italy');
		expect(response.body).toHaveProperty('visited');
	});

	test("should respond with a 'would_visit' property", async () => {
		const response = await request(app).get('/v2/Italy');
		expect(response.body).toHaveProperty('would_visit');
	});
	test('should respond with correctly matched country city pair', async () => {
		const response = await request(app).get('/Italy/Rome');
		expect(response.body.length === 1).toBe(true);
	});
});
