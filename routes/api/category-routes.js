const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include: [
        {
          model: Product,
        },
      ],
    });
    res.json(categories);
  } catch (error) {
    console.error(error);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try { 
    const categoryId = req.params.id;
    const category = await Category.findByPk(categoryId, {
      include: [
        {
          model: Product,
        },
      ],
    });
    
    if (!category) {
      return res.status(404).json({ error: 'catergory not found' });
    }
    res.json(category);
  } catch (error) {
    console.error(error);
  }
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
