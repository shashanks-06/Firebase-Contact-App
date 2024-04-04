import { FaUserNinja } from "react-icons/fa";
import { TbEditOff } from "react-icons/tb";
import { IoTrash } from "react-icons/io5";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase.js";
import useDisclouse from "../hooks/useDisclouse.js";
import AddAndUpdateContact from "./AddAndUpdateContact.jsx";
import { toast } from "react-toastify";

const ContactCard = ({ contact }) => {
  const { isOpen, onOpen, onClose } = useDisclouse();

  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      toast.success("Contact Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        key={contact.id}
        className=" group flex transform items-center justify-between rounded-lg bg-yellow p-2 transition duration-300 ease-linear hover:scale-105 hover:bg-amber-400"
      >
        <div className="flex gap-1">
          <FaUserNinja className="text-4xl text-orange transition duration-300 ease-in group-hover:text-rose-700" />
          <div>
            <h2 className="font-medium">{contact.Name}</h2>
            <p className="text-sm">{contact.Email}</p>
          </div>
        </div>
        <div className="flex text-3xl">
          <TbEditOff
            onClick={onOpen}
            className="transform cursor-pointer transition duration-300 ease-out hover:scale-125 hover:text-cyan-900"
          />
          <IoTrash
            onClick={() => deleteContact(contact.id)}
            className="transform cursor-pointer text-purple transition duration-300  ease-in-out hover:scale-125 hover:text-fuchsia-600"
          />
        </div>
      </div>
      <AddAndUpdateContact
        contact={contact}
        isUpdate
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default ContactCard;
