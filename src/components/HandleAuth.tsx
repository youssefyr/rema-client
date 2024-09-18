import { useEffect, useState } from "react";
import Login from "./Login";
import SignIn from "./SignIn";
import store from "../store";

interface AuthProps {
  initialAuthChoice: "login" | "signin";
}

export default function Auth({ initialAuthChoice }: AuthProps) {
  const [theme] = useState("light");
  const [authChoice, setAuthChoice] = useState<AuthProps["initialAuthChoice"]>(initialAuthChoice);

  useEffect(() => {
    const updateTheme = async () => {
      await store.set("theme", theme!);
      const localTheme = await store.get<{value: string}>("theme") || "light"; 
      console.log(localTheme.toString())
      document.querySelector("html")?.setAttribute("data-theme", localTheme.toString());
    };

    updateTheme();
  }, [theme]);

  const handleAuthChoiceChange = (choice: "login" | "signin") => {
    setAuthChoice(choice);
  };

  return (
    <div className="flex justify-center items-center p-8 max-w-lg w-full">
      <div className={`w-full max-w-md ${authChoice === "login" ? "block" : "hidden"}`}>
        <Login theme={theme} onAuthChoiceChange={handleAuthChoiceChange} />
      </div>
      <div className={`w-full max-w-md ${authChoice === "signin" ? "block" : "hidden"}`}>
        <SignIn theme={theme} onAuthChoiceChange={handleAuthChoiceChange} />
      </div>
    </div>
  );
}