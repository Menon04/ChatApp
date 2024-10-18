import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import { compare } from "bcrypt";


const maxAge = 3 * 24 * 60 * 60 * 1000; //3 dias

const createToken = (email, userId) => {
    return jwt.sign({email, userId}, process.env.JWT_KEY, {expiresIn: maxAge});
}

export const signup = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).send("Email and Password are required");
        }

        const user = await User.create({email, password});
        res.cookie("jwt", createToken(email, user.id),{
            maxAge,
            secure:true,
            sameSite: "none",
        });
        return res.status(201).json({
            user:{
                id: user.id,
                email: user.email,
                profileSetup: user.profileSetup,
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
}

export const login =  async (req, res, next) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).send("Email e Senha são obrigatórios");
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(404).send("Email não encontrado");
        }
        const auth = await compare(password, user.password);
        if(!auth){
            return res.status(400).send("Senha incorreta");
        }
        res.cookie("jwt", createToken(email, user.id),{
            maxAge,
            secure:true,
            sameSite: "none",
        });
        return res.status(200).json({
            user:{
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                image: user.image,
                profileSetup: user.profileSetup,
                color: user.color,
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
}

export const getUserInfo = async (req, res, next) => {
    try {
        const userData = await User.findById(req.user.id);
        if(!userData){
            return res.status(404).send("Usuário não encontrado");
        }
        return res.status(200).json({
                id: req.userData.id,
                email: req.userData.email,
                firstName: req.userData.firstName,
                lastName: req.userData.lastName,
                image: req.userData.image,
                profileSetup: req.userData.profileSetup,
                color: req.userData.color,
        });
    } 
    catch(error){
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
}

