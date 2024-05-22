export class RegisterDto {
  password!: string;
  username!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  role!: string;
}

export class RegisterResponseDto {
  uid!: string;
  username!: string;
  role!: string;
}
