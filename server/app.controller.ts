import { Controller, Get, Render, UseInterceptors, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ParamsInterceptor } from './interceptors/params.interceptor';
import { ConfigInterceptor } from './interceptors/config.interceptor';
import { RoleGuard } from './guards/role.guard';


@Controller()
export class AppController {
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

    //* ADMIN
    @UseGuards(RoleGuard('admin'))
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

    @Get('/admin/usersource')
    @Render('admin/usersource')
    usersources() {
        return {};
    }
    @Get('/admin/usersource/:id')
    @Render('admin/usersource/[id]')
    usersource() {
        return {};
    }
}
