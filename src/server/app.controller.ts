import { Controller, Get, Param, ParseIntPipe, Render, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { ParamsInterceptor } from './interceptors/params.interceptor';
import { ConfigInterceptor } from './interceptors/config.interceptor';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('/')
    @Render('index')
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
}
