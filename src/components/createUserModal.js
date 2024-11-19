import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { UserService } from "../services/UserService";
import {
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Input from "./Input";
import Button from "./Button";

export default function CreateUser({ visible, setVisible, getUsers }) {
  const schema = yup.object().shape({
    name: yup.string().required("Nome é obrigatório"),
    type: yup.string().required("Tipo é obrigatório"),
    email: yup.string().email().required("E-mail é obrigatório"),
    password: yup.string().required("Senha é obrigatório"),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    try {
      await UserService.createUser(data);

      setVisible(false);
      getUsers();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <FormProvider {...methods}>
      <Dialog
        fullWidth
        open={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="responsive-dialog-title"
        style={{ padding: "15px" }}
      >
        <DialogTitle id="responsive-dialog-title">Novo usuário</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setVisible(false)}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <Container>
            <form
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-2"
            >
              <div className="flex flex-col gap-2">
                <Input name="name" label="Nome" type="text" />
                <Input name="type" label="Tipo" type="text" />
                <Input name="email" label="E-mail" type="email" />
                <Input name="password" label="Senha" type="password" />
              </div>

              <Button
                label="Adicionar Usuário"
                onClick={handleSubmit(onSubmit)}
                type="submit"
              />
            </form>
          </Container>
        </DialogContent>
      </Dialog>
    </FormProvider>
  );
}
