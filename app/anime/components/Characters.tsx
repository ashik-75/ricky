import Character from "./Character";
import { CharacterType } from "./character.types";

function Characters({ characters }: { characters: CharacterType[] }) {
  return (
    <div>
      <div className="grid grid-cols-4 gap-5">
        {characters.map((character) => (
          <Character key={character.id} {...character} />
        ))}
      </div>
    </div>
  );
}

export default Characters;
