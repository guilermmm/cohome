import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInDto {
  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;
  @IsNotEmpty({ message: 'Senha obrigatória' })
  password: string;
}
