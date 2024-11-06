interface SignInByEmailRequest {
  email: string;
  password: string;
}
interface SignInByEmailResponse extends ApiResponse {}

type AuthModeType = 'SI' | 'SU' | 'FP' | 'RP';

type AuthTextType = {
  title: string;
  mode: string;
  submitTitle: string;
  warning?: string;
  desc?: string;
  hint?: string;
  linkTitle?: string;
};

type CharType = 'lowercase' | 'uppercase' | 'number' | 'symbol';
type PasswordLevelType = {
  characterTypes: Array<CharType>;
  regex: RegExp;
  minLength: number;
  label: { [key: number]: string };
  maxLevel: number;
};

type SigninFieldValuesType = {
  email: string;
  password: string;
};

type SignupFieldValuesType = {
  username: string;
  email: string;
  password: string;
  otp: string;
};

type FortgotPasswordFieldValuesType = {
  email: string;
  otp: string;
  password: string;
  password_confirmation: string;
};
