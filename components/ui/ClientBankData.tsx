"use client"; // Asegúrate de especificar que este componente es para el cliente
import useBankData from "@/hooks/useBankData";
import HeaderBox from "./HeaderBox";
import TotalBalance from "./TotalBalance";
import RecentTransactions from "./RecentTransactions";
import RevalidationDIalog from "./RevalidationDialog";
import RightSideBar from "./RightSidebar";

const ClientBankData = ({ loggedIn, id, page }: { loggedIn: User, id: string, page: string | string[] }) => {

    const currentPage = Number(page as string) || 1;
    const { fetchingData, accounts, accountData, totalBanks, totalCurrentBalance, appwriteItemId, tokensRevalidation, banksForRevalidation } = useBankData(loggedIn, id);
    if (fetchingData) return <p>Loading bank data...</p>;


    return (
        <>
            <div className='home-content'>
                <header className='home-header'>
                    <HeaderBox
                        type="greeting"
                        title="Welcome"
                        user={loggedIn?.firstName || 'Guest'}
                        subtext="Accces and manage your account and transactions efficiently."
                    />

                    {
                        tokensRevalidation && banksForRevalidation && (
                            <RevalidationDIalog
                                banksForRevalidation={banksForRevalidation}
                            />
                        )
                    }

                    {
                        !tokensRevalidation && (
                            <TotalBalance
                                accounts={accounts}
                                totalBanks={totalBanks!}
                                totalCurrentBalance={totalCurrentBalance!}
                            />
                        )
                    }
                </header>

                {
                    !tokensRevalidation && (
                        <RecentTransactions
                            accounts={accounts}
                            transactions={accountData?.transactions}
                            appwriteItemId={appwriteItemId}
                            page={currentPage}
                        />
                    )
                }
            </div>
            {
                !tokensRevalidation && (
                    <RightSideBar
                        user={loggedIn}
                        transactions={accountData?.transactions || []}
                        banks={accounts?.slice(0, 2)}
                    />
                )
            }
        </>
    );
};

export default ClientBankData;
