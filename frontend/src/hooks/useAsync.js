import { useCallback, useEffect, useRef, useState } from "react";

function toErrorMessage(error) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Something went wrong.";
}

export function useAsync(loader, readCached) {
  const loaderRef = useRef(loader);
  const readCachedRef = useRef(readCached);
  loaderRef.current = loader;
  readCachedRef.current = readCached;

  const requestId = useRef(0);
  const [data, setData] = useState(() => readCached());
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(() => readCached() === null);

  const run = useCallback((fresh) => {
    const id = ++requestId.current;
    const cached = readCachedRef.current();

    if (fresh || cached === null) {
      setLoading(true);
      setError(null);
    }

    loaderRef
      .current({ fresh })
      .then((result) => {
        if (requestId.current !== id) {
          return;
        }

        setData(result);
        setError(null);
        setLoading(false);
      })
      .catch((caught) => {
        if (requestId.current !== id) {
          return;
        }

        setLoading(false);
        if (fresh || readCachedRef.current() === null) {
          setError(toErrorMessage(caught));
        }
      });
  }, []);

  const reload = useCallback(() => {
    run(true);
  }, [run]);

  useEffect(() => {
    run(false);

    return () => {
      requestId.current += 1;
    };
  }, [run]);

  return { data, error, loading, reload };
}
