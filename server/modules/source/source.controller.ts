import { Body, Controller, Get, Param, Patch, Post, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Source } from './source.entity';
import { SourceService } from './source.service';


@ApiTags('Источник из которого пользователь узнал о проекте')
@Controller('api/source')
export class UserSourceController {
	constructor(private readonly userSourceService: SourceService) { }

	@Post('/create')
	create(@Body() dto: Source) {
		return this.userSourceService.create(dto);
	}
	@Delete('/delete')
	delete(@Body() { id }) {
		return this.userSourceService.delete(id);
	}

	@Patch('/update')
	update(@Body() dto: Source) {
		return this.userSourceService.update(dto);
	}

	@Get('/getAll')
	getAll() {
		return this.userSourceService.findAll();
	}

	@Get('/getById/:id')
	getById(@Param('id') id: number) {
		return this.userSourceService.findById(id);
	}
}
