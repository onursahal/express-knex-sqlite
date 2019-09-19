exports.up = function(knex) {
  return knex.schema.createTable("users", table => {
    table
      .increments("id")
      .primary()
      .unsigned();
    table
      .string("username")
      .unique()
      .index();
    table.string("name");
    table.string("surname");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
