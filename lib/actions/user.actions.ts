"use server"

import { ID } from "node-appwrite"
import { createAdminClient, createSessionClient } from "../server/appwrite"
import { cookies } from "next/headers"
import { parseStringify } from "../utils"


export const signIn = async ({ email, password }: signInProps) => {
    try {
        const { account } = await createAdminClient();
        // console.log('account', account)
        const session = await account.createEmailPasswordSession(email, password);
        // console.log('response', response)
        cookies().set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        return parseStringify(session)
    } catch (error) {
        console.log('error on signIn', error)
    }
}

export const signUp = async (data: SignUpParams) => {
    const { email, password, firstName, lastName } = data

    try {
        const { account } = await createAdminClient();
        const newUserAccount = await account.create(
            ID.unique(), 
            email, 
            password, 
            `${firstName} ${lastName}`
        );

        const session = await account.createEmailPasswordSession(email, password);
      
        cookies().set("appwrite-session", session.secret, {
          path: "/",
          httpOnly: true,
          sameSite: "strict",
          secure: true,
        });
        return parseStringify(newUserAccount)
    } catch (error) {
        console.log('error on signIn', error)
    }
}

export const logoutAccount = async() => {
    try {
        const { account } = await createSessionClient();
        cookies().delete('appwrite-session')

        await account.deleteSession('current')
    } catch (error) {
        return null
    }
}