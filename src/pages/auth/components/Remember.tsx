import { useEffect, useState } from 'react';
import classNames from 'classnames';

import formStyles from '../scss/form.module.scss';

import { CheckIcon } from '@/components';

const Remember = () => {
  // states
  const [isChecked, setIsChecked] = useState(true);

  // handlers
  const handleToggleCheckMode = () => setIsChecked((prev) => !prev);

  // effects
  useEffect(() => {
    if (isChecked) {
      // handle remember the credentials
    }
  }, [isChecked]);

  return (
    <div className={formStyles.remember}>
      <input className={formStyles['remember-input']} type="checkbox" id="remember" name="remember" />
      <button className={formStyles['remember-label']} onClick={handleToggleCheckMode}>
        <div className={classNames(formStyles['remember-icon'], isChecked && formStyles['remember-icon--checked'])}>
          <CheckIcon />
        </div>
        <span>Ghi nhớ đăng nhập</span>
      </button>
    </div>
  );
};

export default Remember;
