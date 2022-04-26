import { Controller, Get, Render, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { RoleGuard } from './guards/role.guard';

@UseGuards(RoleGuard('admin'))
@Controller()
export class RenderSiteController {
    constructor(private readonly appService: AppService) {}
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
    
}
