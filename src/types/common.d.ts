interface ObjAny {
  [key: string]: any;
}

type Nullable<T> = T | null;

interface RouteProps {
  path: string;
  name?: string;
  component: React.FC;
  middleware?: any;
}

interface IIconProps {
  cls?: string;
  width?: number;
  height?: number;
}
