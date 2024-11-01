'use client'
import React, { useState, useEffect } from 'react';
import { getAccountsH, getBanksForRevalidation } from '@/lib/actions/bank.actions';
import { getBanks } from '@/lib/actions/user.actions';
import RevalidationDialog from './ui/RevalidationDialog';
import HeaderBox from '@/components/ui/HeaderBox'
import Loading from '@/app/(root)/loading';

const BaseContent = ({ loggedIn, children }: BaseContentProps) => {
    const [banksForRevalidation, setBanksForRevalidation] = useState<BankReval[] | null>(null);
    const [tokensRevalidation, setTokensRevalidation] = useState(false);
    const [fetchingData, setFetchingData] = useState(true);

    const verifyIfRevalidationIsNeeded = async () => {
        const banks = await getBanks({ userId: loggedIn.$id });
        try {
            const accounts = await getAccountsH({ banks, userId: loggedIn.$id });
            if (accounts) {
                setTokensRevalidation(false);
            }
        } catch (error) {
            if (error.message === "ITEM_LOGIN_REQUIRED") {
                const revalBanks = await getBanksForRevalidation(banks);
                setBanksForRevalidation(revalBanks);
                setTokensRevalidation(true);
            } else {
                console.log('Error en useBankData', error);
            }
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