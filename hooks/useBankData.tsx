'use client'
import { getAccount, getAccountsH } from '@/lib/actions/bank.actions';
import { getBanks } from '@/lib/actions/user.actions';
import { useEffect, useState } from 'react';
import { getBanksForRevalidation } from '@/lib/actions/bank.actions';

const useBankData = (loggedIn: User, id: string): UseBankDataReturn => {
    const [banksForRevalidation, setBanksForRevalidation] = useState<BankReval[] | null>(null);
    const [tokensRevalidation, setTokensRevalidation] = useState(false);
    const [fetchingData, setFetchingData] = useState(true);
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [appwriteItemId, setAppwriteItemId] = useState<string>('');
    const [accountData, setAccountData] = useState<AccountData | null>(null);
    const [totalBanks, setTotalBanks] = useState<number | null>(null);
    const [totalCurrentBalance, setTotalCurrentBalance] = useState<number | null>(null);

    useEffect(() => {
      const fetchData = async () => {
        const banks = await getBanks({ userId: loggedIn.$id });   
        try {
          const accounts = await getAccountsH({ banks, userId: loggedIn.$id });
          const appwriteItemId = id || accounts?.data[0]?.appwriteItemId;
          const accountData = await getAccount({ appwriteItemId });
  
          setTotalBanks(accounts?.totalBanks);
          setTotalCurrentBalance(accounts?.totalCurrentBalance);

          setAccounts(accounts?.data);
          setAppwriteItemId(appwriteItemId);
          setAccountData(accountData);
        } catch (error) {
            if (error.message === "ITEM_LOGIN_REQUIRED") {
                // Ejecuta la función para evaluar los bancos que requieren revalidación
                const revalBanks = await getBanksForRevalidation(banks);
                setBanksForRevalidation(revalBanks);
                setTokensRevalidation(true);
              } else {
                console.log('Error en useBankData original', error);
              }
        } finally {
          setFetchingData(false);
        }
      };
  
      if (loggedIn) {
        fetchData();
      }
    }, [loggedIn, id]);
  
    return {
      totalBanks,
      totalCurrentBalance,
      fetchingData,
      accounts,
      appwriteItemId,
      accountData: accountData as AccountData, 
      tokensRevalidation,
      banksForRevalidation, // Retorna los bancos que requieren revalidación
    };
  };

export default useBankData