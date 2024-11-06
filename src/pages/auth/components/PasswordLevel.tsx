import { useMemo } from 'react';
import classNames from 'classnames';
import { passwordStrength } from 'check-password-strength';

import passwordStyles from '../scss/password-level.module.scss';

import { PASSWORD_LEVEL } from '../enum';
import { generateArrayRange, isEmpty } from '@/utils';

interface PasswordLevelProps {
  password: string;
}

const PasswordLevel: React.FC<PasswordLevelProps> = ({ password }) => {
  // flags
  const isNotEmpty = !isEmpty(password);

  // values
  const level = useMemo(() => {
    const strength = passwordStrength(password);

    if (strength.length < PASSWORD_LEVEL.minLength) return 0;

    const charTypes = strength.contains.filter((charType) => PASSWORD_LEVEL.characterTypes.includes(charType));
    const matchedPercent = (charTypes.length * 100) / PASSWORD_LEVEL.characterTypes.length;
    const level = Math.ceil(((PASSWORD_LEVEL.maxLevel + 1) / 100) * matchedPercent);

    return level - 1;
  }, [password]);

  return (
    <div className={passwordStyles.wrapper}>
      <div className={passwordStyles.levels}>
        {generateArrayRange(0, PASSWORD_LEVEL.maxLevel + 1).map((v, i) => (
          <div
            key={`${v}${i}`}
            className={classNames({
              [passwordStyles[`level-${level}`]]: i <= level && isNotEmpty,
            })}
          ></div>
        ))}
      </div>

      {isNotEmpty && (
        <div className={classNames(passwordStyles.message, passwordStyles[`message-level-${level}`])}>
          {PASSWORD_LEVEL.label[level]}
        </div>
      )}
    </div>
  );
};

export default PasswordLevel;
