export interface ISelectItemComponentProps<T> {
  item: T;
  inputName?: string | null;
  onClick: (e: React.MouseEvent, item: T, inputName?: string | null) => void;
}

export interface ISelectAddComponentProps {
  parentRef?: React.RefObject<HTMLDivElement | null>;
  isPortal?: boolean;
}
