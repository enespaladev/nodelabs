const express = require('express');
const router = express.Router();
const elasticClient = require('../config/elastic');

/**
 * @swagger
 * /search/messages:
 *   get:
 *     summary: Mesaj içeriğine göre arama yap
 *     tags: [Search]
 *     parameters:
 *       - name: q
 *         in: query
 *         description: Aranacak kelime
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Eşleşen mesajlar
 */
router.get('/messages', async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ message: 'Sorgu boş olamaz' });

  const { hits } = await elasticClient.search({
    index: 'messages',
    query: {
      match: {
        content: q,
      },
    },
  });

  const results = hits.hits.map(hit => hit._source);
  res.json({ results });
});

module.exports = router;
