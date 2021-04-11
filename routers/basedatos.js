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

router.post('/borrarpacientes', async (req, res) => {
  const { numid } = req.body.id;
  await client.query(
    `DELETE FROM pacientes WHERE numid=${numid}`
  );
  res.send('ELIMINADO');
});

router.post('/consultatotalpacientes', async (req, res) => {
  const { id } = req.body
  const { rows } = await client.query(
    `SELECT * FROM pacientes WHERE numid =${id}`
    )
  if (rows == NULL){
    res.send('no se encontró a ',id,' en nuestra base de datos');
  } else {
    res.send(rows);
  }
});

router.post('/actualizarpacientes', async (req, res) => {
  const { nombre, apellido, numid } = req.body;
  await client.query(
    `UPDATE pacientes SET numid='${numid}',nombre='${nombre}',apellidos='${apellido}') WHERE numid =${numid}`
  );
  res.send('ACTUALIZADO');
});

