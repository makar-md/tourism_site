import fs from "fs/promises";
import path from "path"

export async function deleteFiles(files){
    for (const file of files) {
        try {
            await fs.unlink(
                path.join("uploadFiles", file.filename)
            );
        } catch (err) {
            console.log("Файл уже удален:", file.filename);
        }
    }
}

export async function deleteFile(filename) {
    const filePath = path.join(process.cwd(), "uploadFiles", filename);
    try {
        await fs.unlink(filePath);
        console.log("Файл удален:", filePath);
    } catch (err) {
        if (err.code === "ENOENT") {
            console.log("Файл уже отсутствует:", filePath);
            return;
        }
        throw err;
    }
}