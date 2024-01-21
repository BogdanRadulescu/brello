import type { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {
    return await knex.schema.createTable('boards', (table: Knex.TableBuilder) => {
        table.increments();
        table.string('name');
        table.timestamps();
    });
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema.dropTable('boards');
}

