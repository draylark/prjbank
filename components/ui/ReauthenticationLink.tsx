import { useEffect } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { useRouter } from 'next/navigation';

function ReauthenticateLink({ linkToken }: { linkToken: string }) {

  const router = useRouter();

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: (public_token) => {
      router.refresh(); // Forzar la actualización de los datos en pantalla
    },
    onExit: (err) => {
      if (err) console.error('Error durante la reautenticación:', err);
    },
  });

  useEffect(() => {
    if (ready) {
      open();
    }
  }, [ready, open]);

  return null;
}

export default ReauthenticateLink;