const { Client } = require('pg');
const Router = require('express-promise-router');
var keys = require('../confi/keys')

const client = new Client({
  connectionString: keys.postgresurl,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

const router = new Router();
// export our router to be mounted by the parent application
module.exports = router;

router.post('/insertarpacientes', async (req, res) => {
  const { nombre, apellido, numid } = req.body;
  await client.query(
    `INSERT INTO pacientes(numid, nombre, apellidos) VALUES('${numid}','${nombre}','${apellido}')`
  );
  res.send('INSERTADO');
});

router.delete(`/borrarpacientes/:id`, async (req, res) => {
  console.log(req.body)
  await client.query(
    `DELETE FROM pacientes WHERE numid='${req.params.id}'`
  );
  res.send('ELIMINADO');
});

router.get(`/consultatotalpacientes/:id`, async (req, res) => {
  const { rows } = await client.query(
    `SELECT * FROM pacientes WHERE numid ='${req.params.id}'`
    )
  if (!rows){
    res.send('no se encontró a ',req.params.id,' en nuestra base de datos');
  } else {
    res.send(rows);
  }
});

router.put('/actualizarpacientes', async (req, res) => {
  const { nombre, apellido, numid } = req.body;
  await client.query(
    `UPDATE pacientes SET nombre='${nombre}',apellidos='${apellido}' WHERE numid ='${numid}';`
  );
  res.send('ACTUALIZADO');
});

