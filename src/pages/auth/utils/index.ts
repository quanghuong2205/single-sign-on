import { hasProps, isEmpty, selectProps } from '@/utils';

export const isDisabled = (props: string[], errors: any, values: any) => {
  if (hasProps(errors, props, 'some') || !hasProps(values, props, 'all')) return true;

  return !!Object.keys(selectProps(values, props)).find((key) => {
    return isEmpty(values[key]);
  });
};
