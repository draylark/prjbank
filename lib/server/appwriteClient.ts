
import { Client, Databases } from "node-appwrite";

const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!) // Reemplaza con tu endpoint de Appwrite
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!) // Reemplaza con el ID de tu proyecto

export const databases = new Databases(client);
export default client;