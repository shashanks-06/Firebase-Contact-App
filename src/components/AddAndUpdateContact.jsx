import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import Modal from "./Modal.jsx";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { db } from "../config/firebase.js";
import { toast } from "react-toastify";
import * as Yup from "yup";

const contactSchemaValidation = Yup.object().shape({
  Name: Yup.string().required("Name is required"),
  Email: Yup.string().email("Invalid Email").required("Email is required"),
});

const AddAndUpdateContact = ({ contact, isOpen, onClose, isUpdate }) => {
  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, "contacts");
      await addDoc(contactRef, contact);
      onClose();
      toast.success("Contact Added Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const updateContact = async (contact, id) => {
    try {
      const contactRef = doc(db, "contacts", id);
      await updateDoc(contactRef, contact);
      onClose();
      toast.success("Contact Updated Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto max-w-[370px]">
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
          validationSchema={contactSchemaValidation}
          initialValues={
            isUpdate
              ? {
                  Name: contact.Name,
                  Email: contact.Email,
                }
              : {
                  Name: "",
                  Email: "",
                }
          }
          onSubmit={(values) => {
            console.log(values);
            isUpdate ? updateContact(values, contact.id) : addContact(values);
          }}
        >
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="Name">Name</label>
              <Field name="Name" className="h-10 border" />
              <div className=" text-xs text-red-900">
                <ErrorMessage name="Name" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="Email">Email</label>
              <Field name="Email" className="h-10 border" />
              <div className=" text-xs text-red-500">
                <ErrorMessage name="Email" />
              </div>
            </div>
            <button className="transform self-end border bg-orange px-3 py-1.5 transition duration-300 ease-linear hover:scale-110 hover:bg-dark-yellow">
              {isUpdate ? "Update" : "Add"} Contact
            </button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

export default AddAndUpdateContact;
