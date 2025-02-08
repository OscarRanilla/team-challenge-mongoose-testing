// Tests con Jest y Supertest

const app = require('../index');
const request = require('supertest');
const mongoose = require('mongoose');
const Post = require('../models/Post');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('API de Posts', () => {
    
    it('Debe crear una publicación', async () => {
        const res = await request(app).post('/posts/create').send({
            title: 'Test Post',
            body: 'Este es un test'
        });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.title).toBe('Test Post');
    });

    it('Debe obtener todas las publicaciones', async () => {
        const res = await request(app).get('/posts/');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

});