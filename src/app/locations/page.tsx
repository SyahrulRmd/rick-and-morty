'use client'

import { Character } from '@/interfaces/character'
import { CharacterByLocation } from '@/interfaces/location'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function Locations() {
  const [characterByLocations, setCharacterByLocations] = useState<Array<CharacterByLocation>>([])

  useEffect(() => {
    const locations = localStorage.getItem('character-by-locations')
    if (locations) {
      setCharacterByLocations(JSON.parse(locations))
    }
  }, [])

  return (
    <div className='container mt-20'>
      <h1 className='font-bold text-2xl mb-4'>Locations</h1>
      {characterByLocations.length === 0 ? (
        <p>Currently the location is empty.</p>
      ) : (
        <div>
          {characterByLocations.map((char) => (
            <div key={char.location}>
              <Link href={`/locations/${char.location}`} className='font-medium text-xl'>{char.location}</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
