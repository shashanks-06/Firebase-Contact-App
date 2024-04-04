import { createPortal } from "react-dom";
import { GiTireIronCross } from "react-icons/gi";

const Modal = ({ onClose, isOpen, children }) => {
  return createPortal(
    <>
      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center backdrop-blur">
          <div className=" relative z-50 w-full max-w-[330px] bg-white p-4 ">
            <div className="flex justify-end">
              <GiTireIronCross
                onClick={onClose}
                className="transform self-end text-2xl transition duration-300 ease-linear hover:scale-125 hover:text-zinc-500"
              />
            </div>
            {children}
          </div>
        </div>
      )}
    </>,
    document.getElementById("modal-root"),
  );
};

export default Modal;
