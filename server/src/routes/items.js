import express from 'express';
import Item from '../models/Item.js';

const router = express.Router();

router.get('/', async (_req, res, next) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const payload = req.body;

    // const existing = await Item.findOne({ barcode: payload.barcode });
    // if (existing) {
    //   return res.status(409).json({ message: 'Item with this barcode already exists' });
    // }

    const item = await Item.create({
      barcode: payload.barcode,
      name: payload.name,
      weight: payload.weight,
      brand: payload.brand,
      quantity: payload.quantity,
      location: payload.location,
      expiry: payload.expiry,
    });

    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    const item = await Item.findByIdAndUpdate(
      id,
      {
        name: payload.name,
        weight: payload.weight,
        brand: payload.brand,
        quantity: payload.quantity,
        location: payload.location,
        expiry: payload.expiry,
      },
      { new: true, runValidators: true }
    );

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json(item);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await Item.findByIdAndDelete(id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;
