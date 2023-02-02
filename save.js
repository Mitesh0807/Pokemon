import fs from "fs";
import * as path from "node:path";
import { fetchData } from "./prompt.js";
import fetch from "node-fetch";

console.log(path.sep);
const createFolder = (folderName) => {
  const fsPromises = fs.promises;

  fsPromises
    .mkdir(`${folderName}`)
    .then(function () {
      // console.log('Directory created successfully');
    })
    .catch(function () {
    //   console.log("failed to create directory");
    });
};

// const userPokemon = await fetchData("mew");

const saveImageFile = async (filePath, arrayBuffer) => {
  fs.writeFile(filePath, Buffer.from(arrayBuffer), (err) => {
    if (err) console.log(err);
    else {
      // console.log("File written successfully\n");
    }
  });
};
//object.stats
const saveStat = async (foldername, arr) => {
  await createFolder(foldername);
  let str = "";
  for (const sta of arr) {
    str += `${sta.stat.name} : ${sta.base_stat}\n`;
  }
  console.log(str);
  const filePath = path.join(process.cwd(), foldername, "stats.txt");
  console.log(filePath);
  // await fs.writeFile(filePath, str);
  fs.writeFile(filePath, str, (err) => {
    if (err) console.log(err);
    else {
      console.log("File written successfully\n");
      //   console.log("The written has the following contents:");
      //   console.log(fs.readFileSync( filePath, "utf8"));
    }
  });
};
//object.sprites
const savePokemonSprites = async (foldername, pokemonSpritesObject) => {
  let spritePromises = [];
  let spriteNames = [];

  for (const [name, url] of Object.entries(pokemonSpritesObject)) {
    if (!url) continue;
    if (name === "other" || name === "versions") continue;
    spritePromises.push(fetch(url).then((res) => res.arrayBuffer()));
    spriteNames.push(name);
  }
  spritePromises = await Promise.all(spritePromises);
  await createFolder(foldername);
  for (let i = 0; i < spritePromises.length; i++) {
    const filePath = path.join(
      process.cwd(),
      foldername,
      `${spriteNames[i]}.png`
    );
    // console.log(filePath);
    // console.log(spritePromises[i]);
    await saveImageFile(filePath, spritePromises[i]);
    console.log(`Saved: ${filePath}`);
  }
};

const savePokemonArtwork = async (folderName, pokemonSpritesObject) => {
  const url = pokemonSpritesObject.other["official-artwork"].front_default;
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();

  await createFolder(folderName);
  const filePath = path.join(process.cwd(), folderName, "artwork.png");
//   console.log(filePath);
//   console.log(arrayBuffer);
  await saveImageFile(filePath, arrayBuffer);
};

// saveArtWork("test", userPokemon.sprites);

// async function userresponce() {limber
//     const userPokemon = await createFolder('testasync');
// }
// userresponce();

const parseOptions = async (pokemonObject, optionsObject) => {
    console.log(optionsObject.user_choice);
    const options = optionsObject.user_choice;
    console.log(options);
    const pokemonName = pokemonObject.name;
  
    if (options.includes("Stats")) {
      await saveStat(pokemonName, pokemonObject.stats);
    }
    if (options.includes("Sprites")) {
      await savePokemonSprites(pokemonName, pokemonObject.sprites);
    }
    if (options.includes("Art Work")) {
      await savePokemonArtwork(pokemonName, pokemonObject.sprites);
    }
  };
  
  export { parseOptions };

//   { user_choice: [ 'Stats', 'Art Work', 'Sprites' ] }