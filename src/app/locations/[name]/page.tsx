'use client'

import { CharacterByLocation } from '@/interfaces/location'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function LocationDetail() {
  const { name } = useParams()
  const [characterByLocation, setCharacterByLocation] = useState<CharacterByLocation>()

  useEffect(() => {
    const locations = localStorage.getItem('character-by-locations')
    if (locations) {
      const json: Array<CharacterByLocation> = JSON.parse(locations)
      const char = json.find(loc => loc.location === name)
      setCharacterByLocation(char)
    }
  }, [name])

  return (
    <div className='container mt-20'>
      <h1 className='font-bold text-2xl mb-4'>Location: {characterByLocation?.location}</h1>
      <div className='space-y-4'>
        {characterByLocation?.characters.map((char) => (
          <div key={char.id}>
            <Image
              src={char.image}
              alt={char.name}
              width={200}
              height={200}
              className="rounded-lg"
            />
            <h2 className="text-xl font-bold mt-4">{char.name}</h2>
            <p>
              <span className={`w-3 h-3 inline-block rounded-full ${char.status === 'Alive' ? 'bg-green-600' : 'bg-red-600'}`} />
              {' '}{char.status} - {char.species}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
