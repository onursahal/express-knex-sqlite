const getTableData = (req, res, db) => {
  db.from("users")
    .select("*")
    .then(items => {
      if (items.lenght) {
        res.json(items);
      } else {
        res.json({ dataExists: "false" });
      }
    })
    .catch(err => res.status(400).json({ dbError: "db error" }));
};

const postTableData = (req, res, db) => {
  const { name, surname, username } = req.body;
  const added = new Date();
  db("users")
    .insert({ username, name, surname })
    .then(item => {
      res.json(item);
    })
    .catch(err => res.status(400).json({ dbError: "db error" }));
};

const deleteTableData = (req, res, db) => {
  const { id } = req.body;

  db("users")
    .where({ id })
    .del()
    .then(() => {
      res.json({ delete: "true" });
    })
    .catch(err => res.status(400).json({ dbError: "db error" }));
};
module.exports = {
  getTableData,
  postTableData,
  deleteTableData
};
