import { EyeIcon, WarningIcon } from '@/components';
import fieldStyles from '../scss/form-field.module.scss';
import classNames from 'classnames';
import { useId, useState } from 'react';

type IRightButton = {
  title: string;
  onClick?: () => void;
};

interface IFormFieldProps {
  label?: string;
  rightButton?: IRightButton;
  errorText?: string;
  type?: 'text' | 'password';
  isError?: boolean;
  isDisable?: boolean;
  isOtpInput?: boolean;
  placeholder?: string;
}

const FormField: React.FC<IFormFieldProps> = ({
  label,
  rightButton,
  errorText,
  isDisable,
  isError,
  isOtpInput,
  placeholder,
  type = 'text',
}) => {
  // states
  const fieldId = useId();
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);

  // flags
  const isPasswordField = type === 'password';

  // handlers
  const handleTogglePassword = () => setIsVisiblePassword((prev) => !prev);
  const handleBlurInput = () => isPasswordField && isVisiblePassword && handleTogglePassword();

  return (
    <div className={fieldStyles.wrapper}>
      {(label || rightButton) && (
        <div className={fieldStyles.header}>
          {label && <label htmlFor={fieldId}>{label}</label>}
          {rightButton && <button onClick={rightButton?.onClick}>{rightButton.title}</button>}
        </div>
      )}

      <div
        className={classNames(fieldStyles.inputWrap, {
          [fieldStyles['inputWrap--error']]: isError,
          [fieldStyles['inputWrap--disable']]: isDisable,
        })}
      >
        <input
          id={fieldId}
          disabled={isDisable}
          placeholder={placeholder}
          spellCheck="false"
          type={isVisiblePassword ? 'text' : type}
          onBlur={handleBlurInput}
        />

        {isError && !isPasswordField && (
          <div className={classNames(fieldStyles.rightIcon, fieldStyles['rightIcon--error'])}>
            <WarningIcon />
          </div>
        )}

        {isPasswordField && (
          <button className={classNames(fieldStyles.rightIcon)} onClick={handleTogglePassword}>
            <EyeIcon isOpen={isVisiblePassword} />
          </button>
        )}

        {isOtpInput && (
          <button
            disabled={isDisable}
            className={classNames(fieldStyles.rightButton, isDisable && fieldStyles['rightButton--disable'])}
          >
            <span>Gửi mã</span>
          </button>
        )}
      </div>
      {isError && errorText && <div className={fieldStyles.message}>{errorText}</div>}
    </div>
  );
};

export default FormField;
