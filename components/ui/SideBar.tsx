'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'

const SideBar = ({ user }: SiderbarProps) => {

    const pathName = usePathname()
  return (
    <section className='sidebar'>

    <nav className='flex flex-col gap-4'>
        <Link 
            href='/' 
            className='flex mb-12 cursor-pointer items-center gap-2'
        >
            <Image 
                src="/icons/logo.svg"
                width={34}
                height={34}
                alt='PrJBank Logo'
                className='size-[24px] max-xl:size-14'
            />
            <h1 className='sidebar-logo'>PrJBank</h1>
        </Link>

        {sidebarLinks.map( link => {
            const isActive = pathName === link.route || pathName.startsWith(`${link.route}/`)
            return( 
                <Link 
                    href={link.route} 
                    key={link.label}
                    className={cn('sidebar-link', {
                        'bg-bank-gradient': isActive
                    })}
                >
                    <div className='relative size-6'>
                        <Image
                            src={link.imgURL}
                            alt={link.label}
                            fill
                            className={cn({
                                'brightness-[3] invert-0':
                                isActive
                            })}
                        />
                    </div>

                    <p className={cn('sidebar-label', {
                        '!text-white': isActive
                    })}>{link.label}</p>
                </Link>
            )
        })}


        USER
    </nav>
        FOOTER 
    </section>
  )
}

export default SideBar