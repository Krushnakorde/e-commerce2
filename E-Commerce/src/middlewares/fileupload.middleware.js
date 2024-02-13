// 1. Import multer.
import multer from "multer";

// 2. Configure storage with filename and location.
const storageConfig = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, "./uploads/")
    },
    filname:(req,file,cb)=>{
        cb(null, new Date().toISOString() + file.originalname)
    }
})
const upload = multer({storage:storageConfig});
export default upload;