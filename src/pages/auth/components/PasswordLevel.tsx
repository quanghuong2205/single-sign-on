import passwordStyles from '../scss/password-level.module.scss';

const PasswordLevel = () => {
  const level = 0;
  return (
    <div className={passwordStyles.wrapper}>
      <div className={passwordStyles.levels}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className={passwordStyles.message}>Mật khẩu yếu</div>
    </div>
  );
};

export default PasswordLevel;
