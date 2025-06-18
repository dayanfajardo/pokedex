import { Injectable } from '@nestjs/common';

import { PokeResponse } from './interfaces/poke-response.interface';
import { PokemonService } from '../pokemon/pokemon.service';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';


@Injectable()
export class SeedService {

  //NestJS usa el constructor para inyectar dependencias (como PokemonService).  
  constructor(
    private readonly pokemonService: PokemonService,

    private readonly http: AxiosAdapter
  ) {}


  async executeSeed() {
    

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    const pokemonsToInsert = data.results.map(({ name,url }) =>{
        const segments = url.split('/')
        const no: number = +segments[ segments.length - 2 ]

        return { name, no }
    });

    await this.pokemonService.create(pokemonsToInsert);

    return 'seed executed'
  }

}
