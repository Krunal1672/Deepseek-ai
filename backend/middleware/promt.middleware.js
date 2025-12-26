import jwt from "jsonwebtoken"

const userMiddleware = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({error:"no tokon provided"})
    }
    const token = authHeader.split(" ")[1]
    try {
        const decoded = jwt.verify(token,process.env.JWT_PASSWORD)
        console.log(decoded);
        req.userId=decoded.id
        
        next()
    } catch (error) {
        console.log("error in verify",error);
        return res.status(500).json({error:"invalid token or expires"}) 
    }
}

export default userMiddleware