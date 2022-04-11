import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserSourceDto } from './dto/user-source.dto';
import { UserSourceService } from './user-source.service';


@ApiTags('Источник из которого пользователь узнал о проекте')
@Controller('api/usersource')
export class UserSourceController {
	constructor(private readonly userSourceService: UserSourceService) { }

	@Post('/create')
	create(@Body() dto: UserSourceDto) {
		return this.userSourceService.create(dto);
	}
	@Post('/delete')
	delete(@Body() { id }) {
		return this.userSourceService.delete(id);
	}

	@Patch('/update')
	update(@Body() dto: UserSourceDto) {
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
