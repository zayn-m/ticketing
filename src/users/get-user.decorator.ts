import { createParamDecorator } from '@nestjs/common';
import { User } from './types/user.type';

export const GetUser = createParamDecorator((data, req): User => {
  console.log(data, req);
  return req.user;
});
