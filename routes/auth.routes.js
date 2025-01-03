const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const config = require('config')
const router = Router()

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Email is not valid').normalizeEmail().isEmail(),
        check('password', 'Minimal password length is 6 characters').isLength({min: 6})
    ],
    async (req, res) => {
    try {
        console.log('Body', req.body);

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                erros: errors.array(),
                message: 'Credentials are incorrect'
            })
        }

        const {email, password} = req.body

        const candidate = await User.findOne({ email })
        if (candidate) {
            res.status(400).json({message: 'This email is already registered'})
            return
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({ email, password: hashedPassword })

        await user.save()

        res.status(201).json({message: 'The user was created'})

    } catch (e) {
        res.status(500).json({message: 'Something went wrong, please try later'})
    }
})

// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Email is not valid').normalizeEmail().isEmail(),
        check('password', 'Enter the password').exists()
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                erros: errors.array(),
                message: 'Credentials are incorrect'
            })
        }

        const {email, password} = req.body

        const user = await User.findOne({ email })
        if (!user) {
            res.status(400).json({message: 'Email or password are incorrect'})
            return
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            res.status(400).json({ message: 'Email or password are incorrect' })
            return
        }

        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            { expiresIn: '1h'}
        )

        res.json({ token, userId: user.id })

    } catch (e) {
        res.status(500).json({message: 'Something went wrong, please try later. ' + e.message})
    }
})


module.exports = router
