import { Router } from "express"
import passport from "passport"
import { authorization } from "../middlewares/authorization.js"

const router = Router()



router.post('/register',passport.authenticate('register',{session:false,failureRedirect:'/api/users/failRegister'}),async (req,res)=>{
 
    try {
        if(!req.user)return res.status(400).send('Registration failed')
            const token = generateToken(req.user)
        res.cookie('cookieMM7',token,{httpOnly:true}).send ('user registed')
    }
    catch(error){
        res.status(400).send(error)

    }

})

router.post('/login',passport.authenticate('login',{session:false,failureRedirect:'/api/users/failLogin'}),async (req,res)=>{
 
    try {
        if(!req.user)return res.status(400).send('Login failed')
            const token = generateToken(req.user)
        res.cookie('cookieMM7',token,{httpOnly:true}).send ('user Loged')
    }
    catch(error){
        res.status(400).send(error)

    }

})

router.get('/logout',(req,res)=>{
    res.clearCookie('cookieMM7').json ({message:'Logout succes'})
})

router.get('/profile',passport.authenticate('jwt',{session:false}),authorization('user'),(req,res)=>{
    const payload={
        first_name: req.user.first_name,
        last_name: req.user.last_name,
    }
    res.status(200).send(payload)
})

router.get('/github',passport.authenticate('github',{session:false}))

router.get('/Githubcallback',passport.authenticate('github',{failureRedirect:'/api/user/faillogin',session:false}),(req,res)=>{
    try{
        if(!req.user)return res.status(400).send('Login failed')
        const token = generateToken(req.user)   
        res.cookie('cookieMM7',token,{httpOnly:true}).send ('user Loged')
    }catch(error){
        res.status(400).send(error)
    }
})


export default router