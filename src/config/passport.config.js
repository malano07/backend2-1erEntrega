import passport from "passport";
import local from 'passport-local'
import userModel from "../models/user.model.js"
import { createHash, isValidPassword } from "../utils/hashing.js"
import jwt, { ExtractJwt } from 'passport-jwt'
import gitHubStrategy from 'passport-github2'



const localStrrategy= local.Strategy
const JWTStrategy = jwt.Strategy

const initializePassport= ()=>{

    passport.use('login',new localStrrategy(
        {usernameField:'email'},
        async(username,password,done)=>{
            try{
                const user=await userModel.findOne({email:username})
                if(!user) return done(null,false)
                if (isValidPassword(user,password)) return done (null,false)
                return done(null,user)
            }catch (error) {
                return done (error)
            }
        }
    ))

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([
            (req) => req && req.cookies ? req.cookies["cookieMM7"] : null
          ]),
          
        
        secretOrKey:process.env.SECRET_JWT 
    },
    async (jwt_payload,done)=>{
        try{
            return done (null,jwt_payload.user)

        } catch (error){
            return done(error)
        }
    }

))


passport.use('register', new localStrrategy(
    {
        passReqToCallback: true, 
        usernameField: 'email',
        passwordField: 'password', 
    },
    async (req, username, password, done) => {
        const { first_name, last_name, age } = req.body; 
        try {
            const user = await userModel.findOne({ email: username });
            if (user) return done(null, false, { message: "User already exists" });

            const newUser = {
                email: username,
                password: createHash(password), 
                first_name,
                last_name,
                age,
            };

            const result = await userModel.create(newUser);
            return done(null, result);
        } catch (error) {
            return done(error);
        }
    }
));

    passport.use('gitHub',new gitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL:'http://localhost:8080/api/users/Githubcallback'
        },
        async (_,__,profile,done)=>{

            try {
                const user = await userModel.findOne({idGithub:profile._json.id})
                if(user) return done(null,user)  
                    const newUser = {
                    idGithub:profile._json.id,
                    first_name:profile._json.first_name,
                    last_name:profile._json.last_name,
                    }
                const result = await userModel.create(newUser)
                return done(null,result)

            }catch(error){
                return done(error)

            }

        }
    ))
}

export default initializePassport