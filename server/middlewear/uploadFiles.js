//========== Работа с файлами ==========// 
import multer from "multer";
import path from "path"

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, "uploadFiles");
    },
    filename(req, file, cb){
        const uniqueName = Date.now() + "-" +
            Math.round(Math.random() * 1000000) +
            path.extname(file.originalname);
        cb(null, uniqueName);            
    }
})
const upload = multer({
    storage
})

export default upload;