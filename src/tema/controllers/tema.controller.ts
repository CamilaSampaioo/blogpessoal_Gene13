import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { Tema } from "../entities/tema.entity"; // Certifica-te que o caminho da entidade está correto
import { TemaService } from "../services/tema.service"; // Certifica-te que o caminho do service está correto

@Controller("/temas") // 1. Rota base alterada para /temas
export class TemaController {

  constructor(
    private readonly temaService: TemaService // 2. Injeção do TemaService
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Tema[]> {
    return this.temaService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Tema> {
    return this.temaService.findById(id);
  }

  // Ajustei para 'descricao', que é comum em Temas, mas podes manter 'nome' ou 'titulo'
  @Get('/descricao/:descricao')
  @HttpCode(HttpStatus.OK)
  findAllByDescricao(@Param('descricao') descricao: string): Promise<Tema[]> {
    return this.temaService.findAllByDescricao(descricao);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() tema: Tema): Promise<Tema> {
    return this.temaService.create(tema);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() tema: Tema): Promise<Tema> {
    return this.temaService.update(tema);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.temaService.delete(id);
  }
}