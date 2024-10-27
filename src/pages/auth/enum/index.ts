export const AUTH_TEXT: { [key in AuthModeType]: AuthTextType } = {
  SI: {
    title: 'Đăng nhập',
    warning: 'Mỗi người nên sử dụng riêng một tài khoản, tài khoản nhiều người sử dụng chung sẽ bị khóa.',
    mode: 'Đăng nhập',
    hint: 'Bạn chưa có tài khoản?',
    linkTitle: 'Đăng ký',
    submitTitle: 'Đăng ký',
  },
  SU: {
    title: 'Đăng ký tài khoản',
    warning: 'Mỗi người nên sử dụng riêng một tài khoản, tài khoản nhiều người sử dụng chung sẽ bị khóa.',
    mode: 'Đăng ký',
    hint: 'Bạn đã có tài khoản?',
    linkTitle: 'Đăng nhập',
    submitTitle: 'Đăng nhập',
  },

  FP: {
    title: 'Quên mật khẩu?',
    mode: 'Quên mật khẩu?',
    desc: 'Nhập email hoặc username của bạn và chúng tôi sẽ gửi cho bạn mã khôi phục mật khẩu.',
    submitTitle: 'Đặt lại mật khẩu',
  },
};
