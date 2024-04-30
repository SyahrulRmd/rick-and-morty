'use client'

import { Character } from "@/interfaces/character";
import { GET_CHARACTERS } from "@/lib/apollo/queries/character";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { loading, data } = useQuery(GET_CHARACTERS);

  return (
    <div className="container">
      <section className="min-h-[50vh] mt-10 mb-10 grid h-full place-items-center bg-background bg-no-repeat bg-contain bg-center border-b border-gray-200">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-2">The Rick and Morty</h1>
          <p className="text-2xl">(Project Assignment)</p>
        </div>
      </section>
      <section className="mb-20">
        {loading ? (
          <p>Loading...</p>
        ) : data && (
          <div className="grid grid-cols-fluid gap-10">
            {data.characters.results.map((character: Character) => (
              <Link href={`/character/${character.id}`} key={character.id}>
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
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
