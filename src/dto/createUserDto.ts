export class UserCreateDto {
  name: string;
  id?: number;
  email: string;
  role: string;
}

export class userLoginDto {
  email: string;

  password: string;
}
