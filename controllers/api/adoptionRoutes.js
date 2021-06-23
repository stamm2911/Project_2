const router = require('express').Router();
const { Adoption, Users } = require('../../models');

// GET all adoptions
router.get('/', async (req, res) => {
  try {
    const dbAdoptionData = await Adoption.findAll({
      order: [['updatedAt', 'DESC']],
      attributes: {
        exclude: ['id', 'user_id', 'createdAt']
      },  
      include: [
        {
          model: Users,
          attributes: ['name'],
        },
      ],
    });
    res.status(200).json(dbAdoptionData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// POST an adoption
router.post('/', async (req, res) => {
  try {
    const newAdoption = await Adoption.create(req.body);
    res.status(200).json(newAdoption);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;