exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        { id: 1, username: "@zegatus", name: "Onur", surname: "Şahal" },
        { id: 2, username: "@sevdetalks", name: "Sevde Nur", surname: "Aktaş" },
        {
          id: 3,
          username: "@cagdaserenk",
          name: "Çağdaş Eren",
          surname: "Kollez"
        }
      ]);
    });
};
