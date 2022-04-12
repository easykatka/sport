import { Controller, HttpCode, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AttachmentElementResponse } from './dto/attachment-element.response';
import { AttachmentService } from './attachment.service';

@Controller('attachment')
export class AttachmentController {
	constructor(private readonly AttachmentService: AttachmentService) { }

	@Post()
	@HttpCode(200)
	@UseInterceptors(FileInterceptor('files'))
	async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<AttachmentElementResponse[]> {
		return this.AttachmentService.saveFiles([file])
	}
}
