import React, { useEffect, useState } from "react";
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

interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  whatsapp: string;
}

export function Home() {
  const [contacts, setContacts] = useState<Contact[]>();
  const [open, setOpen] = useState(false);

  function handleDelete(id: string) {
    api.delete(`/contacts/${id}`);
  }
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

  return (
    <>
      <Container>
        <Header>
          <Title>Contact Innova Connect</Title>
          <ButtonAddContact onClick={() => setOpen(true)}>
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
                  <ButtonEdit>
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
      <Modal open={open} setOpen={setOpen} />
    </>
  );
}
