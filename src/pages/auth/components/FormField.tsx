import { InputHTMLAttributes, useEffect, useId, useRef, useState } from 'react';
import classNames from 'classnames';

import { EyeIcon, WarningIcon } from '@/components';
import fieldStyles from '../scss/form-field.module.scss';

import { listenEvent } from '@/utils';

type IRightHeaderButton = {
  title: string;
  onClick?: () => void;
};

interface IFormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  rightHeaderButton?: IRightHeaderButton;
  errorText?: string;
  isDisabled?: boolean;
  isInitialFocus?: boolean;
  onSetFieldValue: (name: string, value: string) => void;
}

const FormField: React.FC<IFormFieldProps> = ({
  label,
  rightHeaderButton,
  errorText,
  isDisabled,
  isInitialFocus,
  onSetFieldValue,
  ...inputProps
}) => {
  // states
  const fieldId = useId();
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
  const [isVisibleEye, setIsVisibleEye] = useState<boolean>(false);

  // refs
  const inputRef = useRef<HTMLInputElement>(null);
  const inputWrapperref = useRef<HTMLDivElement>(null);

  // flags
  const isPasswordField = inputProps.type === 'password';
  const isVisibleHeader = label || rightHeaderButton;

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
          {rightHeaderButton && <button onClick={rightHeaderButton?.onClick}>{rightHeaderButton.title}</button>}
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
          {...inputProps}
          ref={inputRef}
          id={fieldId}
          autoComplete="off"
          spellCheck="false"
          disabled={isDisabled}
          type={isVisiblePassword ? 'text' : inputProps.type}
          onChange={(event) => onSetFieldValue(inputProps.name!, event.target.value)}
          onFocus={handleFocusInput}
          className={classNames(isDisabled && 'disabled')}
        />

        {!!errorText && !isPasswordField && (
          <div className={classNames(fieldStyles.rightIcon, fieldStyles['rightIcon--error'])}>
            <WarningIcon cls="shake" />
          </div>
        )}

        {isPasswordField && isVisibleEye && (
          <button className={fieldStyles.rightIcon} onClick={handleTogglePassword}>
            <EyeIcon isOpen={isVisiblePassword} />
          </button>
        )}
      </div>
      {!!errorText && <div className={fieldStyles.message}>{errorText}</div>}
    </div>
  );
};

export default FormField;
