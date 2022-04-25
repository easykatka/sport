import { Controller, Get, Render, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { RoleGuard } from './guards/role.guard';

@UseGuards(RoleGuard('admin'))
@Controller()
export class RenderSiteController {
    constructor(private readonly appService: AppService) {}

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
