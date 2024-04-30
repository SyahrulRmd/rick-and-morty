'use client'

import { Character } from "@/interfaces/character";
import { GET_CHARACTER_BY_ID } from "@/lib/apollo/queries/character";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import { useParams } from "next/navigation"
import * as Dialog from '@radix-ui/react-dialog';
import { GET_LOCATIONS } from "@/lib/apollo/queries/location";
import { CharacterByLocation, Location } from "@/interfaces/location";
import { useState } from "react";

export default function CharacterDetail() {
  const { id } = useParams()
  const { loading: characterLoading, data: charactersByIds } = useQuery(GET_CHARACTER_BY_ID, {
    variables: {
      ids: id
    }
  });
  const { loading: locationLoading, data: locations } = useQuery(GET_LOCATIONS)

  const character = charactersByIds?.charactersByIds?.[0] as Character

  const [selectedLocation, setSelectedLocation] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const onAssignCharacter = () => {
    const characterByLocations = localStorage.getItem('character-by-locations')

    if (characterByLocations) {
      const parsed: Array<CharacterByLocation> = JSON.parse(characterByLocations)

      const cleaned = parsed.map(loc => {
        return {
          characters: loc.characters.filter(c => {
            return c.id !== character.id
          }),
          location: loc.location
        }
      })
      const cleaned2 = cleaned.filter(c => c.characters.length > 0)

      const locationIdx = cleaned2.findIndex(c => c.location === selectedLocation)

      if (locationIdx !== -1) {
        cleaned2[locationIdx].characters.push(character)
      } else {
        const newItem = {
          location: selectedLocation,
          characters: [character]
        }
        cleaned2.push(newItem)
      }

      localStorage.setItem('character-by-locations', JSON.stringify(cleaned2))
    } else {
      const newItem = [{
        location: selectedLocation,
        characters: [
          {
            ...character
          }
        ]
      }]
      localStorage.setItem('character-by-locations', JSON.stringify(newItem))
    };

    setIsOpen(false)
  }

  return (
    <div className="container mt-20">
      {characterLoading ? (
        <p>Loading...</p>
      ) : character && (
        <div>
          <Image
            src={character.image}
            alt={character.name}
            width={200}
            height={200}
            className="rounded-lg"
          />
          <h2 className="text-xl font-bold mt-4">{character.name}</h2>
          <p>
            <span className={`w-3 h-3 inline-block rounded-full ${character.status === 'Alive' ? 'bg-green-600' : 'bg-red-600'}`} />
            {' '}{character.status} - {character.species}
          </p>
          <div className="mt-4">
            <Dialog.Root onOpenChange={setIsOpen} open={isOpen}>
              <Dialog.Trigger asChild>
                <button
                  className="bg-gray-300 transition-all text-sm font-medium rounded-lg py-2 px-4 hover:bg-gray-200"
                >
                  Assign to a Location
                </button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="bg-black/60 data-[state=open]:animate-overlayShow fixed inset-0" />
                <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                  <Dialog.Title className="text-xl font-semibold mb-3">Select Location</Dialog.Title>
                  {locationLoading ? (
                    <p>Loading...</p>
                  ) : locations && (
                    <div>
                      <ul className="space-y-2">
                        {locations.locations.results.map((location: Location) => (
                          <li key={location.id} className="flex gap-2 items-center">
                            <input
                              type="radio"
                              id={location.id}
                              value={location.name}
                              checked={selectedLocation === location.name}
                              onChange={() => setSelectedLocation(location.name)}
                            />
                            <label htmlFor={location.id}>{location.name}</label>
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={onAssignCharacter}
                        className="bg-gray-300 transition-all text-sm font-medium rounded-lg py-2 px-4 hover:bg-gray-200 mt-4"
                      >
                        Assign
                      </button>
                    </div>
                  )}
                  <Dialog.Close />
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </div>
      )}
    </div>
  )
}
