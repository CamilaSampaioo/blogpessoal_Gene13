import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, Length } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Postagem } from "../../postagem/entities/postagem.entity";

@Entity({ name: "tb_temas" }) // Cria a tabela tb_temas no banco de dados
export class Tema {

    @PrimaryGeneratedColumn() // Chave primária auto-incrementada
    id: number;

    @Transform(({ value }: TransformFnParams) => value?.trim()) // Remove espaços inúteis
    @IsNotEmpty({ message: "A descrição não pode estar vazia" }) // Valida se o campo foi preenchido
    @Length(2, 255, { message: "A descrição deve ter entre 2 e 255 caracteres" }) // Define limites
    @Column({ length: 255, nullable: false }) // Configuração na base de dados: VARCHAR(255)
    descricao: string;

   @OneToMany( () => Postagem, (postagem) => postagem.tema)
   postagem: Postagem[]; // Array de retorno

}