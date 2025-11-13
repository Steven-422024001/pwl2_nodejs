// const express = require('express');
import fetch from 'node-fetch';
import express from 'express';
import ejs from 'ejs';

import path from 'path';
import { fileURLToPath } from 'url';
//const path = require('path');

const app = express();
const PORT = 3000;

// Tentukan_filename dan _dirname secara manual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set folder 'public' sebagai statis (CSS,JS)
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS sebagai view engine
app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

// Route ke halaman utama
app.get('/', (req, res) => {
    res.render('index');
});

// Route untuk mendapatkan data user dari Laravel API
app.get('/users', async (req, res) => {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/users');
        const users = await response.json();
        res.render('user', { users: users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Error fetching users');
    }
});

// ... (kode route /users kamu ada di atas sini) ...

// Route untuk mendapatkan data products
app.get('/products', async (req, res) => {
    try {
        // DIBENERIN: URL-nya harus /api/products/lihat
        const response = await fetch('http://127.0.0.1:8000/api/products/lihat'); 
        const products = await response.json();
        
        // Render file 'views/products.html' dan kirim datanya
        res.render('products', { products: products });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Error fetching products');
    }
});

// Route untuk mendapatkan data categories
app.get('/categories', async (req, res) => {
    try {
        // DIBENERIN: URL-nya harus /api/categories/lihat
        // (PASTIKAN INI SUDAH DITAMBAHKAN DI routes/api.php LARAVEL KAMU)
        const response = await fetch('http://127.0.0.1:8000/api/categories/lihat'); 
        const categories = await response.json();
        
        // Render file 'views/categories.html' dan kirim datanya
        res.render('categories', { categories: categories });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).send('Error fetching categories');
    }
});

// Route untuk mendapatkan data suppliers
app.get('/suppliers', async (req, res) => {
    try {
        // DIBENERIN: URL-nya harus /api/suppliers/lihat
        const response = await fetch('http://127.0.0.1:8000/api/suppliers/lihat'); 
        const suppliers = await response.json();
        
        // Render file 'views/suppliers.html' dan kirim datanya
        res.render('suppliers', { suppliers: suppliers });
    } catch (error) {
        console.error('Error fetching suppliers:', error);
        res.status(500).send('Error fetching suppliers');
    }
});

// ... (kode app.listen kamu ada di bawah sini) ...


app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});

