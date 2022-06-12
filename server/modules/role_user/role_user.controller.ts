import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Role_User } from './role_user.entity';
import { Role_UserService } from './role_user.service';

@Controller('api/rolemapping')
export class Role_UserController {
    constructor(private readonly Role_UserService: Role_UserService) {}

    @Post('/create')
    create(@Body() dto: Role_User) {
        return this.Role_UserService.create(dto);
    }
    @Delete('/delete')
    delete(@Body() { id }) {
        return this.Role_UserService.delete(id);
    }

    @Patch('/update')
    update(@Body() dto: Role_User) {
        return this.Role_UserService.update(dto);
    }

    @Get('/getAll')
    getAll() {
        return this.Role_UserService.findAll();
    }

    @Get('/getById/:id')
    getById(@Param('id') id: number) {
        return this.Role_UserService.findById(id);
    }
}
