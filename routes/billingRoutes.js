const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const loginRequired = require('../middlewares/loginRequired');

module.exports = app => {

    app.post('/api/stripe', loginRequired, async (req, res) => {
        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'inr',
            description: '5Rs. for 5 credits',
            source: req.body.id
        });
        req.user.credits += 5;
        const user = await req.user.save();
        res.send(user);
    });

}