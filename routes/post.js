// Rutas de la API 

const express = require('express');
const Post = require('../models/Post');
const router = express.Router();

// Crear publicación
router.post('/create', async (req, res) => {
    try {
        const { title, body } = req.body;
        if (!title || !body) return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        const post = new Post({ title, body });
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener todas las publicaciones
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener publicación por ID
router.get('/id/:_id', async (req, res) => {
    try {
        const post = await Post.findById(req.params._id);
        if (!post) return res.status(404).json({ error: 'Publicación no encontrada' });
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener publicación por título
router.get('/title/:title', async (req, res) => {
    try {
        const post = await Post.findOne({ title: req.params.title });
        if (!post) return res.status(404).json({ error: 'Publicación no encontrada' });
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar publicación
router.put('/id/:_id', async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params._id, req.body, { new: true });
        if (!updatedPost) return res.status(404).json({ error: 'Publicación no encontrada' });
        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar publicación
router.delete('/id/:_id', async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params._id);
        if (!deletedPost) return res.status(404).json({ error: 'Publicación no encontrada' });
        res.json({ message: 'Publicación eliminada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Paginación de publicaciones
router.get('/postsWithPagination', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const posts = await Post.find().skip((page - 1) * limit).limit(limit);
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;