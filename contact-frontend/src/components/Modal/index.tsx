import React, { Dispatch, SetStateAction, useCallback } from "react";
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
interface ModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function Modal({ open, setOpen }: ModalProps) {
  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);
  const handleSubmit = useCallback(async (event: any) => {
    event.preventDefault();
    let name = event.target.name.value;
    let phone = event.target.phone.value;
    let whatsapp = event.target.whatsapp.value;
    let email = event.target.email.value;
    await api.post("contacts", {
      name,
      phone,
      whatsapp,
      email,
    });
    handleClose();
  }, []);

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
            <Input name="name" />
          </ContainerInput>
          <ContainerInput>
            Phone:
            <Input name="phone" />
          </ContainerInput>
          <ContainerInput>
            Whatsapp:
            <Input name="whatsapp" />
          </ContainerInput>
          <ContainerInput>
            Email:
            <Input name="email" />
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
