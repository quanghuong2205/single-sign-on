import formStyles from '../scss/form.module.scss';
import FormFiled from '../components/FormField';
import classNames from 'classnames';
import { AUTH_TEXT } from '../enum';

const disable = true;

function ForgotPasswordForm() {
  return (
    <form action="#" autoComplete="off">
      <div>
        <FormFiled
          label="Tên đăng nhập"
          placeholder="Email hoặc username"
          errorText="Trường này không được để trống"
          isError
        />

        <FormFiled placeholder="Nhập mã xác nhận" errorText="Trường này không được để trống" isDisable isOtpInput />
      </div>

      <button disabled={disable} className={classNames(formStyles.submit, disable && formStyles['submit-disable'])}>
        {AUTH_TEXT['FP'].submitTitle}
      </button>
    </form>
  );
}

export default ForgotPasswordForm;
