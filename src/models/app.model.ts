export interface IAppNav {
  label: string;
  path: string;
  icon?: React.ReactNode;
}


export interface IBaseFilter {
  skip?: number;
  page?: number;
}