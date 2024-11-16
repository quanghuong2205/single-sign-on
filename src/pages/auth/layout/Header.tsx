import classNames from 'classnames';
import authStyles from '../scss/auth.module.scss';
import { IMAGE_ASSETS } from '@/assets/images';

interface IHeaderProps {
  title: string;
  warning?: string;
  desc?: string;
}
export const Header: React.FC<IHeaderProps> = ({ title, warning, desc }) => {
  return (
    <header className={authStyles.header}>
      <a href="http://localhost:5173" target="_top" className={authStyles.logo}>
        <img alt="logo" src={IMAGE_ASSETS.logo} className={authStyles['logo-img']} />
      </a>

      <h1 className={authStyles.heading}>{title}</h1>
      <p className={classNames(desc && authStyles.guide, warning && authStyles.warning)}>
        {warning ?? warning}
        {desc ?? desc}
      </p>
    </header>
  );
};
