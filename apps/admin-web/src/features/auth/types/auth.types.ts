export interface LoginFormData {
  readonly email: string;
  readonly password: string;
}

export interface AnimatedBackgroundProps {
  readonly isVisible: boolean;
}

export interface LoginHeaderProps {
  readonly title: string;
  readonly subtitle: string;
}

// 

export interface AuthUser {
  readonly id: string;
  readonly email: string;
  readonly name: string;
}

export interface LoginResponse {
  readonly success: boolean;
  readonly data: {
    readonly user: AuthUser;
    readonly token: string;
  };
}
