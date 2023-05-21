import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('GET: /posts');
});

router.post('/', (req, res) => {
  res.status(201).send('POST: /posts');
});

router.put('/:id', (req, res) => {
  res.status(203).send('PUT: /posts/:id');
});

router.delete('/:id', (req, res) => {
  res.status(204).send('DELETE: /posts/:id');
});

export default router;
