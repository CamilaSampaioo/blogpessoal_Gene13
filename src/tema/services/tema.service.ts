import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Tema } from "../entities/tema.entity"; // Importa a nova entidade

@Injectable()
export class TemaService {

  constructor(
    @InjectRepository(Tema)
    private temaRepository: Repository<Tema>, // Injeta o repositório de Tema
  ) {}

 async findAll(): Promise<Tema[]> {
        return this.temaRepository.find({
            relations:{
                postagem: true
            }
        });
    }

  async findById(id: number): Promise<Tema> {
        const tema = await this.temaRepository.findOne({
            where: {
                id,
            },
            relations:{
                postagem: true
            }
        });

    if (!tema)
      throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND);

    return tema;
  }

  async findAllByDescricao(descricao: string): Promise<Tema[]> {
        return this.temaRepository.find({
            where: {
                descricao: ILike(`%${descricao}%`),
            },
            relations:{
                postagem: true
            }
        });
    }

  async create(tema: Tema): Promise<Tema> {
    // INSERT INTO tb_temas (descricao) VALUES (?);
    return await this.temaRepository.save(tema);
  }

  async update(tema: Tema): Promise<Tema> {
    // Verifica se o ID é válido antes de atualizar
    if (!tema.id || tema.id <= 0)
      throw new HttpException("O ID do tema é inválido!", HttpStatus.BAD_REQUEST);
    
    // Verifica se o tema existe no banco antes de tentar salvar
    await this.findById(tema.id);

    // O save() do TypeORM faz o UPDATE se o ID já existir
    return await this.temaRepository.save(tema);
  }

  async delete(id: number): Promise<DeleteResult> {
    // Verifica se o tema existe antes de apagar
    await this.findById(id);

    // DELETE FROM tb_temas WHERE id = ?;
    return this.temaRepository.delete(id);
  }
}