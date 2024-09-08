import { getAccount, getAccounts } from '@/lib/actions/bank.actions';

const useUserData = async (loggedIn: User, id: string): Promise<UseUserDataReturn> => {
    const accounts = await getAccounts({ userId: loggedIn.$id });
  
    const accountsData = accounts?.data;
    const appwriteItemId = ( id as string ) || accountsData[0]?.appwriteItemId;
    const account = await getAccount({ appwriteItemId });

    return {
        accountsData,
        appwriteItemId,
        account
    }
}

export default useUserData;