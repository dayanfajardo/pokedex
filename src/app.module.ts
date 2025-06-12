import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';

import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';


@Module({
  imports: [
    //la palabra modulo siempre va en los imports
   ServeStaticModule.forRoot({
   rootPath: join(__dirname,'..','public'),
   }),

   //Referencia a nuestra base de datos( Conexion )
   MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'),

    PokemonModule,

    CommonModule
  ],
})
export class AppModule {}