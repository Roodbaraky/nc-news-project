import { createContext } from "react";
import { UserContextType } from "../types/User";
import { ErrorContextType } from "../types/Error";


export const UserContext = createContext<UserContextType | null>(null);

export const ErrorContext = createContext<ErrorContextType | null>(null);