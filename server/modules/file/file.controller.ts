import { Controller, HttpCode, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AttachmentElementResponse } from './dto/attachment-element.response';
import { FileService } from './file.service';
import { MFile } from './mfile.class';

@Controller('api/file')
export class FileController {
    constructor(private readonly AttachmentService: FileService) {}

    @Post('upload')
    @HttpCode(200)
    @UseInterceptors(FileInterceptor('files'))
    async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<AttachmentElementResponse[]> {
        console.log('heeere')
        const saveArray: MFile[] = [new MFile(file)];
        if (file.mimetype.includes('image')) {
            const buffer = await this.AttachmentService.convertToWebp(file.buffer);
            saveArray.push(new MFile({ originalname: `${file.originalname.split('.')[0]}.webp`, buffer }));
        }
        return this.AttachmentService.saveFiles(saveArray);
    }
}
