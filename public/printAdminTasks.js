const printAdminTasks = (data) => {
	for (let i = 0; i < data.users.length; i++) {
		let tableTareas = document.getElementById(data.users[i].id);
		tableTareas.innerHTML = "";

        data.tareas.forEach(tarea => {
            if (tarea.usuario_id == data.users[i].id) {
                tableTareas.innerHTML += `
                <tr>
                    <td>${tarea.id}</td>
                    <td>${tarea.nombre}</td>
                    <td>${tarea.descripcion}</td>
                    <td>${formatDate(tarea.fecha_creacion)}</td>
                    <td>
                    <a 
                        class="btn btn-danger" 
                        href="/delete-task/?id=${tarea.id}&tarea=${tarea.nombre}"
                        >
                        Eliminar
                    </a>
                    </td>
                </tr>
                `;
            }
        })
	}
};
