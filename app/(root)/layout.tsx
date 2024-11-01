import MobileNav from "@/components/ui/MobileNav";
import SideBar from "@/components/ui/SideBar";
import { getLoggedInUser } from "@/lib/server/appwrite";
import Image from "next/image";
import { redirect } from "next/navigation";
import BaseContent from "@/components/BaseContent";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const loggedIn = await getLoggedInUser();

  if(!loggedIn) redirect('/sign-in')

  return (
    <main className="flex h-screen w-full font-inter">
        <SideBar user={loggedIn}/>

        <div className="flex size-full flex-col">
          <div className="root-layout">
            <Image     
              src="/icons/logo.svg"
              height={30}
              width={30}
              alt="menu icon"
            />
            <div>
              <MobileNav user={loggedIn}/>
            </div>
          </div>
        {/* Encapsula los children dentro de BaseContent para manejar la lógica de revalidación */}
        <BaseContent loggedIn={loggedIn}>
          {children}
        </BaseContent>   
        </div>
    </main>
  )
}
