// const express = require('express');
import fetch from 'node-fetch';
import express from 'express';
import ejs from 'ejs';

import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';

//const path = require('path');

const app = express();
const PORT = 3000;

// Tentukan_filename dan _dirname secara manual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set folder 'public' sebagai statis (CSS,JS)
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

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

// Form Tambah Pengguna 
app.get('/users/create', (req, res) => {
    res.render('user_create');
});

// Tampilkan Detail Pengguna
app.get('/users/:id', async (req, res) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/users/${req.params.id}`);

        const user = await response.json();
        res.render('user_show', { user: user });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send('Error fetching user');
    }
}); 

// Tambah pengguna
app.post('/users', async (req, res) => {
    try {

        const response = await fetch('http://127.0.0.1:8000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            })
        });
        res.redirect('/users');
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Error creating user');
    }
});

// Form Edit Pengguna
app.get('/users/:id/edit', async (req, res) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/users/${req.params.id}`);

        const user = await response.json();
        res.render('user_update', { user: user });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send('Error fetching user');
    }
});

// Edit Pengguna
app.put('/users/:id', async (req, res) => {
    try {
        const dataToUpdate = {
            name: req.body.name,
            email: req.body.email
        };

        if (req.body.password) {
            dataToUpdate.password = hashedPassword;
        }

        await fetch(`http://127.0.0.1:8000/api/users/${req.params.id}`, {
            method: 'PUT',
            headers: {
                // 'Authorization': 'API_TOKEN',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToUpdate)
        });
        res.redirect('/users');
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Error updating user');
    }
});

// Hapus Pengguna
app.delete('/users/:id', async (req, res) => {
    try {
        await fetch(`http://127.0.0.1:8000/api/users/${req.params.id}`, {
            method: 'DELETE',
            // headers: { 'Authorization': 'API_TOKEN' }
        });
        res.redirect('/users');
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Error deleting user');
    }
});

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
        const categories = await response.jsson();
        
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

app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});

app.get('/products', async (req, res) => {
    try {
        // API Laravel: /api/products/lihat
        const response = await fetch('http://127.0.0.1:8000/api/products/lihat'); 
        const products = await response.json();
        res.render('products', { products: products });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Error fetching products');
    }
});

// 2. Route: Menampilkan Form Tambah Produk (ROUTE SPESIFIK)
app.get('/products/create', (req, res) => {
    res.render('products_create');
});

// 3. Route: Menampilkan Form Edit Produk (ROUTE SPESIFIK DENGAN PARAMETER)
// HARUS DI ATAS ROUTE UMUM /products/:id
app.get('/products/:id/edit', async (req, res) => {
    try {
        // API Laravel: /api/products/lihat/ID
        const response = await fetch(`http://127.0.0.1:8000/api/products/lihat/${req.params.id}`);
        const product = await response.json();
        res.render('products_update', { product: product }); 
    } catch (error) {
        console.error('Error fetching product for edit:', error);
        res.status(500).send('Error fetching product');
    }
});

// 4. Route: Detail Produk (products_show) (ROUTE UMUM DENGAN PARAMETER)
// INI ADALAH ROUTE YANG MENGATASI MASALAH 'Cannot GET /products/ID'
app.get('/products/:id', async (req, res) => {
    try {
        // API Laravel: /api/products/lihat/ID
        const response = await fetch(`http://127.0.0.1:8000/api/products/lihat/${req.params.id}`);
        if (!response.ok) {
            throw new Error('Product not found');
        }
        const product = await response.json();
        res.render('products_show', { product: product }); 
    } catch (error) {
        console.error('Error fetching product detail:', error);
        res.status(404).send('Product not found');
    }
});

// 5. Route: Menangani POST Tambah Produk
app.post('/products', async (req, res) => {
    try {
        const productData = {
            title: req.body.title, 
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
            product_category_id: req.body.product_category_id,
            supplier_id: req.body.supplier_id,
            image: req.body.image
        };

        const response = await fetch('http://127.0.0.1:8000/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData)
        });
        
        if (!response.ok) {
            const errorText = await response.text(); 
            throw new Error(`Gagal menyimpan produk. Status: ${response.status}. Pesan: ${errorText}`);
        }
        
        res.redirect('/products');
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).send('Error creating product: ' + error.message);
    }
});

// 6. Route: Menangani PUT Edit Produk 
app.put('/products/:id', async (req, res) => {
    try {
        const dataToUpdate = {
            title: req.body.title, 
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
            product_category_id: req.body.product_category_id,
            supplier_id: req.body.supplier_id,
            image: req.body.image
        };
        
        const response = await fetch(`http://127.0.0.1:8000/api/products/${req.params.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToUpdate)
        });

        if (!response.ok) {
            const errorText = await response.text(); 
            throw new Error(`Gagal mengupdate produk. Status: ${response.status}. Pesan: ${errorText}`);
        }

        res.redirect('/products');
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).send('Error updating product: ' + error.message);
    }
});

// 7. Route: Menangani DELETE Produk
app.delete('/products/:id', async (req, res) => {
    try {
        await fetch(`http://127.0.0.1:8000/api/products/${req.params.id}`, {
            method: 'DELETE'
        });
        res.redirect('/products');
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).send('Error deleting product');
    }
});