import { REGEX_PASSWORD } from './regex';

export const PASSWORD_LEVEL: PasswordLevelType = {
  characterTypes: ['lowercase', 'uppercase', 'number', 'symbol'],
  regex: REGEX_PASSWORD,
  minLength: 8,
  maxLevel: 3,
  label: {
    0: 'Mật khẩu quá yếu',
    1: 'Mật khấu yếu',
    2: 'Mật khẩu trung bình',
    3: 'Mật khẩu mạnh',
  },
};
