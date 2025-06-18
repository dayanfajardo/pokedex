import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports:[
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Pokemon.name, // name es del que extendimos del documento
        schema: PokemonSchema , // el schema es el que creamos -> PokemonSchema
      }
    ])
  ],
  exports:[PokemonService]
  
})
export class PokemonModule {}
