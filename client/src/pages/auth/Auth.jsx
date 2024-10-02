import React from "react";
import Background from "../../assets/login2.png";
import Peace from "../../assets/peace.svg";
import { Tabs, TabsList } from "@/components/ui/tabs";
import { TabsContent, TabsTrigger } from "@radix-ui/react-tabs";

const Auth = () => {
  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
      <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70] xl:w-[60vw] rounded-3xl grid xl:group-cols-2">
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex items-center justify-center flex-col">
            <div className="flex items-center justify-center">
              <h1 className="text-5xl font-bold md:text-6xl">Bem Vindo</h1>
              <img src={Peace} alt="peace emoji" className="h-[100px]"></img>
            </div>
            <p className="font-medium text-center">Cheque os detalhes para poder começar a usar o melhor app de texto!!</p>
          </div>
          <div className="flex items-center justify-center w-full">
            <Tabs className="w-3/4">
              <TabsList className="bg-transparent rounded-none w-full">
                <TabsTrigger className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300" 
                value="login">Entrar</TabsTrigger>
                <TabsTrigger className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                value="signup">Cadastrar</TabsTrigger>
              </TabsList>
              <TabsContent className="" value="login"></TabsContent>
              <TabsContent className="" value="signup"></TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;