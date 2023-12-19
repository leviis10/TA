import { useDispatch } from "react-redux";
import { setAlert, setIsLoading } from "../store/reducers/ui";
import { useCallback } from "react";

function useLoading() {
  const dispatch = useDispatch();

  return useCallback(
    async function ({
      fn = async () => {},
      errorFn = () => {},
      finallyFn = () => {},
    }) {
      try {
        // Render loading spinner
        dispatch(setIsLoading(true));

        // Execute fn
        await fn();
      } catch (err) {
        // Show error alert
        dispatch(
          setAlert({
            show: true,
            message: err.response.data.message,
            isError: true,
          })
        );

        // Execute errorFn
        errorFn(err);
      } finally {
        // Remove loading spinner
        dispatch(setIsLoading(false));

        // Execute finallyFn
        finallyFn();
      }
    },
    [dispatch]
  );
}

export default useLoading;
