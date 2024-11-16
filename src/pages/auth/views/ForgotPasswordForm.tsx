import { useMemo } from 'react';
import classNames from 'classnames';
import { FieldErrors } from 'react-hook-form';

import FormFiled from '../components/FormField';
import OtpInput from '../components/OtpInput';
import PasswordLevel from '../components/PasswordLevel';
import { LoadingIcon } from '@/components';

import formStyles from '../scss/form.module.scss';

import { AUTH_TEXT } from '../enum';
import { isEmpty } from '@/utils';
import { isDisabled } from '../utils';

interface IForgotPasswordFormProps {
  errors: FieldErrors<FortgotPasswordFieldValuesType>;
  values: Partial<FortgotPasswordFieldValuesType>;
  isSubmitting: boolean;
  authMode: AuthModeType;
  isValidForm: boolean;
  onSetFieldValue: (name: string, value: string) => void;
  onSubmit: () => void;
  onSetAuthMode: (mode: AuthModeType) => void;
}

const ForgotPasswordForm: React.FC<IForgotPasswordFormProps> = ({
  errors,
  values,
  authMode,
  isSubmitting,
  isValidForm,
  onSubmit,
  onSetAuthMode,
  onSetFieldValue,
}) => {
  // flags
  const isResetPasswordDisabled = useMemo(() => {
    return isDisabled(['email', 'otp'], errors, values);
  }, [errors, values]);

  const isSubmitDisabled = useMemo(() => {
    return authMode === 'FP' ? isResetPasswordDisabled : !isValidForm;
  }, [isValidForm, isResetPasswordDisabled, authMode]);

  const isOtpDisabled = useMemo(() => {
    if (errors?.email) return true;
    return isEmpty(values?.email);
  }, [errors, values]);

  // handlers
  const handleSubmit = () => {
    if (isResetPasswordDisabled) return;
    return authMode === 'FP' ? onSetAuthMode('RP') : onSubmit();
  };

  return (
    <div>
      {authMode === 'FP' ? (
        <>
          <FormFiled
            label="Tên đăng nhập"
            placeholder="Email hoặc username"
            errorText={errors?.email?.message}
            isInitialFocus
            name="email"
            onSetFieldValue={onSetFieldValue}
            isDisabled={isSubmitting}
          />
          <OtpInput
            name="otp"
            onSetFieldValue={onSetFieldValue}
            errorText={errors?.otp?.message}
            isInputDisabled={isSubmitting}
            isActDisabled={isOtpDisabled || isSubmitting}
          />
        </>
      ) : (
        <div>
          <div>
            <FormFiled
              placeholder="Mật khẩu mới"
              type="password"
              errorText={errors?.password?.message}
              name="password"
              onSetFieldValue={onSetFieldValue}
              isDisabled={isSubmitting}
            />
            <PasswordLevel password={values?.password ?? ''} />
          </div>

          <FormFiled
            placeholder="Mật khẩu mới"
            type="password"
            errorText={errors?.password_confirmation?.message}
            name="password_confirmation"
            onSetFieldValue={onSetFieldValue}
            isDisabled={isSubmitting}
          />
        </div>
      )}

      <button
        disabled={isSubmitDisabled || isSubmitting}
        onClick={handleSubmit}
        className={classNames(formStyles.submit, 'primary-gradient-button', {
          disabled: isSubmitDisabled || isSubmitting,
        })}
      >
        {!isSubmitting ? AUTH_TEXT[authMode].submitTitle : <LoadingIcon cls="spinner" />}
      </button>
    </div>
  );
};

export default ForgotPasswordForm;
