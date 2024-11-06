import { useEffect, useId, useRef, useState } from 'react';
import classNames from 'classnames';

import fieldStyles from '../scss/form-field.module.scss';
import { CountDown, LoadingIcon } from '@/components';

import useIsFirstMount from '@/hooks/useIsFirstMount';

import { OTP_COUNT_DOWN } from '../enum';

interface IOtpInputProps {
  name: string;
  isInputDisabled?: boolean;
  isActDisabled?: boolean;
  errorText?: string;
  onSetFieldValue: (name: string, value: string) => void;
}

const OtpInput: React.FC<IOtpInputProps> = ({
  isInputDisabled = true,
  isActDisabled = true,
  errorText,
  name,
  onSetFieldValue,
}) => {
  // states
  const fieldId = useId();
  const [isCountingdown, setIsCountingdown] = useState(false);
  const [otpSendingStage, setOtpSendingStage] = useState<{ pending: boolean; done: boolean }>({
    pending: false,
    done: false,
  });
  const [isDisabled, setIsDisabled] = useState<{ input: boolean; act: boolean }>({
    input: true,
    act: isActDisabled,
  });

  // hooks
  const isFirstMount = useIsFirstMount();

  // refs
  const isFirstOtpRequest = useRef<boolean>(true);

  // flags
  const isInputBoxDisabled = isDisabled.input || isInputDisabled;
  console.log({ isInputBoxDisabled, input: isDisabled.input, isInputDisabled });

  // handlers
  const handleSendVerification = async () => {
    setOtpSendingStage((prev) => ({ ...prev, pending: true, done: false }));
    setIsDisabled({ input: true, act: true });

    setTimeout(() => {
      setOtpSendingStage((prev) => ({ ...prev, pending: false, done: true }));
      setIsCountingdown(true);
      setIsDisabled({ input: false, act: true });

      if (isFirstOtpRequest.current) isFirstOtpRequest.current = false;
    }, 1000);
  };
  const handleAfterCountdown = () => {
    setIsDisabled((prev) => ({ ...prev, act: false }));
    setIsCountingdown(false);
    setOtpSendingStage((prev) => ({ ...prev, pending: false, done: false }));
  };

  // effects
  useEffect(() => {
    if (isFirstMount) return;
    setIsDisabled((prev) => ({ ...prev, act: isActDisabled }));
  }, [isActDisabled]);

  useEffect(() => {
    if (isFirstMount) return;
    setIsDisabled((prev) => ({ ...prev, input: isInputDisabled }));
  }, [isInputDisabled]);

  return (
    <div className={fieldStyles.wrapper}>
      <div
        className={classNames(fieldStyles.inputWrap, {
          [fieldStyles['inputWrap--disable']]: isInputBoxDisabled,
          [fieldStyles['inputWrap--error']]: !!errorText,
        })}
      >
        <input
          id={fieldId}
          disabled={isInputBoxDisabled}
          placeholder="Nhập mã xác nhận"
          spellCheck="false"
          type="text"
          name={name}
          onChange={(event) => onSetFieldValue(name, event.target.value)}
        />

        <button
          disabled={isDisabled.act}
          className={classNames(fieldStyles.rightButton, isDisabled.act && fieldStyles['rightButton--disable'])}
          onClick={handleSendVerification}
        >
          {!isCountingdown ? (
            <span>{isFirstOtpRequest.current ? 'Gửi mã' : 'Gửi lại mã'}</span>
          ) : (
            <CountDown
              delaySeconds={OTP_COUNT_DOWN}
              onAfterCountdown={handleAfterCountdown}
              renderer={({ seconds }) => <span>Gửi lại mã {seconds}</span>}
            />
          )}
          {otpSendingStage.pending && <LoadingIcon cls="spinner" />}
        </button>
      </div>
      {!!errorText && <div className={fieldStyles.message}>{errorText}</div>}
      {otpSendingStage.done && (
        <div className={classNames(fieldStyles.message, fieldStyles['message--help'])}>
          Đã gửi mã! Kiểm tra email của bạn để lấy mã.
        </div>
      )}
    </div>
  );
};

export default OtpInput;
