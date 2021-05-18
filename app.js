$(function(){
    $('#tarea-result').hide();
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
            'description': $('#description').val()
        };
        $.post('task-add.php', postData, function(response){
            $('#form-tarea').trigger('reset');
        });
        e.preventDefault();
    });

    $.ajax({
        url: 'lista-tareas.php',
        type: 'GET',
        success: function(response){
            let tasks = JSON.parse(response);
            let template = '';
                console.log(tasks);
            tasks.forEach(task => {
                template += `
                <tr>
                    <td>${task.id}</td>
                    <td>${task.name}</td>
                    <td>${task.description}</td>
                    <td>${task.date}</td>
                </tr>
               `
            });
            $('#tareas').html(template);
        }
    });

});