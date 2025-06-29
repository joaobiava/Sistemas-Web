import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateMusics1750857160639 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'musics',
                columns: [
                    { name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'uuid_generate_v4()' },
                    { name: 'titulo', type: 'varchar' },
                    { name: 'duracao', type: 'int' },
                    { name: 'numero_faixa', type: 'int' },
                    { name: 'compositor', type: 'varchar' },
                    { name: 'letra', type: 'text', isNullable: true },
                    { name: 'album_id', type: 'uuid' },
                    { name: 'created_at', type: 'timestamp', default: 'now()' },
                    { name: 'updated_at', type: 'timestamp', default: 'now()' },
                    ],
                foreignKeys: [{
                    name: 'MusicasAlbum',
                    referencedTableName: 'albums',
                    referencedColumnNames: ['id'],
                    columnNames: ['album_id'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                }]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('musics');
    }

}
