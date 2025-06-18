import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

import { Pokemon } from './entities/pokemon.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';


@Injectable()
export class PokemonService {

  private defaultLimit: number | undefined;

 constructor(
  @InjectModel( Pokemon.name )
   private readonly pokemonModel: Model<Pokemon>,
   private readonly configService: ConfigService,
  ) {
    this.defaultLimit = configService.get<number>('defaultLimit') ?? 10;

  }

    async create( pokemons: CreatePokemonDto[] ){
    try {
      await this.pokemonModel.insertMany( pokemons, { ordered: false } );
      return { message: 'Pokemons Inserted' }
    } catch (error) {
      this.handleExceptions(error);
    }
  }

    async createOne( createPokemonDto: CreatePokemonDto ){
      createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try {
      const pokemon = await this.pokemonModel.create( createPokemonDto );
      return pokemon;
    } catch (error) {
      this.handleExceptions(error);
    }
    
  }
  findAll( paginationDto: PaginationDto ) {

    const { limit = this.defaultLimit  ?? 10 , offset = 0 } = paginationDto;

    return this.pokemonModel.find()
    .limit( limit )
    .skip( offset )
    .sort({
      no: 1
    })
    .select('-__v')
  }

  //Es async porque tenemos que hacer conexion con nuestra base de datos
  //Con este metodo findOne verificamos: 1.Si es un no 2. Si es mongoId 3. O si es name
  async findOne(term: string) {
    
    let pokemon: Pokemon | null = null;

    if( !isNaN(+term) ){ //if term es un número → entra al if
      pokemon = await this.pokemonModel.findOne({ no: term })
    }

    // MongoID
    if ( !pokemon && isValidObjectId( term ) ) {
      pokemon = await this.pokemonModel.findById( term );
    } 

    //Name
    if( !pokemon ) {
      pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase().trim() })
    }

    if ( !pokemon ) 
      throw new NotFoundException(`Pokemon with, id name or no "${ term }" not found `);
    
    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {    

    const pokemon = await this.findOne( term );

    if ( updatePokemonDto.name ) 
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase() 

    try {
       await pokemon.updateOne(updatePokemonDto, { new: true });
       return { ...pokemon.toJSON(), ...updatePokemonDto }
    } catch (error) {
      this.handleExceptions( error )
    }   
}

  async remove(id: string) {
   
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });

    if ( deletedCount === 0 ) {
      throw new BadRequestException(`Pokemon with "${ id }" not found`);
    }

    return;

  }

  private handleExceptions( error: any ) {
        if (error.code === 11000) {
          throw new BadRequestException(
          `Pokemon already exists in db: ${JSON.stringify(error.keyValue)}`);
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't update Pokemon - Check server logs`);
  
  } 

}
