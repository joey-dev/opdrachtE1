$( document ).ready(function() {

    $( "#studentNameSearch" ).keyup(function() {
        var studentName = $("#studentNameSearch").val();

        if (studentName == '') {
            $("#searchStudentNameField").html("<p class='updateSelect'>Geen studenten gevonden</p>");
        } else {
            $.getJSON( "../../searchStudent/"+studentName, function( data ) {
                var output = "";
                $.each( data, function( key, value ) {
                    output += "<p class='updateSelect'><button class='btn btn-primary' type='button' onclick='addStudent2("+value[0].id+")'>"+value[0].name+"</button></p>";
                });
                if (output == "") {
                  $("#searchStudentNameField").html("<p class='updateSelect'>Geen studenten gevonden</p>");
                }
                else {
                  $("#searchStudentNameField").html(output);
                }
            });
        }

    });

    $( "#studentNameSearch2" ).keyup(function() {
        var studentName = $("#studentNameSearch2").val();

        if (studentName == '') {
            $("#searchStudentNameField").html("<p class='updateSelect'>Geen studenten gevonden</p>");
        } else {
            $.getJSON( "../searchStudent/"+studentName, function( data ) {
                var output = "";
                $.each( data, function( key, value ) {
                    output += "<p class='updateSelect'><button class='btn btn-primary' type='button' onclick='addStudent2("+value[0].id+", 2)'>"+value[0].name+"</button></p>";
                });
                if (output == "") {
                    $("#searchStudentNameField").html("<p class='updateSelect'>Geen studenten gevonden</p>");
                }
                else {
                    $("#searchStudentNameField").html(output);
                }
            });
        }

    });

});

var output;
var studentIds = [];

