import express from 'express';
import User from '../models/User';

const router = express.Router();

router.post("/", (req, res) => {
    const { credentials } = req.body;
    console.log(credentials);
    User.findOne({ email: credentials.email }).then(user => {
        if (user && user.isValidPassword(credentials.password)) {
            console.log("ok1");
            //res.json({ user: {email: user.email} });
            res.json({ user: user.toAuthJSON() });
            //res.json({ success: true });
        } else {
            console.log("blad2");
            res.status(400).json({ errors: { global: "Invalid credentials2" } });
        }
    });
});


export default router;
