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
});