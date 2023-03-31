/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTableIfNotExists("cat_image", (table) => {
    table.increments("id").primary();
    table.text("name").notNull();
    table.string("catImage").notNull();
    table.date("createdAt").notNull();
    table.date("updatedAt").nullable();
    table.date("deletedAt").nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("cat_image");
};
