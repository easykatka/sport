import { Controller, Get, Render, UseGuards, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { RoleGuard } from './guards/role.guard';
import { ParamsInterceptor } from './interceptors/params.interceptor';



@UseGuards() 
@UseInterceptors(ParamsInterceptor)
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
