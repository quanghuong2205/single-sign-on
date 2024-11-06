import classNames from 'classnames';
import authStyles from '../scss/auth.module.scss';
const logoPath =
  'https://static.vecteezy.com/system/resources/thumbnails/036/496/605/small_2x/ai-generated-a-cat-head-logo-designed-in-the-esports-illustration-style-set-against-a-blank-background-png.png';

interface IHeaderProps {
  title: string;
  warning?: string;
  desc?: string;
}
export const Header: React.FC<IHeaderProps> = ({ title, warning, desc }) => {
  return (
    <header className={authStyles.header}>
      <a href="http://localhost:5173" target="_top" className={authStyles.logo}>
        <img alt="logo" src={logoPath} className={authStyles['logo-img']} />
      </a>

      <h1 className={authStyles.heading}>{title}</h1>
      <p className={classNames(authStyles.sub, warning && authStyles['sub--warning'])}>
        {warning ?? warning}
        {desc ?? desc}
      </p>
    </header>
  );
};
