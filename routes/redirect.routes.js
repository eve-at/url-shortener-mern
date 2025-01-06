const {Router} = require('express')
const Link = require('../models/Link')
const router = Router()

router.get('/:code', async (req, res) => {
    console.log('code', req.params)
    try {
        const link = await Link.findOne({code: req.params.code})
        if (! link) {
            return res.status(404).json('Link not found')
        }

        link.clicks++
        await link.save()
        return res.redirect(link.from)
    } catch (e) {
        res.status(500).json({message: 'Something went wrong, try again'})
    }
})

module.exports = router
