const router = require('express').Router();
let Celebrity = require('../models/celebrities.model');

router.route('/').get((req,res) => {
    Celebrity.find()
        .then(celebrity => res.json(celebrity))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/add').post((req,res) => {
    const celebrity = req.body.celebrity;
    const expertise = req.body.expertise; 
    const era = req.body.era;
    const bio = req.body.bio;

    const newCelebrity = Celebrity({
        celebrity,
        expertise,
        era,
        bio,
    });

    newCelebrity.save()
        .then(() => res.json('Celebrity added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req,res) => {
    Celebrity.findById(req.params.id)
        .then(celebrity => res.json(celebrity))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:id').delete((req,res) => {
    Celebrity.findByIdAndDelete(req.params.id)
        .then(() => res.json('Celebrity deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req,res) => {
    Celebrity.findById(req.params.id)
        .then(celebrity => {
            celebrity.celebrity = req.body.celebrity;
            celebrity.expertise = req.body.expertise;
            celebrity.era = req.body.era;
            celebrity.bio = req.body.bio;

            celebrity.save()
                .then(() => res.json('Celebrity updated'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;