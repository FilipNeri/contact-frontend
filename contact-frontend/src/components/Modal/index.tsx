import React, { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { ContainerInput, Input } from "./styles";
import api from "../../services/api";

import { Contact } from "../../pages/Home";

interface ModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  currentContact: Contact;
  getContacts: () => void;
}

export function Modal({
  open,
  setOpen,
  currentContact,
  getContacts,
}: ModalProps) {
  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);
  const handleSubmit = useCallback(
    async (event: any) => {
      event.preventDefault();
      let name = event.target.name.value;
      let phone = event.target.phone.value;
      let whatsapp = event.target.whatsapp.value;
      let email = event.target.email.value;
      if (currentContact.id) {
        await api.put("contacts", {
          id: currentContact.id,
          name,
          phone,
          whatsapp,
          email,
        });
      } else {
        await api.post("contacts", {
          name,
          phone,
          whatsapp,
          email,
        });
      }
      handleClose();
      getContacts();
    },
    [currentContact, getContacts()]
  );
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" style={{ color: "#0066ab" }}>
        {"Create a new contact"}
      </DialogTitle>
      <DialogContent>
        <form id="forms" onSubmit={handleSubmit}>
          <ContainerInput>
            Name:
            <Input name="name" defaultValue={currentContact.name} />
          </ContainerInput>
          <ContainerInput>
            Phone:
            <Input name="phone" defaultValue={currentContact.phone} />
          </ContainerInput>
          <ContainerInput>
            Whatsapp:
            <Input name="whatsapp" defaultValue={currentContact.whatsapp} />
          </ContainerInput>
          <ContainerInput>
            Email:
            <Input name="email" defaultValue={currentContact.email} />
          </ContainerInput>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" form="forms" autoFocus>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
