import { FormProvider, useForm } from "react-hook-form";
import Input from "../components/Input";
import Button from "../components/Button";
import { SessionService } from "../services/SessionService";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserService } from "../services/UserService";

export default function UserEdit() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const methods = useForm();
  const { handleSubmit, reset } = methods;

  const [user, setUser] = useState();

  const getUser = async () => {
    try {
      const response = await UserService.get();

      setUser(response.find((user) => user.id === userId));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!userId) return;
    getUser();
  }, [userId]);

  useEffect(() => {
    if (user) {
      methods.reset(user);
    }
  }, [userId]);

  const onSubmit = async (data) => {
    try {
      const response = await UserService.updateUser(userId, data);

      if (response) {
        navigate("/users");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <section>
        <Input name="name" label="Nome" type="text" />
        <Input name="type" label="Tipo" type="text" />
        <Input name="email" label="E-mail" type="email" />
        <Input name="password" label="Senha" type="password" />
        <Button label="Entrar" onClick={handleSubmit(onSubmit)} type="submit" />
      </section>
    </FormProvider>
  );
}
