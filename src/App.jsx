import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./components/NavBar";
import { FaSearchengin } from "react-icons/fa";
import { BsPersonPlus } from "react-icons/bs";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase.js";
import ContactCard from "./components/ContactCard.jsx";
import AddAndUpdateContact from "./components/AddAndUpdateContact.jsx";
import useDisclouse from "./hooks/useDisclouse.js";
import NotFoundContact from "./components/NotFoundContact.jsx";

const App = () => {
  const [contacts, setContacts] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclouse();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");

        onSnapshot(contactsRef, (snapshot) => {
          const contactsList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactsList);
          return contactsList;
        });
      } catch (error) {
        console.log(error);
      }
    };

    getContacts();
  }, []);

  const filterContacts = (e) => {
    const value = e.target.value;

    const contactsRef = collection(db, "contacts");

    onSnapshot(contactsRef, (snapshot) => {
      const contactsLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const filteredContacts = contactsLists.filter((contact) =>
        contact.Name.toLowerCase().includes(value.toLowerCase()),
      );

      setContacts(filteredContacts);

      return filteredContacts;
    });
  };

  return (
    <>
      <div className="mx-auto max-w-[370px] px-4">
        <NavBar />
        <div className="flex gap-2 ">
          <div className="group relative flex flex-grow items-center">
            <FaSearchengin className="absolute ml-1 transform text-3xl text-white transition duration-300 ease-in-out group-hover:scale-110 group-hover:text-sky-400" />
            <input
              onChange={filterContacts}
              type="text"
              className="h-10 flex-grow rounded-md border border-white bg-transparent pl-9 text-white"
            />
          </div>

          <BsPersonPlus
            onClick={onOpen}
            className="transform cursor-pointer text-5xl text-white transition duration-300 ease-in-out hover:scale-110 hover:text-sky-400"
          />
        </div>
        <div className="mt-4 flex flex-col gap-3">
          {contacts.length <= 0 ? (
            <NotFoundContact />
          ) : (
            contacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))
          )}
        </div>
      </div>
      <ToastContainer position="bottom-center" />
      <AddAndUpdateContact isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default App;
