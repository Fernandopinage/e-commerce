export class CreateUserRequest {
  id?: number;
  fullName: string;
  password: string;
  email: string;
  cpf: string;
  isActive: boolean;
}
