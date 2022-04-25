import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class UserPagesController {
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
