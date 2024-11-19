import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../components/Input";
import Button from "../components/Button";
import { SessionService } from "../services/SessionService";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const methods = useForm();

  const { handleSubmit } = methods;

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      setIsLoading(true);
      const response = await SessionService.login({ email, password });

      if (response) {
        localStorage.setItem("token", response.token);
        navigate("/");
      }
    } catch (error) {
      console.log("Error:", error);
      alert(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-screen h-screen flex justify-center items-center">
      <FormProvider {...methods}>
        <section className="flex flex-col items-center justify-center gap-5 p-4 w-full h-full bg-teal-500	text-white  ">
          <h1 className="text-3xl font-bold">Seja bem-vindo!</h1>
        </section>

        <section className="flex flex-col items-center justify-center border-2 p-5 w-full h-full">
          <div className="flex flex-col items-center justify-center gap-4 border-2 p-5 w-[50%]">
            <Input name="email" label="E-mail" type="email" />
            <Input name="password" label="Senha" type="password" />

            <Button
              label="Entrar"
              onClick={handleSubmit(onSubmit)}
              type="submit"
              disabled={isLoading}
            />

            {isLoading && <span>Carregando...</span>}
          </div>
        </section>
      </FormProvider>
    </section>
  );
}
