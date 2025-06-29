import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateAlbums1750791796313 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'albums',
                columns: [
                    {name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'uuid_generate_v4()'},
                    {name: 'nome', type: 'varchar'},
                    {name: 'artista', type: 'varchar'},
                    {name: 'ano_lancamento', type: 'date'},
                    {name: 'genero', type: 'varchar'},
                    {name: 'duracao_total', type: 'int'},
                    {name: 'created_at', type: 'timestamp', default: 'now()'},
                    {name: 'updated_at', type: 'timestamp', default: 'now()'},
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('albums');
    }

}
