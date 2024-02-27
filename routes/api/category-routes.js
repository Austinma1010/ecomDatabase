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

router.post('/', async (req, res) => {
  console.log(req.body);
  // create a new category
  try {
    const { category_name } = req.body;
    const newCategory = await Category.create({
      category_name,
    });
    res.json(newCategory);
  } catch (error) {
    console.error(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  console.log(req.body);
  try {
    console.log(req.body);
    const { category_name } = req.body;

    const categoryId = req.params.id;
    const category = await Category.findByPk(categoryId);

    if (!category) {
      console.log('No category found');
      return;
    }
    await category.update({
      category_name,
    });

    res.json(category);
  } catch (error) {
    console.error(error)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    

    const categoryId = req.params.id;
    const category = await Category.findByPk(categoryId);

    if (!category) {
      console.log('No category found');
      return;
    }
    await category.destroy();
    res.json({message: 'Category has been deleted'})
  }catch (error) {
    console.error(error)
  }
});

module.exports = router;
