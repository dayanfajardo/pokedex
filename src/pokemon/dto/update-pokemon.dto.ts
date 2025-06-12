import { PartialType } from '@nestjs/mapped-types';
import { CreatePokemonDto } from './create-pokemon.dto';

//UpdatePokemonDto va a tener todas las propiedades con las mismas condiciones
//de CreatePokemonDto con la unica condicion de que todas van a ser opcionales
export class UpdatePokemonDto extends PartialType(CreatePokemonDto) {}
