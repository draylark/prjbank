import TotalBalance from '@/components/ui/TotalBalance'
import HeaderBox from '@/components/ui/HeaderBox'
import React from 'react'
import RightSideBar from '@/components/ui/RightSidebar'
import { getLoggedInUser } from '@/lib/server/appwrite'

const Home = async() => {
  const loggedIn = await getLoggedInUser();
  
  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
            <HeaderBox
              type="greeting"
              title="Welcome"
              user={loggedIn?.name || 'Guest'}
              subtext="Accces and manage your account and transactions efficiently."
            />

            <TotalBalance
              accounts={[]}
              totalBanks={1}
              totalCurrentBalance={1250.35} 
            />
        </header>

        RECENT TRANSACTIONS
      </div>

      <RightSideBar
        user={loggedIn}
        transactions={[]}
        banks={[{ currentBalance: 123.50 }, {currentBalance: 500 }]}
      />

    </section>
  )
}

export default Home