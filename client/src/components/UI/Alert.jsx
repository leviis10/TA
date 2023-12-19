import { XMarkIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../store/reducers/ui";

function Alert() {
  const dispatch = useDispatch();
  const { alertMessage, alertIsError } = useSelector((state) => state.ui);

  function closeAlertHandler() {
    dispatch(setAlert({ show: false, message: "", isError: false }));
  }

  function alertStyle() {
    let style = "py-4 px-8 rounded-lg mb-3 relative ";

    if (alertIsError) {
      style += "bg-red-500";
    }
    if (!alertIsError) {
      style += "bg-emerald-500";
    }

    return style;
  }

  return (
    <div className={alertStyle()}>
      <p className="text-xl text-zinc-50">{alertMessage}</p>
      <button className="absolute top-3 right-4" onClick={closeAlertHandler}>
        <XMarkIcon className="h-6 w-6" />
      </button>
    </div>
  );
}

export default Alert;
