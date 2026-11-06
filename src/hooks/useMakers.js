import { useCallback, useEffect, useState } from 'react';
import { fetchMakers } from '../api/makers';

const initialState = { status: 'loading', makers: [], error: null };

export function useMakers() {
  const [state, setState] = useState(initialState);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    fetchMakers({ signal: controller.signal })
      .then((makers) => {
        setState({ status: 'success', makers, error: null });
      })
      .catch((error) => {
        if (error.name === 'AbortError') return;
        setState({ status: 'error', makers: [], error });
      });

    return () => controller.abort();
  }, [attempt]);

  const retry = useCallback(() => {
    setState(initialState);
    setAttempt((value) => value + 1);
  }, []);

  return { ...state, retry };
}