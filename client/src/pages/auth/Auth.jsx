import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import Background from "../../assets/login2.png";
import Peace from "../../assets/peace.svg";
import { Tabs, TabsList } from "@/components/ui/tabs";
import { TabsContent, TabsTrigger } from "@radix-ui/react-tabs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import apiClient from "@/lib/api-client";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";

const Auth = () => {
  const {setUserInfo} = useAppStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateLogin = () => {
    if (!email.length) {
      toast.error("Campo email não pode ser vazio");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Formato de email inválido");
      return false;
    }
    if (!password.length) {
      toast.error("Campo senha não pode ser vazio");
      return false;
    }
    return true;
  };

  const validateSignup = () => {
    if (!email.length) {
      toast.error("Campo email não pode ser vazio");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Formato de email inválido");
      return false;
    }
    if (!password.length) {
      toast.error("Campo senha não pode ser vazio");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Senhas não conferem");
      return false;
    }
    return true;
  };

  const handleSubmitLogin = async () => {
    if (validateLogin()) {
      try {
        const response = await apiClient.post(LOGIN_ROUTE, { email, password }, { withCredentials: true });
        if (response.data.user.id) {
          setUserInfo(response.data.user);
          if (response.data.user.profileSetup) {
            navigate("/chat");
          } else {
            navigate("/profile");
          }
        }
      } catch (error) {
        toast.error("Erro ao tentar fazer login. Verifique suas credenciais e tente novamente.");
      }
    }
  };

  const handleSubmitSignup = async () => {
    if (validateSignup()) {
      const response = await apiClient.post(SIGNUP_ROUTE, { email, password }, { withCredentials: true });
      if (response.status === 201) {
        setUserInfo(response.data.user);
        navigate("/profile");
      }
      console.log(response);
    }
  };

  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
      <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2">
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex items-center justify-center flex-col">
            <div className="flex items-center justify-center">
              <h1 className="text-5xl font-bold md:text-6xl">Bem Vindo</h1>
              <img src={Peace} alt="peace emoji" className="h-[100px]"></img>
            </div>
            <p className="font-medium text-center">Cheque os detalhes para poder começar a usar o melhor app de texto!!</p>
          </div>
          <div className="flex items-center justify-center w-full">
            <Tabs className="w-3/4" defaultValue="login">
              <TabsList className="bg-transparent rounded-none w-full">
                <TabsTrigger className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                  value="login">Entrar</TabsTrigger>
                <TabsTrigger className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                  value="signup">Cadastrar</TabsTrigger>
              </TabsList>
              <TabsContent className="flex flex-col gap-5 mt-10" value="login">
                <Input placeholder="Email" type="email" className="rounded-full p-6" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input placeholder="Senha" type="password" className="rounded-full p-6" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button className="rounded-full p-6" onClick={handleSubmitLogin}>Entrar</Button>
              </TabsContent>
              <TabsContent className="flex flex-col gap-5 mt-10" value="signup">
                <Input placeholder="Email" type="email" className="rounded-full p-6" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input placeholder="Senha" type="password" className="rounded-full p-6" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Input placeholder="Confirme a Senha" type="password" className="rounded-full p-6" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <Button className="rounded-full p-6" onClick={handleSubmitSignup}>Cadastrar</Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="hidden xl:flex justify-center items-center">
          <img src={Background} alt="background" className="h-[700px]" />
        </div>
      </div>
    </div>
  );
};

export default Auth;