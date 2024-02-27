const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: [
        {
          model: Product,
        },
      ],
    });
    res.json(tags);
  } catch (error) {
    console.error(error);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try { 
    const tagId = req.params.id;
    const tag = await Tag.findByPk(tagId, {
      include: [
        {
          model: Product,
        },
      ],
    });
    
    if (!tag) {
      return res.status(404).json({ error: 'tag not found' });
    }
    res.json(tag);
  } catch (error) {
    console.error(error);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const { tag_name } = req.body;
    const newTag = await Tag.create({
      tag_name,
    });
    res.json(newTag);
  } catch (error) {
    console.error(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const { tag_name } = req.body;

    const tagId = req.params.id;
    const tag = await Tag.findByPk(tagId);

    if (!tag) {
      console.log('No tag found');
      return;
    }
    await tag.update({
      tag_name,
    });

    res.json(tag);
  } catch (error) {
    console.error(error)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagId = req.params.id;
    const tag = await Tag.findByPk(tagId);

    if (!tag) {
      console.log('No tag found');
      return;
    }
    await tag.destroy();
    res.json({message: 'tag has been deleted'})
  }catch (error) {
    console.error(error)
  }
});

module.exports = router;
