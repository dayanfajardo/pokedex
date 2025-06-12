//Entity: Representacion de lo que nosotros vamos a estar grabando en la base de datos
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

//@Schema() esto es un esquema de bases de datos
@Schema()
//Al hacer extends Document, tu clase Pokemon va a tener todas las funcionalidades que un mongoose.Document tiene
export class Pokemon extends Document{
    //id: string //Mongo me lo da
    @Prop({
        unique:true, // va a ser unico el nombre
        index:true, // va a tener un indice unico
    })
    name: string;

    @Prop({
        unique:true,
        index:true,
    })
    no: number;

}

//Generamos el Schema de Mongoose a partir de la clase, para que Mongoose pueda usarlo para grabar y leer datos.
export const PokemonSchema = SchemaFactory.createForClass( Pokemon );