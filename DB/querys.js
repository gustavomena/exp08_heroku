require("dotenv").config();

const { Pool } = require("pg");
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false,
	},
});

const getUsers = async () => {
	const consultaUsers = "SELECT * FROM users";
	const consultaTareas = "SELECT * FROM tareas";

		const resultadoUsers = await pool.query(consultaUsers);
		const resultadoTareas = await pool.query(consultaTareas);
		return { users: resultadoUsers.rows, tareas: resultadoTareas.rows };

};

const getTareas = async (id) => {
	const consultaTareas = "SELECT * FROM tareas WHERE usuario_id = $1";

		const resultadoTareas = await pool.query(consultaTareas, [id]);
		return resultadoTareas.rows;

};

const createUser = async (username, password, email, tipo) => {
	const consultaUsers =
		"INSERT INTO users (username, password, email, tipo) VALUES ($1, $2, $3, $4) RETURNING *";
	
		const resultadoUsers = await pool.query(consultaUsers, [
			username,
			password,
			email,
			tipo,
		]);

		return {
			id: resultadoUsers.rows[0].id,
			username: resultadoUsers.rows[0].username,
			password: resultadoUsers.rows[0].password,
			tipo: resultadoUsers.rows[0].tipo,
		};
	
};

const createTask = async (usuario_id, nombre, descripcion) => {
	const nuevaTarea =
		"INSERT INTO tareas (usuario_id, nombre, descripcion) VALUES ($1, $2, $3) RETURNING *";

		const resultadoTarea = await pool.query(nuevaTarea, [
			usuario_id,
			nombre,
			descripcion,
		]);
		return {
			id: resultadoTarea.rows[0].id,
			usuario_id: resultadoTarea.rows[0].usuario_id,
			nombre: resultadoTarea.rows[0].nombre,
			descripcion: resultadoTarea.rows[0].descripcion,
		};
	
};

const deleteTask = async (id) => {
	const consultaTareas = "DELETE FROM tareas WHERE id = $1";

		const resultadoTareas = await pool.query(consultaTareas, [id]);
		return resultadoTareas.rows;
	
};

const deleteUser = async (id) => {
	const deleteTasks = "DELETE FROM tareas WHERE usuario_id = $1";
	const deleteUser = "DELETE FROM users WHERE id = $1";


		await pool.query("BEGIN");
		await pool.query(deleteTasks, [id]);
		await pool.query(deleteUser, [id]);
		await pool.query("COMMIT");
	
};

const validateUser = async (username, password) => {
	const consultaUsers =
		"SELECT * FROM users WHERE username = $1 AND password = $2";

		const resultadoUsers = await pool.query(consultaUsers, [
			username,
			password,
		]);

		return {
			id: resultadoUsers.rows[0].id,
			username: resultadoUsers.rows[0].username,
			password: resultadoUsers.rows[0].password,
			tipo: resultadoUsers.rows[0].tipo,
		};
	
};

module.exports = {
	getUsers,
	getTareas,
	validateUser,
	createUser,
	createTask,
	deleteTask,
	deleteUser,
};
