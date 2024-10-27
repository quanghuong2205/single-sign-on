import classNames from 'classnames';
import formStyles from '../scss/form.module.scss';
import { useState } from 'react';
import { CheckIcon } from '@/components';

const Remember = () => {
  // states
  const [isChecked, setIsChecked] = useState(false);

  // handlers
  const handleCheckMode = () => setIsChecked((prev) => !prev);

  return (
    <div className={formStyles.remember}>
      <input className={formStyles['remember-input']} type="checkbox" id="remember" name="remember" />
      <button className={formStyles['remember-label']} onClick={handleCheckMode}>
        <div className={classNames(formStyles['remember-icon'], isChecked && formStyles['remember-icon--checked'])}>
          <CheckIcon />
        </div>
        <span>Ghi nhớ đăng nhập</span>
      </button>
    </div>
  );
};

export default Remember;
