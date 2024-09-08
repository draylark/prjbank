import HeaderBox from '@/components/ui/HeaderBox'
import PaymentTransferForm from '@/components/ui/PaymentTransferForm'
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/server/appwrite';
import React from 'react'

const Transfer = async() => {

  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({ userId: loggedIn.$id });
  if(!accounts) return null;

  const accountsData = accounts?.data;

  return (
    <section className='payment-transfer'>
      <HeaderBox
        title="Payment Transfer"
        subtext="Transfer your payment to your bank account"
      />


      <section className="size-full pt-5">
        <PaymentTransferForm
          accounts={accountsData}
        />
      </section>

    </section>
  )
}

export default Transfer