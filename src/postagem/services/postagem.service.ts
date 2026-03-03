import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Postagem } from "../entities/postagem.entity";
import { DeleteResult, ILike, Repository } from "typeorm";

@Injectable()
export class PostagemService{

  constructor(
    @InjectRepository(Postagem)
    private postagemRepository: Repository<Postagem>,
  ){}

  async findAll(): Promise<Postagem[]>{
    // SELECT * FROM tb_postagens
    return this.postagemRepository.find();
  }

  async findById(id: number): Promise<Postagem>{
    //SELECT * FROM tb_postagens WERE id =?; o que o usario vai digitar
    const postagem = await this.postagemRepository.findOne({
      where:{
        id
      }
    })

    if (!postagem)
      throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);

    return postagem;
  }

  async findAllByTitulo(titulo: string): Promise<Postagem[]>{
    // SELEC * FROM tb_postagens WHERE titulo LIKE '%?%';
    return this.postagemRepository.find({
      where:{
        titulo: ILike(`%${titulo}%`)
      }
    })
  }

  async create(postagem: Postagem): Promise<Postagem>{
    // INSERT INTO tb_postagens (titulo, texto) VALLUES (?,?);
    return await this.postagemRepository.save(postagem);
  }

  async update(postagem: Postagem): Promise<Postagem>{

    if (!postagem.id || postagem.id <= 0)
      throw new HttpException("O ID da postagem é Inválido", HttpStatus.BAD_REQUEST);        // || = ou
    
    await this.findById(postagem.id);

    // INSERT INTO tb_postagens SET titulo = ?, texto =?, data = CURRENT_TIMESTAMP() WHERE id = ?;
    return await this.postagemRepository.save(postagem);
  }

  async delete(id: number): Promise<DeleteResult>{

    await this.findById(id);

    //DELETE tb_postagens FROM id = ?;
    return this.postagemRepository.delete(id);
  }
}