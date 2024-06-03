const Repository = require('./repository');

const repo = new Repository();

async function test() {
  try {
   
    await repo.createHero({ name: 'Wolfverine', level: 'Junior' });

   
    let heroes = await repo.readHeroes();
    console.log('Heroes after creation:', heroes);

   
    await repo.updateHero('Wolfverine', { name: 'Wolfverine', level: 'Middle' });

   
    heroes = await repo.readHeroes();
    console.log('Heroes after update:', heroes);

    
    await repo.deleteHero('Wolfverine');

 
    heroes = await repo.readHeroes();
    console.log('Heroes after deletion:', heroes);
  } catch (error) {
    console.error('Error:', error);
  }
}

test();
