import { Router } from 'express';
import Product from '../models/products.model.js';

const router = Router();


router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener productos', error });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send({ message: 'Producto no encontrado' });
        }
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener el producto', error });
    }
});


router.post('/', async (req, res) => {
    try {
        const { name, description, price, category, stock, images, status } = req.body;
        const newProduct = new Product({ name, description, price, category, stock, images, status });
        const savedProduct = await newProduct.save();
        res.status(201).send(savedProduct);
    } catch (error) {
        res.status(500).send({ message: 'Error al crear el producto', error });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).send(updatedProduct);
    } catch (error) {
        res.status(500).send({ message: 'Error al actualizar el producto', error });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).send({ message: 'Producto eliminado', deletedProduct });
    } catch (error) {
        res.status(500).send({ message: 'Error al eliminar el producto', error });
    }
});

export default router;
