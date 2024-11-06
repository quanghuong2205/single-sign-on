import { useEffect, useId, useRef, useState } from 'react';
import classNames from 'classnames';

import { EyeIcon, WarningIcon } from '@/components';
import fieldStyles from '../scss/form-field.module.scss';

import { listenEvent } from '@/utils';

type IRightButton = {
  title: string;
  onClick?: () => void;
};

interface IFormFieldProps {
  name: string;
  label?: string;
  rightButton?: IRightButton;
  errorText?: string;
  type?: 'text' | 'password';
  isDisabled?: boolean;
  placeholder?: string;
  isInitialFocus?: boolean;
  onSetFieldValue: (name: string, value: string) => void;
}

const FormField: React.FC<IFormFieldProps> = ({
  name,
  label,
  rightButton,
  errorText,
  isDisabled,
  placeholder,
  type = 'text',
  isInitialFocus,
  onSetFieldValue,
}) => {
  // states
  const fieldId = useId();
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
  const [isVisibleEye, setIsVisibleEye] = useState<boolean>(false);

  // refs
  const inputRef = useRef<HTMLInputElement>(null);
  const inputWrapperref = useRef<HTMLDivElement>(null);

  // flags
  const isPasswordField = type === 'password';
  const isVisibleHeader = label || rightButton;

  // handlers
  const handleTogglePassword = () => setIsVisiblePassword((prev) => !prev);
  const handleBlurInput = () => {
    setIsVisibleEye(false);
    setIsVisiblePassword(false);
  };
  const handleFocusInput = () => setIsVisibleEye(true);

  // effects
  useEffect(() => {
    if (inputRef.current) {
      isInitialFocus && inputRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    if (!isPasswordField) return;
    const event = listenEvent('click', (e: any) => {
      if (!isVisibleEye || !inputWrapperref.current) return;
      if (!inputWrapperref.current.contains(e.target)) {
        handleBlurInput();
      }
    });
    return event;
  }, [isVisibleEye]);

  return (
    <div className={fieldStyles.wrapper}>
      {isVisibleHeader && (
        <div className={fieldStyles.header}>
          {label && <label htmlFor={fieldId}>{label}</label>}
          {rightButton && <button onClick={rightButton?.onClick}>{rightButton.title}</button>}
        </div>
      )}

      <div
        className={classNames(fieldStyles.inputWrap, {
          [fieldStyles['inputWrap--error']]: !!errorText,
          [fieldStyles['inputWrap--disable']]: isDisabled,
        })}
        ref={inputWrapperref}
      >
        <input
          ref={inputRef}
          id={fieldId}
          name={name}
          autoComplete="off"
          spellCheck="false"
          disabled={isDisabled}
          type={isVisiblePassword ? 'text' : type}
          placeholder={placeholder}
          onChange={(event) => onSetFieldValue(name, event.target.value)}
          onFocus={handleFocusInput}
        />

        {!!errorText && !isPasswordField && (
          <div className={classNames(fieldStyles.rightIcon, fieldStyles['rightIcon--error'])}>
            <WarningIcon cls="shake" />
          </div>
        )}

        {isPasswordField && isVisibleEye && (
          <button
            className={classNames(fieldStyles.rightIcon, !!errorText && fieldStyles['rightIcon--error'])}
            onClick={handleTogglePassword}
          >
            <EyeIcon isOpen={isVisiblePassword} />
          </button>
        )}
      </div>
      {!!errorText && <div className={fieldStyles.message}>{errorText}</div>}
    </div>
  );
};

export default FormField;
