import { useState } from 'react';
import authStyles from '../scss/auth.module.scss';
import AuthStrategies from '../components/AuthStrategies';
import { ChevronLeftIcon, UserIcon } from '@/components';
import LocalSignUpForm from './LocalSignupForm';
import LocalSignInForm from './LocalSigninForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import { Header } from '../layout';
import { AUTH_TEXT } from '../enum';

function Auth() {
  // states
  const [authMode, setAuthMode] = useState<AuthModeType>('SI'); // SI = sign in, SU = sign up, FP = forgot password
  const [isLocalAuth, setIsLocalAuth] = useState(true); // auth with email/phone number

  // constant values
  const authText = AUTH_TEXT[authMode];

  // flags
  const isShownBackBtn = authMode !== 'SI' || isLocalAuth;

  // handlers
  const handleLocalAuthMode = () => setIsLocalAuth(!isLocalAuth);
  const handleSwitchAuthMode = (mode: AuthModeType) => () => {
    setAuthMode(mode);
    handleLocalAuthMode();
  };
  const handleBackMode = () => handleSwitchAuthMode('SI')();

  return (
    <div className={authStyles.wrapper}>
      {isShownBackBtn && (
        <button className={authStyles.back} onClick={handleBackMode}>
          <ChevronLeftIcon />
          <span>Quay lại</span>
        </button>
      )}
      <div className={authStyles.inner}>
        {/* Header */}
        <Header title={authText.title} warning={authText.warning} desc={authText?.desc} />

        {/* Content */}
        <div className={authStyles.content}>
          {!isLocalAuth && authMode !== 'FP' && (
            <>
              <AuthStrategies authMode={authText.mode} />
              <button className={authStyles.strategy} onClick={handleLocalAuthMode}>
                <div className={authStyles['strategy-icon']}>
                  <UserIcon />
                </div>
                <span className={authStyles['strategy-title']}>Sử dụng email / số điện thoại</span>
              </button>
            </>
          )}
          {isLocalAuth && authMode === 'SI' && <LocalSignInForm />}
          {isLocalAuth && authMode === 'SU' && <LocalSignUpForm />}
          {!isLocalAuth && authMode === 'FP' && <ForgotPasswordForm />}
        </div>

        {/* Footer */}
        <footer className={authStyles.footer}>
          {authMode !== 'FP' && (
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
