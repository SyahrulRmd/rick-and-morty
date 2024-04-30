import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <header className='container py-4'>
      <ul className='flex gap-4 items-center'>
        <li>
          <Link href={'/'} className='font-semibold hover:opacity-80'>Home</Link>
        </li>
        <li>
          <Link href={'/locations'} className='font-semibold hover:opacity-80'>Locations</Link>
        </li>
      </ul>
    </header>
  )
}
