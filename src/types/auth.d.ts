interface SignInByEmailRequest {
  email: string;
  password: string;
}

interface SignInByEmailResponse extends ApiResponse {}

type AuthModeType = 'SI' | 'SU' | 'FP';

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
  minLength: number;
  label: { [key: number]: string };
};
