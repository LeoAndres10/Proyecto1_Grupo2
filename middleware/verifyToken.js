
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
// Middleware para verificar token JWT
function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(403).json({ message: 'Token requerido' });
        const token = authHeader.split(' ')[1];
    jwt.verify(token,process.env.SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Token inválido' });
        req.userId = decoded.id;
        next();
    });
}

export {verifyToken};