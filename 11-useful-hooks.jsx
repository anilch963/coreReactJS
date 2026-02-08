// ============================================
// REACT PATTERNS AND UTILITIES
// ============================================

import React from "react";

// 1. DEBOUNCE HOOK (for search, resize events)
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// Usage: const searchTerm = useDebounce(input, 500);

// 2. THROTTLE HOOK (for scroll, resize events)
function useThrottle(value, delay) {
  const [throttledValue, setThrottledValue] = React.useState(value);
  const lastRun = React.useRef(Date.now());

  React.useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRun.current >= delay) {
        setThrottledValue(value);
        lastRun.current = Date.now();
      }
    }, delay - (Date.now() - lastRun.current));

    return () => clearTimeout(handler);
  }, [value, delay]);

  return throttledValue;
}

// 3. PREVIOUS VALUE HOOK
function usePrevious(value) {
  const ref = React.useRef();

  React.useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

// Usage: const previousCount = usePrevious(count);

// 4. MOUNT/UNMOUNT HOOK
function useMount(callback) {
  React.useEffect(() => {
    callback();
  }, []);
}

function useUnmount(callback) {
  React.useEffect(() => {
    return () => callback();
  }, []);
}

// 5. WINDOW SIZE HOOK
function useWindowSize() {
  const [windowSize, setWindowSize] = React.useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0
  });

  React.useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

// 6. DARK MODE HOOK
function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  React.useEffect(() => {
    const isDark = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(isDark);

    if (isDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggle = () => {
    setIsDarkMode((prev) => {
      const newValue = !prev;
      localStorage.setItem("darkMode", newValue);
      if (newValue) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return newValue;
    });
  };

  return [isDarkMode, toggle];
}

// 7. MEDIA QUERY HOOK
function useMediaQuery(query) {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (e) => setMatches(e.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

// Usage: const isMobile = useMediaQuery("(max-width: 768px)");

// 8. INTERSECTION OBSERVER HOOK (for lazy loading)
function useIntersectionObserver(ref, options = {}) {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return isVisible;
}

// 9. GEOLOCATION HOOK
function useGeolocation() {
  const [location, setLocation] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => {
        setError(error.message);
      }
    );
  }, []);

  return { location, error };
}

// 10. COPY TO CLIPBOARD HOOK
function useCopyToClipboard() {
  const [isCopied, setIsCopied] = React.useState(false);

  const copy = React.useCallback((text) => {
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  }, []);

  return { copy, isCopied };
}

// 11. SCROLL TO TOP HOOK
function useScrollToTop() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return scrollToTop;
}

// 12. PREVIOUS STATE HOOK
function usePreviousState(value) {
  const prevRef = React.useRef();

  React.useEffect(() => {
    prevRef.current = value;
  }, [value]);

  return prevRef.current;
}

// 13. COUNTER HOOK
function useCounter(initial = 0, step = 1) {
  const [count, setCount] = React.useState(initial);

  const increment = () => setCount((c) => c + step);
  const decrement = () => setCount((c) => c - step);
  const reset = () => setCount(initial);

  return { count, increment, decrement, reset };
}

// Usage: const { count, increment, decrement, reset } = useCounter(0, 5);

// 14. FORM STATE HOOK
function useFormState(initialState) {
  const [formState, setFormState] = React.useState(initialState);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleReset = () => setFormState(initialState);

  return { formState, handleChange, handleReset };
}

// Usage: const { formState, handleChange, handleReset } = useFormState({ email: '' });

// 15. UNCONTROLLED INPUT HOOK
function useUncontrolledInput(defaultValue = "") {
  const inputRef = React.useRef(null);

  const getValue = () => inputRef.current?.value || "";
  const reset = () => {
    if (inputRef.current) {
      inputRef.current.value = defaultValue;
    }
  };

  return { inputRef, getValue, reset };
}

// 16. PROMISE HOOK (for handling async operations)
function usePromise(promiseFn, dependencies = []) {
  const [state, setState] = React.useState({
    status: "idle",
    data: null,
    error: null
  });

  React.useEffect(() => {
    setState({ status: "pending", data: null, error: null });

    promiseFn()
      .then((data) => setState({ status: "success", data, error: null }))
      .catch((error) => setState({ status: "error", data: null, error }));
  }, dependencies);

  return state;
}

// 17. VALIDATION HOOK
function useValidation(rules) {
  const [errors, setErrors] = React.useState({});

  const validate = (formData) => {
    const newErrors = {};

    Object.keys(rules).forEach((field) => {
      const fieldRules = rules[field];
      const value = formData[field];

      fieldRules.forEach((rule) => {
        if (!rule.validate(value)) {
          newErrors[field] = rule.message;
        }
      });
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { errors, validate };
}

// 18. STORAGE HOOK (for any storage - localStorage, sessionStorage)
function useStorage(key, initialValue, storage = localStorage) {
  const [storedValue, setStoredValue] = React.useState(() => {
    try {
      const item = storage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      storage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

// 19. PREVIOUS EFFECT HOOK (runs after mount)
function usePreviousEffect(callback, dependencies) {
  const isFirstRender = React.useRef(true);

  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    callback();
  }, dependencies);
}

// 20. INTERVAL HOOK
function useInterval(callback, delay) {
  const savedCallback = React.useRef();

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    if (delay === null) return;

    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

// Usage: useInterval(() => { /* do something */ }, 1000);

export {
  useDebounce,
  useThrottle,
  usePrevious,
  useMount,
  useUnmount,
  useWindowSize,
  useDarkMode,
  useMediaQuery,
  useIntersectionObserver,
  useGeolocation,
  useCopyToClipboard,
  useScrollToTop,
  usePreviousState,
  useCounter,
  useFormState,
  useUncontrolledInput,
  usePromise,
  useValidation,
  useStorage,
  usePreviousEffect,
  useInterval
};
