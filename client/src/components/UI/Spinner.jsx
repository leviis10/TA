import { createPortal } from "react-dom";

const parentEl = document.getElementById("spinner");

function Spinner() {
  return (
    <>
      {createPortal(
        <div className="fixed min-w-full min-h-full bg-zinc-950/60 flex justify-center items-center z-10">
          <div className="w-12 h-12 border-2 border-t-0 rounded-full animate-spin"></div>
        </div>,
        parentEl
      )}
    </>
  );
}

export default Spinner;
