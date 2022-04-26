import { Controller, Get, Param, Render, UseGuards, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { RoleGuard } from './guards/role.guard';
import { ParamsInterceptor } from './interceptors/params.interceptor';





// @UseGuards(RoleGuard('admin'))
@UseInterceptors(ParamsInterceptor)
@Controller()
export class RenderAdminController {
	constructor(private readonly appService: AppService) { }
	@Get('/admin')
	@Render('admin')
	admin() {
		return {};
	}

	@Get('/admin/user')
	@Render('admin/user')
	users() {
		return {};
	}

	@Get('/admin/user/:id')
	@Render('admin/user/[id]')
	user() {
		return {};
	}

	@Get('/admin/role')
	@Render('admin/role')
	roles() {
		return {};
	}

	@Get('/admin/role/:id')
	@Render('admin/role/[id]')
	role() {
		return {};
	}

	@Get('/admin/rolemapping')
	@Render('admin/rolemapping')
	rolemappings() {
		return {};
	}

	@Get('/admin/rolemapping/:id')
	@Render('admin/rolemapping/[id]')
	rolemapping() {
		return {};
	}

	@Get('/admin/source')
	@Render('admin/source')
	usersources() {
		return {};
	}
	@Get('/admin/source/:id')
	@Render('admin/source/[id]')
	usersource(@Param(':id') id) {
		console.log(id,'123')
		return {};
	}

}
