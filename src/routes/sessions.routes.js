import { Router } from "express";
import passport from "passport";

const router = Router();


router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    res.status(200).json({
        message: "User authenticated",
        user: req.user, 
    });
});

export default router;
