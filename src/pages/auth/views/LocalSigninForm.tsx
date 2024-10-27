import formStyles from '../scss/form.module.scss';
import classNames from 'classnames';
import FormFiled from '../components/FormField';
import Remember from '../components/Remember';
import { AUTH_TEXT } from '../enum';

const disable = true;

function LocalSignInForm() {
  return (
    <form action="#" autoComplete="off" onSubmit={(e) => e.preventDefault()}>
      <div>
        <FormFiled
          label="Tên đăng nhập"
          rightButton={{ title: 'Đăng nhập với số điện thoại' }}
          placeholder="Email hoặc username"
          errorText="Trường này không được để trống"
          isError
        />

        <FormFiled isError placeholder="Mật khẩu" errorText="Trường này không được để trống" type="password" />
      </div>
      <Remember />
      <button disabled={disable} className={classNames(formStyles.submit, disable && formStyles['submit-disable'])}>
        {AUTH_TEXT['SI'].submitTitle}
      </button>
    </form>
  );
}

export default LocalSignInForm;
