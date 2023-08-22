import { IsEmail, IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty({ message: 'Nome obrigatório' })
  name: string;
  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;
  @IsNotEmpty({ message: 'Senha obrigatória' })
  password: string;
}
