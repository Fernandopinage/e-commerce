export class AuthenticationRequest {
  email: string;
  password: string;
}

export class AuthenticationResponse {
  token: string;
}

export class AuthenticationPayload {
  id: string;
  fullName: string;
  email: string;
}
