import { Dispatch, SetStateAction } from "react";

export interface ErrorContextType {
    error?: Error |CustomError |null;
    setError: Dispatch<SetStateAction<Error | CustomError | null 
    >>;
}

export type ErrorPageProps = {
    error:  | CustomError | null;
}

export type ErrorPopUpProps = {
    error?: Error | CustomError | null;
    setError?: Dispatch<SetStateAction<Error | CustomError | null>>;
}

export interface CustomError {
    message: string,
    status?: number,
}