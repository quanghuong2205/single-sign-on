import { FacebookIcon, GithubIcon, GoogleIcon } from '@/components';
import authStyles from '../scss/auth.module.scss';

interface IAuthStrategiesProps {
  authMode: string;
}

const AuthStrategies: React.FC<IAuthStrategiesProps> = ({ authMode }) => {
  return (
    <>
      <button className={authStyles.strategy}>
        <div className={authStyles['strategy-icon']}>
          <GoogleIcon />
        </div>
        <span className={authStyles['strategy-title']}>{authMode} với Google</span>
      </button>

      <button className={authStyles.strategy}>
        <div className={authStyles['strategy-icon']}>
          <FacebookIcon />
        </div>
        <span className={authStyles['strategy-title']}>{authMode} với Facebook</span>
      </button>

      <button className={authStyles.strategy}>
        <div className={authStyles['strategy-icon']}>
          <GithubIcon />
        </div>
        <span className={authStyles['strategy-title']}>{authMode} với Github</span>
      </button>
    </>
  );
};

export default AuthStrategies;
