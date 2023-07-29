import { Controller } from '@nestjs/common';
import { UserService } from '@modules/user/user.service';

@Controller()
export class UserController {

  constructor(private readonly userService: UserService) {}

}
