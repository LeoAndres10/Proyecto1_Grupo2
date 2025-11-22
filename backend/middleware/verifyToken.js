
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
// Middleware para verificar token JWT
function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(403).json({ message: 'Token requerido' });
    console.log('error: ' + authHeader)
        const token = authHeader.split(' ')[1];
    jwt.verify(token,process.env.SECRET_KEY, (err, decoded) => {
       console.log('🔹 Token recibido en verifyToken:', token);
console.log('🔹 Error JWT:', err?.message);
        console.log('Clave usada para firmar/verificar:', process.env.SECRET_KEY);
        if (err) return res.status(401).json({ message: 'Token inválido' });
        req.userId = decoded.id;
        next();
    });
}

export {verifyToken};