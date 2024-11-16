import { useMemo } from 'react';
import { FieldErrors } from 'react-hook-form';

import FormFiled from '../components/FormField';
import PasswordLevel from '../components/PasswordLevel';
import OtpInput from '../components/OtpInput';

import { isDisabled } from '../utils';

interface ILocalSignUpFormProps {
  errors: FieldErrors<SignupFieldValuesType>;
  values: Partial<SignupFieldValuesType>;
  isSubmitting: boolean;
  onSetFieldValue: (name: string, value: string) => void;
}

const LocalSignUpForm: React.FC<ILocalSignUpFormProps> = ({ onSetFieldValue, errors, values, isSubmitting }) => {
  // flags
  const isOtpDisabled = useMemo(() => {
    return isDisabled(['email', 'password', 'username'], errors, values);
  }, [values, errors]);

  return (
    <>
      <div>
        <FormFiled
          label="Tên của bạn"
          placeholder="Họ và tên"
          errorText={errors?.username?.message}
          name="username"
          onSetFieldValue={onSetFieldValue}
          isInitialFocus
          isDisabled={isSubmitting}
        />

        <FormFiled
          label="Email của bạn"
          rightHeaderButton={{ title: 'Đăng nhập với số điện thoại' }}
          placeholder="Địa chỉ email"
          errorText={errors?.email?.message}
          name="email"
          onSetFieldValue={onSetFieldValue}
          isDisabled={isSubmitting}
        />

        <div>
          <FormFiled
            placeholder="Mật khẩu"
            type="password"
            errorText={errors?.password?.message}
            name="password"
            onSetFieldValue={onSetFieldValue}
            isDisabled={isSubmitting}
          />
          <PasswordLevel password={values?.password ?? ''} />
        </div>
        <OtpInput
          name="otp"
          onSetFieldValue={onSetFieldValue}
          errorText={errors?.otp?.message}
          isInputDisabled={isSubmitting}
          isActDisabled={isOtpDisabled || isSubmitting}
        />
      </div>
    </>
  );
};

export default LocalSignUpForm;
