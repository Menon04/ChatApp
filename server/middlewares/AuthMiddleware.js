import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).send("Usuário não autenticado");
    jwt.verify(token, process.env.JWT_KEY,(err, decoded) => {
        if(err) return res.status(401).send("Token inválido");
        req.userId = decoded.userId;
        next();
    });
};