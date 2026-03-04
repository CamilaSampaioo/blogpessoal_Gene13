import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tema } from './entities/tema.entity'; // Importa a entidade Tema
import { TemaService } from './services/tema.service'; // Importa o Service de Tema
import { TemaController } from './controllers/tema.controller'; // Importa o Controller de Tema

@Module({
  // O forFeature regista a entidade para que o TypeORM crie o repositório
  imports: [TypeOrmModule.forFeature([Tema])],
  // Define o Controller que vai receber as rotas HTTP (/temas)
  controllers: [TemaController],
  // Define o Service que contém a lógica de negócio
  providers: [TemaService],
  // Exportamos o TemaService para que outros módulos (como o PostagemModule) possam usá-lo
  exports: []
})
export class TemaModule {}