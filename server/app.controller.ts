import { Controller, Get, Render, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { ParamsInterceptor } from './interceptors/params.interceptor';
import { ConfigInterceptor } from './interceptors/config.interceptor';

@UseInterceptors(ParamsInterceptor, ConfigInterceptor)
@Controller()
export class AppController {
	constructor(private readonly appService: AppService) { }

	@Get('/')
	@Render('index')
	home() {
		return {};
	}

	@Get('/rules/')
	@Render('rules')
	rules() {
		return {};
	}

	@Get('/rating/')
	@Render('rating')
	rating() {
		return {};
	}

	@Get('/games/')
	@Render('games')
	games() {
		return {};
	}


	//* ADMIN
	@Get('/admin')
	@Render('admin')
	admin() {
		return {};
	}

	@Get('/admin/users')
	@Render('admin/users')
	users() {
		return {};
	}

	@Get('/admin/users/:id')
	@Render('admin/users/[id]')
	user() {
		return {};
	}

	@Get('/admin/roles')
	@Render('admin/roles')
	roles() {
		return {};
	}


	@Get('/admin/roles/:id')
	@Render('admin/roles/[id]')
	role() {
		return {};
	}


	@Get('/admin/rolemappings')
	@Render('admin/rolemappings')
	rolemappings() {
		return {};
	}

	@Get('/admin/rolemappings/:id')
	@Render('admin/rolemappings/[id]')
	rolemapping() {
		return {};
	}
}
