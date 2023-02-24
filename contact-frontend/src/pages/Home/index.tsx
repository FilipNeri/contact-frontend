import React, { useCallback, useEffect, useState } from "react";
import { FiDelete } from "react-icons/fi";
import { FiPlusCircle } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";
import { FiPhoneCall } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import {
  ButtonAddContact,
  ButtonDelete,
  ButtonEdit,
  CardContact,
  CardContactBottom,
  CardContactTop,
  CardItems,
  Container,
  Header,
  Title,
} from "./styles";
import data from "../../../data.json";
import { Modal } from "../../components/Modal";
import api from "../../services/api";

export interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  whatsapp: string;
}

export function Home() {
  const [contacts, setContacts] = useState<Contact[]>();
  const [open, setOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState<Contact>({
    email: "",
    id: "",
    name: "",
    phone: "",
    whatsapp: "",
  });
  function handleAdd() {
    setCurrentContact({ email: "", id: "", name: "", phone: "", whatsapp: "" });
    setOpen(true);
  }

  function handleEdit(contact: Contact) {
    setCurrentContact(contact);
    setOpen(true);
  }
  const getContacts = useCallback(() => {
    api.get<Contact[]>("contacts").then((response) => {
      setContacts(response.data);
    });
  }, []);
  const handleDelete = useCallback(
    (id: string) => {
      api.delete(`/contacts/${id}`);
      getContacts();
    },
    [getContacts]
  );
  /*
  useEffect(() => {
    let contactsList: Contact[] = [];
    data.contact.map((contact) => {
      let cont: Contact = {
        id: contact.id,
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        whatsapp: contact.whatsapp,
      };
      contactsList.push(cont);
    });
    setContacts(contactsList);
  }, []);
  */
  useEffect(() => {
    getContacts();
  }, [getContacts]);

  return (
    <>
      <Container>
        <Header>
          <Title>Contact Innova Connect</Title>
          <ButtonAddContact onClick={handleAdd}>
            <FiPlusCircle />
            <label
              style={{
                display: "flex",
                flex: "1",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              Add New Contact
            </label>
          </ButtonAddContact>
        </Header>
        {contacts &&
          contacts.map((contact) => (
            <CardContact key={contact.id}>
              <CardContactTop>
                <CardItems>
                  <FiUser />
                  <label style={{ fontSize: "25px", marginLeft: "4px" }}>
                    {contact.name}
                  </label>
                </CardItems>
                <div>
                  <ButtonEdit onClick={() => handleEdit(contact)}>
                    <FiEdit />
                  </ButtonEdit>
                  <ButtonDelete onClick={() => handleDelete(contact.id)}>
                    <FiDelete />
                  </ButtonDelete>
                </div>
              </CardContactTop>
              <CardContactBottom>
                <CardItems>
                  <AiOutlineMail />
                  <label style={{ marginLeft: "5px" }}>{contact.email}</label>
                </CardItems>
                <CardItems>
                  <FiPhoneCall />
                  <label style={{ marginLeft: "5px" }}>{contact.phone}</label>
                </CardItems>
                <CardItems>
                  <AiOutlineWhatsApp />
                  <label style={{ marginLeft: "5px" }}>
                    {contact.whatsapp}
                  </label>
                </CardItems>
              </CardContactBottom>
            </CardContact>
          ))}
      </Container>
      <Modal
        open={open}
        setOpen={setOpen}
        currentContact={currentContact}
        getContacts={getContacts}
      />
    </>
  );
}
