const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const jwt = require("jsonwebtoken");
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// ! ---------------------CONFIG----------------------------
require("dotenv").config();
app.use(cookieParser());

const port = process.env.PORT || 3000;


app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

app.use("/public", express.static(__dirname + "/public"));


app.use(
	"/bootstrap",
	express.static(__dirname + "/node_modules/bootstrap/dist/css"),
);
app.use(
	"/BootstrapJs",
	express.static(__dirname + "/node_modules/bootstrap/dist/js/"),
);

app.set("view engine", "handlebars");

app.engine(
	"handlebars",
	exphbs.engine({
		layoutsDir: __dirname + "/views",
		partialsDir: __dirname + "/views/componentes/",
	}),
);

const {
	getUsers,
	getTareas,
	validateUser,
	createUser,
	createTask,
	deleteTask,
	deleteUser,
} = require("./DB/querys");


app.get("/", (req, res) => {
	res.render("LogIn", {
		layout: "LogIn",
	});
});

app.get("/Inicio", (req, res) => {
	const token = req.cookies.token;

	if (token) {
		const auth = validateToken(token);
		if (auth.user.tipo === "Admin") {
			res.render("Inicio", {
				layout: "Inicio",
				admin: true,
				username: auth.user.username,
			});
		} else if (auth.user.tipo === "User") {
			
			res.render("Inicio", {
				layout: "Inicio",
				user: true,
				id: auth.user.id,
				username: auth.user.username,
			});
		}
	} else {
		res.redirect("/");
	}
});

app.get("/create-user", (req, res) => {
	res.render("CreateUser", {
		layout: "CreateUser",
	});
});

app.get("/create-task", (req, res) => {
	const id = req.query.id;

	res.render("CreateTask", {
		layout: "CreateTask",
		username_id: id,
	});
});

app.get("/delete-task", (req, res) => {
	const {id, tarea} = req.query;
	res.render("DeleteTask", {
		layout: "DeleteTask",
		task_id: id,
		task_name: tarea,
		});
})

app.get("/delete-user", (req, res) => {
	const {id, username} = req.query;
	res.render("DeleteUser", {
		layout: "DeleteUser",
		user_id: id,
		username: username,
	});

})

app.get("/validate", async (req, res) => {
	const { username, password } = req.query;

	const user = await validateUser(username, password);

	if (user) {
		const token = jwt.sign({ user }, process.env.PRIVATE_KEY, {
			expiresIn: Math.floor(Date.now() / 1000) + 120,
		});

		res.cookie("token", token, {
			httpOnly: true,
			maxAge: 120000,
		});

		res.redirect(`/Inicio`);
	} else {
		res.redirect("/");
	}
});


app.get("/users", async (req, res) => {
	const users = await getUsers();
	res.end(JSON.stringify(users));
});

app.get("/tareas", async (req, res) => {
	const id = validateToken(req.cookies.token).user.id;
	const tareas = await getTareas(id);
	
	res.end(JSON.stringify(tareas));
});

app.post("/create-user", async (req, res) => {
	const { username, password, email, tipo } = req.body;
	
	const user = await createUser(username, password, email, tipo);
	res.end(JSON.stringify(user));
});

app.post("/create-task", async (req, res) => {
	const { username_id, nombreTarea, descripcionTarea } = req.body;
	const task = await createTask(username_id, nombreTarea, descripcionTarea);
	res.end(JSON.stringify(task));
});

app.delete("/delete-task", async (req, res) => {
	const id = req.query.id;
	await deleteTask(id);
	res.status(204);
	res.send("no-content");
})

app.delete("/delete-user", async (req, res) => {
	const id = req.query.id;
	await deleteUser(id);
	res.status(204);
	res.send("no-content");
})


const validateToken = (token) => {
	let key = token;
	const validate = jwt.verify(key, process.env.PRIVATE_KEY);
	return validate;
};
