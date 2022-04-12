import { Injectable } from '@nestjs/common';
import { AttachmentElementResponse } from './dto/attachment-element.response';
import { format } from 'date-fns';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import { MFile } from './mfile.class';
import sharp from 'sharp';

@Injectable()
export class FileService {
	async saveFiles(files: MFile[]): Promise<AttachmentElementResponse[]> {
		const dateFolder = format(new Date(), 'yyy-MM-dd');
		const uploadFolder = `${path}/storage/${dateFolder}`;
		await ensureDir(uploadFolder);
		const res: AttachmentElementResponse[] = [];
		for (const file of files) {
			writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);
			res.push({ url: `${dateFolder}/${file.originalname}`, name: file.originalname })
		}
		return res;
	}

	convertToWebp(file: Buffer): Promise<Buffer> {
		return sharp(file).webp().toBuffer();
	}
} ``
