import { Controller, Get, Param, ParseIntPipe, Render, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { ParamsInterceptor } from './interceptors/params.interceptor';
import { ConfigInterceptor } from './interceptors/config.interceptor';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}
	
	@Get('/user/:id')
    @Render('user/[id]')
    @UseInterceptors(ParamsInterceptor, ConfigInterceptor)
	user() {
        return {};
    }

    @Get('/')
    @Render('games')
    @UseInterceptors(ParamsInterceptor, ConfigInterceptor)
    home() {
        return {};
    }

    @Get('/rules/')
    @Render('rules')
    @UseInterceptors(ParamsInterceptor, ConfigInterceptor)
    rules() {
        return {};
    }

    @Get('/rating/')
    @Render('rating')
    @UseInterceptors(ParamsInterceptor, ConfigInterceptor)
    rating() {
        return {};
    }

    @Get('/games/')
    @Render('games')
    @UseInterceptors(ParamsInterceptor, ConfigInterceptor)
    games() {
        return {};
    }


}
