import { createContext, useContext, useState, type ReactNode } from "react";

type userType = {
  company: string;
  address: string;
  phone: string;
  image: string;
};
type userContextType = {
  user: userType | null;
  setUser: (user: userType | null) => void;
};

const UserContext = createContext<userContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<userType | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
