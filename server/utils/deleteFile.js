import fs from "fs/promises";
import path from "path"

export async function deleteFiles(files){
    for (const image of files) {
        try {
            await fs.unlink(
                path.join("uploadFiles", image.img)
            );
        } catch (err) {
            console.log("Файл уже удален:", image.img);
        }
    }
}