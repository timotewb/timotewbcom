import { Client, Databases, Account } from "appwrite";

const client = new Client();
client
    .setEndpoint('http://localhost/v1')
    .setProject('67346352002d651b0830');

export const account = new Account(client);
export const databases = new Databases(client);
