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
    getUser();
  }, [userId]);

  useEffect(() => {
    if (user) {
      methods.reset(user);
    }
  }, [user]);

  const onSubmit = async (data) => {
    try {
      const response = await UserService.updateUser(userId, data);

      if (response) {
        navigate("/");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <section className="flex flex-col gap-5 p-4">
      <h2 className="text-2xl font-bold">Alterar Usuário</h2>

      <FormProvider {...methods}>
        <div className="flex gap-5 w-full">
          <Input name="name" label="Nome" type="text" />
          <Input name="type" label="Tipo" type="text" />
        </div>

        <div className="flex gap-5 w-full">
          <Input name="email" label="E-mail" type="email" />
          <Input name="password" label="Senha" type="password" />
        </div>
      </FormProvider>

      <Button
        label="Editar usuário"
        onClick={handleSubmit(onSubmit)}
        type="submit"
      />
    </section>
  );
}
