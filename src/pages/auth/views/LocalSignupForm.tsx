import formStyles from '../scss/form.module.scss';
import classNames from 'classnames';
import FormFiled from '../components/FormField';
import PasswordLevel from '../components/PasswordLevel';
import { AUTH_TEXT } from '../enum';

const disable = true;

function LocalSignUpForm() {
  return (
    <form action="#" autoComplete="off">
      <div>
        <FormFiled label="Tên của bạn" placeholder="Họ và tên" errorText="Trường này không được để trống" />

        <FormFiled
          label="Email của bạn"
          rightButton={{ title: 'Đăng nhập với số điện thoại' }}
          placeholder="Địa chỉ email"
          errorText="Trường này không được để trống"
        />

        <div>
          <FormFiled isError placeholder="Mật khẩu" errorText="Trường này không được để trống" />
          <PasswordLevel password="hello@Hc" />
        </div>

        <FormFiled placeholder="Nhập mã xác nhận" errorText="Trường này không được để trống" isDisable isOtpInput />
      </div>
      <button disabled={disable} className={classNames(formStyles.submit, disable && formStyles['submit-disable'])}>
        {AUTH_TEXT['SU'].submitTitle}
      </button>
    </form>
  );
}

export default LocalSignUpForm;
