import { atom } from "jotai";
import { User } from "../lib/users";

export const userAtom = atom<User | null>(null);