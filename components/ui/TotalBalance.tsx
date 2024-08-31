import { formatAmount } from '@/lib/utils'
import CountUp from '@/components/ui/CountUp'
import React from 'react'
import DoughnutChart from './DoughnutChart';

const TotalBalance = ({
    accounts = [], totalBanks, totalCurrentBalance
} : TotlaBalanceBoxProps 
) => {
  return (
    <section className='total-balance'>
        <div className='total-balance-chart'>
            <DoughnutChart accounts={accounts} />
        </div>

        <div className='flex flex-col  gap-6'>
            <h2 className='header-2'>
               Bank Accounts: {totalBanks} 
            </h2>
            <div className='flex flex-col gap-2'>
                <p className='total-balance-label'>Total Current Balance</p>
                <div className='total-balance-amount flex-center gap-2'>                 
                    <CountUp 
                        duration={2.75}
                        decimals={2}
                        end={totalCurrentBalance}
                        decimal=','
                        prefix='$'
                    />                                            
                </div>
            </div>
        </div>
    </section>
  )
}

export default TotalBalance