import React, { useEffect } from "react";
import { useAppStore } from "@/store";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Chat = () => { 

  const { userInfo } = useAppStore();
  const navigate = useNavigate();
  useEffect(() => {
    if(!userInfo.profileSetup){
      toast("Complete o seu perfil para ter acesso ao chat")
      navigate("/profile");
    }
  }, [userInfo, navigate]);

  return (
    <div>
      <h1>Chat</h1>
    </div>
  );
};

export default Chat;