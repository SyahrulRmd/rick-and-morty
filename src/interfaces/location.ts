import { Character } from "./character";

export interface Location {
  id: string;
  name: string;
}

export interface CharacterByLocation {
  location: string,
  characters: Array<Character>
} 
