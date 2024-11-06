import FormFiled from '../components/FormField';
import Remember from '../components/Remember';
import { FieldErrors } from 'react-hook-form';

interface ILocalSignInFormProps {
  errors: FieldErrors<SigninFieldValuesType>;
  isSubmitting: boolean;
  onSetFieldValue: (name: string, value: string) => void;
}

const LocalSignInForm: React.FC<ILocalSignInFormProps> = ({ errors, onSetFieldValue, isSubmitting }) => {
  return (
    <>
      <div>
        <FormFiled
          label="Tên đăng nhập"
          rightButton={{ title: 'Đăng nhập với số điện thoại' }}
          placeholder="Email hoặc username"
          errorText={errors?.email?.message}
          name="email"
          onSetFieldValue={onSetFieldValue}
          isInitialFocus
          isDisabled={isSubmitting}
        />

        <FormFiled
          placeholder="Mật khẩu"
          errorText={errors?.password?.message}
          type="password"
          name="password"
          onSetFieldValue={onSetFieldValue}
          isDisabled={isSubmitting}
        />
      </div>
      <Remember />
    </>
  );
};

export default LocalSignInForm;
