import { User } from "src/users/types/user.type";

export const userStub = (): User => {
  return {
    name: 'Test',
    email: 'test@test.com',
    password: '12345678'
  }
}