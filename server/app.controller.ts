import { Controller, Get, Param, ParseIntPipe, Render, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { ParamsInterceptor } from './interceptors/params.interceptor';
import { ConfigInterceptor } from './interceptors/config.interceptor';

@UseInterceptors(ParamsInterceptor, ConfigInterceptor)
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('/user/:id')
    @Render('user/[id]')
    user() {
        return {};
    }

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
