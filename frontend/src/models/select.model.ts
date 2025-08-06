export interface ISelectItemComponentProps<T> {
  item: T;
  onClick: (e: React.MouseEvent, item: T) => void;
}

export interface ISelectAddComponentProps {
  parentRef?: React.RefObject<HTMLDivElement | null>;
  isPortal?: boolean;
}
