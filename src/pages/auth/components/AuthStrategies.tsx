import { FacebookIcon, GithubIcon, GoogleIcon } from '@/components';
import authStyles from '../scss/auth.module.scss';
import classNames from 'classnames';

interface IAuthStrategiesProps {
  authMode: string;
}

const AuthStrategies: React.FC<IAuthStrategiesProps> = ({ authMode }) => {
  return (
    <>
      <button className={classNames(authStyles.strategy, 'outline-button')}>
        <div className={authStyles['strategy-icon']}>
          <GoogleIcon />
        </div>
        <span className={authStyles['strategy-title']}>{authMode} với Google</span>
      </button>

      <button className={classNames(authStyles.strategy, 'outline-button')}>
        <div className={authStyles['strategy-icon']}>
          <FacebookIcon />
        </div>
        <span className={authStyles['strategy-title']}>{authMode} với Facebook</span>
      </button>

      <button className={classNames(authStyles.strategy, 'outline-button')}>
        <div className={authStyles['strategy-icon']}>
          <GithubIcon />
        </div>
        <span className={authStyles['strategy-title']}>{authMode} với Github</span>
      </button>
    </>
  );
};

export default AuthStrategies;
