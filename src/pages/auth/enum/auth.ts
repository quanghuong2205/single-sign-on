export const AUTH_MODE_PARAM_KEY = 'mode';
export const BLOCKED_MODES_FROM_URL: AuthModeType[] = ['RP'];

export const DEFAULT_AUTH_MODE: AuthModeType = 'SI';

export const AUTH_TEXT: { [key in AuthModeType]: AuthTextType } = {
  SI: {
    title: 'Đăng nhập',
    warning: 'Mỗi người nên sử dụng riêng một tài khoản, tài khoản nhiều người sử dụng chung sẽ bị khóa.',
    mode: 'Đăng nhập',
    hint: 'Bạn chưa có tài khoản?',
    linkTitle: 'Đăng ký',
    submitTitle: 'Đăng nhập',
  },

  SU: {
    title: 'Đăng ký tài khoản',
    warning: 'Mỗi người nên sử dụng riêng một tài khoản, tài khoản nhiều người sử dụng chung sẽ bị khóa.',
    mode: 'Đăng ký',
    hint: 'Bạn đã có tài khoản?',
    linkTitle: 'Đăng nhập',
    submitTitle: 'Đăng ký',
  },

  FP: {
    title: 'Quên mật khẩu?',
    mode: 'Quên mật khẩu?',
    desc: 'Nhập email hoặc username của bạn và chúng tôi sẽ gửi cho bạn mã khôi phục mật khẩu.',
    submitTitle: 'Đặt lại mật khẩu',
  },

  RP: {
    title: 'Đặt lại mật khẩu?',
    mode: 'Đặt lại mật khẩu?',
    desc: 'Đặt mật khẩu mới cho tài khoản của bạn để có thể tiếp tục truy cập.',
    submitTitle: 'Đặt lại mật khẩu',
  },
};

export const OTP_COUNT_DOWN = 3;
