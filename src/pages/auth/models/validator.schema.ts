import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { PASSWORD_LEVEL, REGEX_EMAIL, REGEX_OTP, REGEX_PASSWORD } from '../enum';
import { Resolver } from 'react-hook-form';

const validateEmail = (email: string) => REGEX_EMAIL.test(email);
const validatePassword = (pwd: string) => REGEX_PASSWORD.test(pwd);
const validateOtp = (pwd: string) => REGEX_OTP.test(pwd);

const signinValiatorSchema = yup
  .object()
  .shape({
    email: yup
      .string()
      .required('Vui lòng nhập địa chỉ email của bạn')
      .test('', 'Địa chỉ email không hợp lệ', validateEmail),
    password: yup.string().required('Vui lòng nhập mật khẩu'),
  })
  .required();

const signupValiatorSchema = yup
  .object()
  .shape({
    username: yup.string().required('Vui lòng nhập tên của bạn'),
    email: yup
      .string()
      .required('Vui lòng nhập địa chỉ email của bạn')
      .test('', 'Địa chỉ email không hợp lệ', validateEmail),
    password: yup
      .string()
      .required('Vui lòng nhập mật khẩu')
      .min(PASSWORD_LEVEL.minLength, `Mật khẩu ít nhất ${PASSWORD_LEVEL.minLength} kí tự`)
      .test('', 'Độ khó mật khẩu chưa đạt yêu cầu', validatePassword),
    otp: yup.string().required('Vui lòng nhập mã xác thực').test('', 'Mã xác thực không hợp lệ', validateOtp),
  })
  .required();

const fortgotPasswordValiatorSchema = yup
  .object()
  .shape({
    email: yup
      .string()
      .required('Vui lòng nhập địa chỉ email của bạn')
      .test('', 'Địa chỉ email không hợp lệ', validateEmail),
    otp: yup.string().required('Vui lòng nhập mã xác thực').test('', 'Mã xác thực không hợp lệ', validateOtp),
    password: yup
      .string()
      .required('Vui lòng nhập mật khẩu')
      .min(PASSWORD_LEVEL.minLength, `Mật khẩu ít nhất ${PASSWORD_LEVEL.minLength} kí tự`)
      .test('', 'Độ khó mật khẩu chưa đạt yêu cầu', (value) => PASSWORD_LEVEL.regex.test(value)),

    password_confirmation: yup
      .string()
      .oneOf([yup.ref('password'), undefined], 'Mật khẩu không khớp')
      .required('Vui lòng nhập mật khẩu xác thực'),
  })
  .required();

export const signInResolver = yupResolver(signinValiatorSchema);
export const signUpResolver = yupResolver(signupValiatorSchema);
export const fortgotPasswordResolver = yupResolver(fortgotPasswordValiatorSchema);
export const AUTH_RESOLVERS: Partial<{ [key in AuthModeType]: Resolver<any> }> = {
  SI: signInResolver,
  SU: signUpResolver,
  FP: fortgotPasswordResolver,
};
