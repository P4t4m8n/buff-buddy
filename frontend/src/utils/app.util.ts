import type { TDebouncedFunction } from "../models/UI.model";

export const appUtil = {
  getTempId: (prefix = "temp", item?: any) => {
    if (item?.id) {
      return item.id;
    }
    return `${prefix}/${Math.random().toString(36).substring(2, 15)}`;
  },
  debounce: <F extends (...args: any[]) => any>(
    fn: F,
    wait = 200,
    opts: { leading?: boolean; trailing?: boolean } = {}
  ): TDebouncedFunction<F> => {
    const { leading = false, trailing = true } = opts;

    let timer: ReturnType<typeof setTimeout> | null = null;
    let lastArgs: Parameters<F> | null = null;
    let lastThis: any;
    let result: ReturnType<F> | undefined;

    const invoke = () => {
      if (!lastArgs) return;
      result = fn.apply(lastThis, lastArgs);
      lastArgs = null;
      lastThis = undefined;
    };

    const startTimer = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        if (trailing && lastArgs) {
          invoke();
        } else {
          lastArgs = null;
          lastThis = undefined;
        }
      }, wait);
    };

    const debounced = function (this: any, ...args: Parameters<F>) {
      lastArgs = args;
      lastThis = this;

      const shouldCallNow = leading && !timer;

      if (shouldCallNow) {
        invoke();
      }

      if (trailing) {
        startTimer();
      }

      return result;
    };

    debounced.cancel = () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      lastArgs = null;
      lastThis = undefined;
    };

    debounced.flush = () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      if (lastArgs) {
        invoke();
        return result;
      }
      return result;
    };

    return debounced;
  },
};
