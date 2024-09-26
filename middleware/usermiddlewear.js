import jwt from "jsonwebtoken";

export const authenticateWithToken=(req,res,next)=>{
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Access Denied, token missing" });
        }
        
        const token = authHeader.split(" ")[1];
        
        jwt.verify(token, process.env.PRIVATE_KEY, (err, user) => {
            if (err && err.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Token has expired, please log in again" });
            }
            if (err) {
                return res.status(403).json({ message: "You are not authorized" });
            }
            req.user = user;
            next();
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        
    }
}


export const authorizeRoles=(roles)=> {
    return (req, res, next) => {
        // const token = req.header('Authorization');

        // console.log(req.headers.authorization);

        // if (!token) {
        //     return res.status(401).json({ message: 'Access denied, token missing' });
        // }

        // jwt.verify(token, 'your-secret-key', (err, user) => {
        //     if (err) {
        //         return res.status(403).json({ message: 'Invalid token' });
        //     }

            if (!roles.includes(req.user.role)) {
                return res.status(403).json({ message: 'Unauthorized access' });
            }

            // req.user = user;
            next();
        };
    };
// }


// practice 



