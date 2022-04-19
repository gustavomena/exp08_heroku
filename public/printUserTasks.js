const printUserTasks = (userId) => {
	let tableTareas = document.getElementsByTagName("tbody")[0];
	tableTareas.innerHTML = "";

	for (let i = 0; i < userId.length; i++) {
		tableTareas.innerHTML += `
        <tr>
        <td>${userId[i].id}</td>
        <td>${userId[i].nombre}</td>
        <td>${userId[i].descripcion}</td>
        <td>${formatDate(userId[i].fecha_creacion)}</td>
        <td>
			<a 
				class="btn btn-danger" 
				href="/delete-task/?id=${userId[i].id}&tarea=${userId[i].nombre}"
				>
				Eliminar
			</a>
		</td>
    </tr>
        `;
	}
};
