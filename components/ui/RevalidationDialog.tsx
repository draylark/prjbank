import { useState } from 'react';
import { Button } from './button';
import ReauthenticateLink from './ReauthenticationLink';
import { getLinkTokenForRevalidation } from '@/lib/actions/bank.actions';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const RevalidationDialog = ({ banksForRevalidation }: { banksForRevalidation: BankReval[] }) => {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [updatingBankId, setUpdatingBankId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Estado para controlar la apertura del Dialog

  const handleRevalidationClick = async (accessToken: string, bankId: string) => {
    try {
      setUpdatingBankId(bankId);
      const token = await getLinkTokenForRevalidation(accessToken);
      setLinkToken(token);
      setIsDialogOpen(false); // Indica que la revalidación ha comenzado
    } catch (error) {
      console.error('Error en la revalidación:', error);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className='plaidlink-primary'
          onClick={() => setIsDialogOpen(true)}>
          Reauthentication Needed
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-black-2">
        <DialogHeader>
          <DialogTitle className='text-white'>Re-authenticate your banks</DialogTitle>
          <DialogDescription className='text-white'>
            Its been a while, you need to reauthenticate your banks to access your accounts.
          </DialogDescription>
        </DialogHeader>
        <ul className='space-y-2'>
          {banksForRevalidation.map((bank) => (
            <li
              key={bank.bankId}
              className='border-2 border-black space-y-2 p-4 rounded-md'
            >
              <span className='text-white'>{bank.bankId}</span>
              <Button
                className='plaidlink-primary'
                onClick={() => handleRevalidationClick(bank.accessToken, bank.bankId)}
              >
                Reconnect Bank
              </Button>
              {linkToken && updatingBankId === bank.bankId && !isDialogOpen && (
                <ReauthenticateLink linkToken={linkToken} />
              )}
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
};

export default RevalidationDialog;