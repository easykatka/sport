import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import { WRITE_FILE_ERROR } from 'server/constants';


@Injectable()
export class FileService {
	async createFile(file, modelName, id, property): Promise<string> {
		try {
			const fileName = `${id}-${property}`;
			const uploadFolder = `${path}/storage/${modelName}`;
			await ensureDir(uploadFolder);
			writeFile(`${uploadFolder}/${fileName}`, file.buffer);
			return file.originalname;
		} catch (e) {
			throw new InternalServerErrorException(WRITE_FILE_ERROR);
		}
	}
} 
