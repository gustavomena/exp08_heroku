CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    username varchar (255) UNIQUE NOT NULL,
    email varchar (255) UNIQUE NOT NULL,
    password varchar (255) NOT NULL,
    fecha_creacion timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    tipo varchar(50) NOT NULL
    );

CREATE TABLE tareas(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_id uuid NOT NULL,
    nombre varchar (255) NOT NULL,
    descripcion varchar (255) NOT NULL,
    fecha_creacion timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES users(id)
    );

    INSERT INTO users( username, email, password, tipo) VALUES ('Admin', 'admin@admin.com', 'admin', 'Admin');
    INSERT INTO users(username, email, password, tipo) VALUES ('Juan', 'juan@gmail.com', '123', 'User');

