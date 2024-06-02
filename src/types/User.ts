import { Dispatch, SetStateAction } from "react";

export interface User{
    username: string,
    avatar_url: string,
    name: string,
    bio: string,
    location: string,
}
export interface UserContextType {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
  }