function addStudent2(id, create = 1)
{
    if (create == 2) {
        $.getJSON( "../searchStudentById/"+id, function( data ) {
            output = $("#selectedStudents").html();
            output += "<tr id='studentId"+data.id+"'><th scope='row'>1</th><td>";
            if (data.insertion == null) {
                output += data.name+" "+data.last_name+"</td><td><svg class='tableBtn delete' onclick='remove("+data.id+")' id='Layer_1' style='enable-background:new 0 0 512 512;' version='1.1' viewBox='0 0 512 512' xml:space='preserve' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><g><path d='M89.4,100l26.2,347.9c2.5,32.5,29.6,58.1,60.7,58.1h159.3c31.1,0,58.2-25.6,60.7-58.1L422.6,100H89.4z M190.1,460.8   c0.3,7.1-5.1,12.7-12,12.7s-12.7-5.7-13.1-12.7l-14.6-296.6c-0.5-9.6,5.7-17.4,13.8-17.4s14.9,7.8,15.3,17.4L190.1,460.8z    M268.5,460.8c0,7.1-5.7,12.7-12.5,12.7s-12.5-5.7-12.5-12.7l-2-296.6c-0.1-9.6,6.4-17.4,14.5-17.4c8.1,0,14.6,7.8,14.5,17.4   L268.5,460.8z M346.9,460.8c-0.3,7.1-6.2,12.7-13.1,12.7s-12.2-5.7-12-12.7l10.6-296.6c0.3-9.6,7.2-17.4,15.3-17.4   c8.1,0,14.3,7.8,13.8,17.4L346.9,460.8z'/><path d='M445.3,82.8H66.7v0c-1.8-21.1,10.7-38.4,27.9-38.4h322.9C434.6,44.4,447.1,61.8,445.3,82.8L445.3,82.8z' id='XMLID_2_'/><path d='M324.3,58.6H187.7l-0.2-7.8C186.7,26.3,202.1,6,221.9,6h68.3c19.7,0,35.1,20.3,34.4,44.7L324.3,58.6z' id='XMLID_1_'/></g></svg></td></tr>";
            } else {
                output += data.name+" "+data.insertion+" "+data.last_name+"</td><td><svg class='tableBtn delete' onclick='remove("+data.id+")' id='Layer_1' style='enable-background:new 0 0 512 512;' version='1.1' viewBox='0 0 512 512' xml:space='preserve' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><g><path d='M89.4,100l26.2,347.9c2.5,32.5,29.6,58.1,60.7,58.1h159.3c31.1,0,58.2-25.6,60.7-58.1L422.6,100H89.4z M190.1,460.8   c0.3,7.1-5.1,12.7-12,12.7s-12.7-5.7-13.1-12.7l-14.6-296.6c-0.5-9.6,5.7-17.4,13.8-17.4s14.9,7.8,15.3,17.4L190.1,460.8z    M268.5,460.8c0,7.1-5.7,12.7-12.5,12.7s-12.5-5.7-12.5-12.7l-2-296.6c-0.1-9.6,6.4-17.4,14.5-17.4c8.1,0,14.6,7.8,14.5,17.4   L268.5,460.8z M346.9,460.8c-0.3,7.1-6.2,12.7-13.1,12.7s-12.2-5.7-12-12.7l10.6-296.6c0.3-9.6,7.2-17.4,15.3-17.4   c8.1,0,14.3,7.8,13.8,17.4L346.9,460.8z'/><path d='M445.3,82.8H66.7v0c-1.8-21.1,10.7-38.4,27.9-38.4h322.9C434.6,44.4,447.1,61.8,445.3,82.8L445.3,82.8z' id='XMLID_2_'/><path d='M324.3,58.6H187.7l-0.2-7.8C186.7,26.3,202.1,6,221.9,6h68.3c19.7,0,35.1,20.3,34.4,44.7L324.3,58.6z' id='XMLID_1_'/></g></svg></td></tr>";
            }
            studentIds.push(data.id);

            var newStudentIds = JSON.stringify(studentIds);

            $("#selectedStudents").html(output);
            $("#studentIdsSelected").val(newStudentIds);
        });
    } else {
        $.getJSON( "../../searchStudentById/"+id, function( data ) {
            output = $("#selectedStudents").html();
            output += "<tr id='studentId"+data.id+"'><th scope='row'>1</th><td>";
            if (data.insertion == null) {
                output += data.name+" "+data.last_name+"</td><td><svg class='tableBtn delete' onclick='remove("+data.id+")' id='Layer_1' style='enable-background:new 0 0 512 512;' version='1.1' viewBox='0 0 512 512' xml:space='preserve' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><g><path d='M89.4,100l26.2,347.9c2.5,32.5,29.6,58.1,60.7,58.1h159.3c31.1,0,58.2-25.6,60.7-58.1L422.6,100H89.4z M190.1,460.8   c0.3,7.1-5.1,12.7-12,12.7s-12.7-5.7-13.1-12.7l-14.6-296.6c-0.5-9.6,5.7-17.4,13.8-17.4s14.9,7.8,15.3,17.4L190.1,460.8z    M268.5,460.8c0,7.1-5.7,12.7-12.5,12.7s-12.5-5.7-12.5-12.7l-2-296.6c-0.1-9.6,6.4-17.4,14.5-17.4c8.1,0,14.6,7.8,14.5,17.4   L268.5,460.8z M346.9,460.8c-0.3,7.1-6.2,12.7-13.1,12.7s-12.2-5.7-12-12.7l10.6-296.6c0.3-9.6,7.2-17.4,15.3-17.4   c8.1,0,14.3,7.8,13.8,17.4L346.9,460.8z'/><path d='M445.3,82.8H66.7v0c-1.8-21.1,10.7-38.4,27.9-38.4h322.9C434.6,44.4,447.1,61.8,445.3,82.8L445.3,82.8z' id='XMLID_2_'/><path d='M324.3,58.6H187.7l-0.2-7.8C186.7,26.3,202.1,6,221.9,6h68.3c19.7,0,35.1,20.3,34.4,44.7L324.3,58.6z' id='XMLID_1_'/></g></svg></td></tr>";
            } else {
                output += data.name+" "+data.insertion+" "+data.last_name+"</td><td><svg class='tableBtn delete' onclick='remove("+data.id+")' id='Layer_1' style='enable-background:new 0 0 512 512;' version='1.1' viewBox='0 0 512 512' xml:space='preserve' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><g><path d='M89.4,100l26.2,347.9c2.5,32.5,29.6,58.1,60.7,58.1h159.3c31.1,0,58.2-25.6,60.7-58.1L422.6,100H89.4z M190.1,460.8   c0.3,7.1-5.1,12.7-12,12.7s-12.7-5.7-13.1-12.7l-14.6-296.6c-0.5-9.6,5.7-17.4,13.8-17.4s14.9,7.8,15.3,17.4L190.1,460.8z    M268.5,460.8c0,7.1-5.7,12.7-12.5,12.7s-12.5-5.7-12.5-12.7l-2-296.6c-0.1-9.6,6.4-17.4,14.5-17.4c8.1,0,14.6,7.8,14.5,17.4   L268.5,460.8z M346.9,460.8c-0.3,7.1-6.2,12.7-13.1,12.7s-12.2-5.7-12-12.7l10.6-296.6c0.3-9.6,7.2-17.4,15.3-17.4   c8.1,0,14.3,7.8,13.8,17.4L346.9,460.8z'/><path d='M445.3,82.8H66.7v0c-1.8-21.1,10.7-38.4,27.9-38.4h322.9C434.6,44.4,447.1,61.8,445.3,82.8L445.3,82.8z' id='XMLID_2_'/><path d='M324.3,58.6H187.7l-0.2-7.8C186.7,26.3,202.1,6,221.9,6h68.3c19.7,0,35.1,20.3,34.4,44.7L324.3,58.6z' id='XMLID_1_'/></g></svg></td></tr>";
            }

            studentIds.push(data.id);

            var newStudentIds = JSON.stringify(studentIds);

            $("#selectedStudents").html(output);
            $("#studentIdsSelected").val(newStudentIds);
        });
    }
}

function remove(id)
{
    const index = studentIds.indexOf(id);
    studentIds.splice(index, 1);
    var newStudentIds = JSON.stringify(studentIds);
    $("#studentIdsSelected").val(newStudentIds);

    $("#studentId"+id).remove();
}
