import { User, Credential } from "@prisma/client";

export type iUser = Omit<User, "id">;

export type iCredential = Omit<Credential, "id">;
