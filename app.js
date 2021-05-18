$(function(){
    let edit = false;
    $('#tarea-result').hide();
    verTareas();
    $('#buscar').keyup(function(){
        let search = $('#buscar').val();
        if($('#buscar').val()){
            $.ajax({
                url: 'buscar.php',
                data: {search},
                type: 'POST',
                success: function(response){
                    let tareas = JSON.parse(response);
                    let template = '';
                    tareas.forEach(task => {
                        template += `
                        <li><a href="#" class="task-item">${task.titulo}</a></li>
                       `
                    });
                    $('#container').html(template);
                    $('#tarea-result').show();
                }
            });
        }
        else{
            $('#tarea-result').hide();
        }
    });

    $('#form-tarea').submit(function(e){
        const postData = {
            'name': $('#name').val(),
            'description': $('#description').val(),
            'id' : $('#IdTarea').val()
        };
        let url = edit === false ? 'task-add.php' : 'edit.php';
        $.post(url, postData, function(response){
            verTareas();
            $('#form-tarea').trigger('reset');
            edit = false;
        });
        e.preventDefault();
    });

    function verTareas()
    {
        $.ajax({
            url: 'lista-tareas.php',
            type: 'GET',
            success: function(response){
                let tasks = JSON.parse(response);
                let template = '';
                tasks.forEach(task => {
                    template += `
                    <tr tareaid="${task.id}">
                        <td>${task.id}</td>
                        <td>${task.name}</td>
                        <td>${task.description}</td>
                        <td>${task.date}</td>
                        <td>
                            <buttom class="btn btn-danger btn-borrar" title="Borrar esta tarea">
                                <i class="fas fa-trash"></i>
                            </buttom>
                            <buttom class="btn btn-primary btn-editar" title="Editar esta tarea">
                                <i class="fas fa-pen"></i>
                            </buttom>
                            <buttom class="btn btn-secondary" title="Archivar">
                                <i class="fas fa-archive"></i>
                            </buttom>
                        </td>
                    </tr>
                   `
                });
                $('#tareas').html(template);
            }
        });
    }

    $(document).on('click', '.btn-borrar', function(){
        if(confirm('Estas seguro que quieres eliminar esta tarea')){
            let element = $(this)[0].parentElement.parentElement;
            let tareaId = $(element).attr('tareaid');
            $.post('borrar-tarea.php', {tareaId}, function(response){
                verTareas();
                console.log(response);
            });
        }
    });
    $(document).on('click', '.btn-editar', function(){
        let element = $(this)[0].parentElement.parentElement;
        let tareaId = $(element).attr('tareaid');
        $.post('editar-tarea.php', {tareaId}, function(response){
            verTareas();
            let tarea = JSON.parse(response);
            $('#name').val(tarea.nombre);
            $('#description').val(tarea.descripcion);
            $('#IdTarea').val(tarea.id);
            edit = true;
        });
    });
});