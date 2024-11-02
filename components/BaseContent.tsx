"use client"

import React, { useState, useEffect } from 'react';
import { getAccountsH, getBanksForRevalidation } from '@/lib/actions/bank.actions';
import { getBanks } from '@/lib/actions/user.actions';
import RevalidationDialog from './ui/RevalidationDialog';
import HeaderBox from '@/components/ui/HeaderBox'
import Loading from '@/app/(root)/loading';
import HeaderBoxError from './ui/HeaderBoxError';

const BaseContent = ({ loggedIn, children }: BaseContentProps) => {
    const [banksForRevalidation, setBanksForRevalidation] = useState<BankReval[] | null>(null);
    const [tokensRevalidation, setTokensRevalidation] = useState(false);
    const [fetchingData, setFetchingData] = useState(true);
    const [errorWhileFetching, setErrorWhileFetching] = useState(false)
    const [errorMessage, setErrorMessage] = useState('Error while fetching data.')

    const verifyIfRevalidationIsNeeded = async () => {
        try {
            const banks = await getBanks({ userId: loggedIn.$id });
            const accounts = await getAccountsH({ banks, userId: loggedIn.$id });

            if(accounts?.revalidationRequired){
                const revalBanks = await getBanksForRevalidation(banks);
                setBanksForRevalidation(revalBanks);
                setTokensRevalidation(true);
                return;
            }

            if (accounts) {
                setTokensRevalidation(false);
            }
        } catch (error) {
            console.log('Error en verifyIfRevalidationIsNeeded', error);           
            setErrorWhileFetching(true)
            setErrorMessage(error?.message || 'Error while fetching data')
        } finally {
            setFetchingData(false);
        }
    };

    useEffect(() => {
        if (loggedIn) {
            verifyIfRevalidationIsNeeded();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedIn]);


    if (errorWhileFetching) {
        return (
            <div className='home-content'>
                <header className='home-header'>
                    <HeaderBoxError
                        title="Error"
                        subtext={errorMessage}
                    />
                </header>
            </div>
        );
    }

    // Mostrar el RevalidationModal si se necesita revalidación
    if (tokensRevalidation && banksForRevalidation) {
        return (
            <div className='home-content'>
                <header className='home-header'>
                    <HeaderBox
                        type="greeting"
                        title="Welcome"
                        user={loggedIn?.firstName || 'Guest'}
                        subtext="Accces and manage your account and transactions efficiently."
                    />
                    <RevalidationDialog banksForRevalidation={banksForRevalidation} />
                </header>
            </div>
        );
    }

    // Mostrar los children cuando todo está en orden o si aún está cargando
    return fetchingData ? <Loading/> : <>{children}</>;
};

export default BaseContent;