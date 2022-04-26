import { Body, Controller, Get, Param, Patch, Post, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Source } from './source.entity';
import { SourceService } from './source.service';


@ApiTags('Источник из которого пользователь узнал о проекте')
@Controller('api/source')
export class SourceController {
	constructor(private readonly sourceService: SourceService) { }

	@Post('/create')
	create(@Body() dto: Source) {
		return this.sourceService.create(dto);
	}
	@Delete('/delete')
	delete(@Body() { id }) {
		return this.sourceService.delete(id);
	}

	@Patch('/update')
	update(@Body() dto: Source) {
		return this.sourceService.update(dto);
	}

	@Get('/getAll')
	getAll() {
		return this.sourceService.findAll();
	}

	@Get('/getById/:id')
	getById(@Param('id') id: number) {
		return this.sourceService.findById(id);
	}
}
