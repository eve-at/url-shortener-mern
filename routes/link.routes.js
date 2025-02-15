const {Router} = require('express')
const shortid = require('shortid')
const Link = require('../models/Link')
const auth = require('../middlewares/auth.middleware')
const router = Router()
const config = require('config')

function isValidHttpUrl(link) {
    if (typeof link !== "string") {
        return false;
    }

    const regex = /^(http|https):\/\//;
    return regex.test(link);
}

router.post('/generate', auth, async (req, res) => {
    try {
        const {from} = req.body

        if (! isValidHttpUrl(from)) {
            return res.status(400).json({message: 'Invalid link'})
        }

        const baseUrl = config.get('baseUrl')
        const code = shortid.generate()

        const existing = await Link.findOne({from})

        if (existing) {
            return res.json({link: existing})
        }

        const to = baseUrl + '/t/' + code
        const link = new Link({
            code,
            to,
            from,
            owner: req.user.userId
        })

        await link.save()
        res.status(201).json({link})
    } catch (e) {
        res.status(500).json({message: 'Something went wrong, please try later'})
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const links = await Link.find({owner: req.user.userId})
        res.json(links)
    } catch (e) {
        res.status(500).json({message: 'Something went wrong, please try later'})
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const link = await Link.findById(req.params.id)
        res.json(link)
    } catch (e) {
        res.status(500).json({message: 'Something went wrong, please try later'})
    }
})

module.exports = router
