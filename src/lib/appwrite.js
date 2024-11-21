import { Client, Databases, Account } from "appwrite";

const client = new Client();
client.setProject('673ecc3c002ea32a2080');

export const account = new Account(client);
export const databases = new Databases(client);
