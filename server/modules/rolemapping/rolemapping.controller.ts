import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Rolemapping } from './rolemapping.entity';
import { RolemappingService } from './rolemapping.service';

@Controller('api/rolemapping')
export class RolemappingController {
	constructor(private readonly RolemappingService: RolemappingService) { }

	@Post('/create')
	create(@Body() dto: Rolemapping) {
		return this.RolemappingService.create(dto);
	}
	@Delete('/delete')
	delete(@Body() { id }) {
		return this.RolemappingService.delete(id);
	}

	@Patch('/update')
	update(@Body() dto: Rolemapping) {
		return this.RolemappingService.update(dto);
	}

	@Get('/getAll')
	getAll() {
		return this.RolemappingService.findAll();
	}

	@Get('/getById/:id')
	getById(@Param('id') id: number) {
		return this.RolemappingService.findById(id);
	}
}
