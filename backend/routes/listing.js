const router = require('express').Router();
const verify = require('../routes/verifyToken');
const Listing = require('../model/Listing');

//Add new listing
router.post('/listing', verify, async (req, res) => {
    const listing = new Listing({
        title: req.body.title,
        price: req.body.price,
        locality: req.body.locality,
        details: req.body.details
    });
    try {
        const savedListing = await listing.save();
        res.send(savedListing);
    } catch (error) {
        res.status(400).send(error);
    }
})

//Get all listing
router.get('/listings', async (req, res) => {
    try {
        const listings = await Listing.find();
        res.json(listings);
    } catch (error) {
        res.json({message: error});
    }
});

//Single listing
router.get('/:listingId',  async (req, res) => {
    try {
        const listings = await Listing.findById(req.params.listingId);
        res.json(listings);
    } catch (error) {
        res.json({message: error});
    }
});

//Update listing
router.put('/:listingId', verify, async (req, res) => {
    try {
        const listing = {
            title: req.body.title,
            price: req.body.price,
            locality: req.body.locality,
            details: req.body.details
        };
        const updatedListing = await Listing.findByIdAndUpdate({_id: req.params.listingId}, listing);
        res.json(updatedListing);
    } catch (error) {
        res.json({message: error});
    }
});

//Delete listing
router.delete('/:listingId', verify, async (req, res) => {
    try {
        const listing = {
            title: req.body.title,
            price: req.body.price,
            locality: req.body.locality,
            details: req.body.details
        };
        const removeListing = await Listing.findByIdAndDelete(req.params.listingId);
        res.json(removeListing);
    } catch (error) {
        res.json({message: error});
    }
});


module.exports = router;