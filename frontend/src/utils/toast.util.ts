type TListener<T> = (data: T) => void;
type TListenersMap<T> = Map<string, TListener<T>[]>;

export const TOAST_TYPES = ["error", "success", "info", "warning"] as const;

type TToastType = (typeof TOAST_TYPES)[number];

const createEventEmitter = <T>(): {
  on(evName: string, listener: TListener<T>): () => void;
  emit(evName: string, data: T): void;
} => {
  const listenersMap: TListenersMap<T> = new Map();

  return {
    on(evName: TToastType, listener: TListener<T>) {
      listenersMap.get(evName);
      if (!listenersMap.has(evName)) {
        listenersMap.set(evName, []);
      }
      listenersMap.get(evName)?.push(listener);

      return () => {
        const listeners = listenersMap.get(evName);
        if (!listeners) return;

        const index = listeners.indexOf(listener);
        if (index !== -1) {
          listeners.splice(index, 1);
        }

        if (listeners.length === 0) {
          listenersMap.delete(evName);
        }
      };
    },

    emit(evName: string, data: T) {
      const listeners = listenersMap.get(evName);
      if (!listeners) return;

      listeners.forEach((listener) => listener(data));
    },
  };
};

export const eventEmitter = createEventEmitter<React.ReactNode>();

export const emitEvent = ({
  type,
  cmp,
}: {
  type: TToastType;
  cmp: React.ReactNode;
}) => {
  eventEmitter.emit(type, cmp);
  return;
};
