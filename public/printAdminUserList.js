const printAdminUserList = (data) => {
	let tableUsers = document.getElementsByTagName("tbody")[0];
	tableUsers.innerHTML = "";

	for (let i = 0; i < data.users.length; i++) {
		tableUsers.innerHTML += `
                <tr >
                    
                    <td data-bs-toggle="collapse"
                        data-bs-target="#${data.users[i].username}"
                        aria-expanded="true"
                        aria-controls="collapseOne">
                        ${data.users[i].id}
                    </td>
                    
                    <td data-bs-toggle="collapse"
                        data-bs-target="#${data.users[i].username}"
                        aria-expanded="true"
                        aria-controls="collapseOne">
                        ${data.users[i].username}
                    </td>
                    
                    <td data-bs-toggle="collapse"
                        data-bs-target="#${data.users[i].username}"
                        aria-expanded="true"
                        aria-controls="collapseOne">
                        ${data.users[i].email}
                    </td>
                    
                    <td data-bs-toggle="collapse"
                        data-bs-target="#${data.users[i].username}"
                        aria-expanded="true"
                        aria-controls="collapseOne">
                        ${data.users[i].password}
                    </td>
                    
                    <td data-bs-toggle="collapse"
                        data-bs-target="#${data.users[i].username}"
                        aria-expanded="true"
                        aria-controls="collapseOne">
                        ${data.users[i].tipo}
                    </td>
                    
                    <td data-bs-toggle="collapse"
                        data-bs-target="#${data.users[i].username}"
                        aria-expanded="true"
                        aria-controls="collapseOne">
                        ${formatDate(data.users[i].fecha_creacion)}
                    </td>
                    <td>
                        <a 
                            class="btn btn-success"
                            href="/create-task/?id=${data.users[i].id}"
                            >
                        Nueva Tarea
                        </a>
                        <a 
                            class="btn btn-danger" 
                            href="/delete-user/?id=${data.users[i].id}&username=${data.users[i].username}"
                            >
                        Eliminar
                        </a>
                    </td>
                </tr>
    
                <td colspan="12" class="hiddenRow"><div
                        id="${data.users[i].username}"
                        class="accordian-body collapse"
                    >
                        <table class="table text-white mb-0">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Descripción</th>
                                    <th scope="col">Fecha de Creación</th>
                                    <th scope="col">Editar</th>
                                </tr>
                            </thead>
                            <tbody id='${data.users[i].id}'>
                            </tbody>
                        </table>
            `;
	}
	return tableUsers;
};
