import { useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';

import { ChevronLeftIcon, LoadingIcon, UserIcon } from '@/components';
import AuthStrategies from '../components/AuthStrategies';
import LocalSignUpForm from './LocalSignupForm';
import LocalSignInForm from './LocalSigninForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import { Header } from '../layout';

import authStyles from '../scss/auth.module.scss';
import formStyles from '../scss/form.module.scss';

import { AUTH_MODE_PARAM_KEY, AUTH_TEXT } from '../enum';
import { AUTH_RESOLVERS } from '../models';

const DEFAULT_AUTH_MODE: AuthModeType = 'SI';

function Auth() {
  // router
  const [searchParams, setSearchParams] = useSearchParams({ mode: DEFAULT_AUTH_MODE });

  // refs
  const authModeStack = useRef<AuthModeType[]>([]);

  // states
  const [authMode, setAuthMode] = useState<AuthModeType>(() => {
    const authModeParam = searchParams.get(AUTH_MODE_PARAM_KEY) as AuthModeType;
    const initialMode = authModeParam === 'RP' ? DEFAULT_AUTH_MODE : authModeParam;
    authModeStack.current = [initialMode];
    return initialMode;
  }); // SI = sign in, SU = sign up, FP = forgot password, RP: reset password
  const [isInLocalAuthMode, setIsInLocalAuthMode] = useState(false); // auth with email/phone number

  // flags
  const isShownBackBtn = authMode !== 'SI' || isInLocalAuthMode;
  const isInForgotPasswordMode = authMode === 'RP' || authMode === 'FP';

  // form validators
  const {
    handleSubmit: HandleSubmitHookForm,
    formState: { errors, isValid, isSubmitting },
    getValues,
    reset: resetForm,
    setValue,
  } = useForm({
    resolver: isInForgotPasswordMode ? AUTH_RESOLVERS['FP'] : AUTH_RESOLVERS[authMode],
    mode: 'onChange',
  });

  // constant values
  const authText = AUTH_TEXT[authMode];
  const formValues = getValues();

  // handlers
  const handleToggleLocalAuthMode = () => setIsInLocalAuthMode((prev) => !prev);
  const handleApplyAuthModeToUrl = (mode: AuthModeType) => {
    if (mode !== 'RP') {
      setSearchParams({ mode });
      resetForm({});
    }
  };

  const handleSwitchAuthMode = (mode: AuthModeType) => () => {
    if (mode !== 'RP') {
      authModeStack.current.push(mode);
    }
    setAuthMode(mode);
    isInLocalAuthMode && handleToggleLocalAuthMode();
    handleApplyAuthModeToUrl(mode);
  };

  const handleBackAuthMode = () => {
    authModeStack.current.pop();

    const isEmptyStack = authModeStack.current.length === 0;
    const currentMode = isEmptyStack ? DEFAULT_AUTH_MODE : authModeStack.current[authModeStack.current.length - 1];

    setAuthMode(currentMode);
    handleApplyAuthModeToUrl(currentMode);
  };

  const handleSetFieldValue = (name: string, value: string) => {
    setValue(name, value, { shouldValidate: true });
  };

  const handleSubmit = async (data: any) => {
    await new Promise((resolve) => setTimeout(() => resolve(data), 10000));
    window.parent.postMessage(
      {
        type: 'LOGIN_SUCCESS',
        message: 'HELLO',
      },
      '*',
    );
  };

  return (
    <div className={authStyles.wrapper}>
      {isShownBackBtn && (
        <button className={authStyles.back} onClick={handleBackAuthMode}>
          <ChevronLeftIcon />
          <span>Quay lại</span>
        </button>
      )}
      <div className={authStyles.inner}>
        {/* Header */}
        <Header title={authText.title} warning={authText.warning} desc={authText?.desc} />

        {/* Content */}
        <div className={authStyles.content}>
          {!isInLocalAuthMode && !isInForgotPasswordMode && (
            <>
              <AuthStrategies authMode={authText.mode} />
              <button className={authStyles.strategy} onClick={handleToggleLocalAuthMode}>
                <div className={authStyles['strategy-icon']}>
                  <UserIcon />
                </div>
                <span className={authStyles['strategy-title']}>Sử dụng email / số điện thoại</span>
              </button>
            </>
          )}

          {(isInLocalAuthMode || isInForgotPasswordMode) && (
            <form onSubmit={(e: any) => e.preventDefault()}>
              {isInLocalAuthMode && authMode === 'SI' && (
                <LocalSignInForm onSetFieldValue={handleSetFieldValue} errors={errors} isSubmitting={isSubmitting} />
              )}

              {isInLocalAuthMode && authMode === 'SU' && (
                <LocalSignUpForm
                  onSetFieldValue={handleSetFieldValue}
                  errors={errors}
                  values={formValues}
                  isSubmitting={isSubmitting}
                />
              )}

              {isInForgotPasswordMode && (
                <ForgotPasswordForm
                  errors={errors}
                  values={formValues}
                  authMode={authMode}
                  isSubmitting={isSubmitting}
                  isValidForm={isValid}
                  onSetFieldValue={handleSetFieldValue}
                  onSubmit={HandleSubmitHookForm(handleSubmit)}
                  onSetAuthMode={(mode: AuthModeType) => handleSwitchAuthMode(mode)()}
                />
              )}

              {!isInForgotPasswordMode && (
                <button
                  disabled={!isValid || isSubmitting}
                  onClick={HandleSubmitHookForm(handleSubmit)}
                  className={classNames(formStyles.submit, {
                    [formStyles['submit-disable']]: !isValid || isSubmitting,
                  })}
                >
                  {!isSubmitting ? authText.submitTitle : <LoadingIcon cls="spinner" />}
                </button>
              )}
            </form>
          )}
        </div>

        {/* Footer */}
        <footer className={authStyles.footer}>
          {!isInForgotPasswordMode && (
            <>
              <p className={authStyles.modes}>
                <span>{authText.hint}</span>
                <button onClick={handleSwitchAuthMode(authMode === 'SI' ? 'SU' : 'SI')}>{authText.linkTitle}</button>
              </p>
              <button onClick={handleSwitchAuthMode('FP')} className={authStyles.forgotPassword}>
                Quên mật khẩu?
              </button>
            </>
          )}
          <p className={authStyles.policy}>
            <span>Việc bạn tiếp tục sử dụng trang web này đồng nghĩa bạn đồng ý với </span>
            <a href="terms" target="_blank">
              điều khoản sử dụng
            </a>
            <span> của chúng tôi.</span>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default Auth;
