console.log('js online');
btns = $('#HomeContent,#Students,#Courses');
// btns.parent().addClass("active");
// btns.parent().toggleClass("active");
//define a links in navbar
btns.click(function(e) {
    var container = $('#container').css('height', 0);
    var content;
    //set active class to proper tab
    $('[data-toggle=tab]').click(function() {
        if ($(this).parent().hasClass('active')) {
            $($(this).attr("href")).toggleClass('active');
        }
    });
    //prevent click behaviour or redirect
    e.preventDefault();
    //console.log('Link disabled');
    //assign id of clicked
    var thisId = $(this).attr('id');
    console.log(thisId);
    //stop previous anaimation if in progress
    if (container.is(':animated')) {
        console.log('animation in progress');
        container.stop();
    }
    container.animate({
        height: "600px"
    }, 1500, "linear");

    $.get(thisId + '.html', function(data) {
        container.html(data);
    }).done(function() {
        if (thisId == 'Courses') {
            var jsonCoursesArr;
            $.get("jsonmaker.php", {
                    name: "Courses"
                })
                .done(function(data) {
                    jsonCoursesArr = data;
                    showCourses(jsonCoursesArr);
                });
        }
        if (thisId == 'Students') {
            var jsonStudentsArr;
            $.get("jsonmaker.php", {
                    name: "Students"
                })
                .done(function(data) {
                    jsonStudentsArr = data;
                    showStudents(jsonStudentsArr);
                });
        }
    });

});

function showCourses(jsonCoursesArr) {
    container = $('#courseUl');
    for (let index = 0; index < jsonCoursesArr.length; index++) {
        container.append(
            $('<ol>').append(
                $('<img>', {
                    //image element settings
                    src: "http://aekoenig.rf.gd/public/../public/images/courses/" + jsonCoursesArr[index].id + ".jpg",
                    alt: 'course #' + jsonCoursesArr[index].id + 'image',
                }).addClass('courseImg img-responsive img-circle'),
                $('<p>').addClass('courseP').text(jsonCoursesArr[index].id + ': ' + jsonCoursesArr[index].name),
                $('<ul>').append(
                    $('<li>').append('<b>').text('Start date: ' + jsonCoursesArr[index].start_date + ' until: ' + jsonCoursesArr[index].end_date),
                    $('<li>').text(jsonCoursesArr[index].description).append($('<hr>'))
                )
            )
        );
    }
    return container;
}

function showStudents(jsonStudentsArr) {
    container = $('#studentsUl');
    for (let index = 0; index < jsonStudentsArr.length; index++) {
        container.append($('<ol>').append(
            $('<img>', {
                src: "http://aekoenig.rf.gd/public/../public/images/users/" + jsonStudentsArr[index].id + ".jpg",
                alt: 'course #' + jsonStudentsArr[index].id + 'image',
            }).addClass('courseImg img-responsive img-circle').css('border', '2px solid #e8e8e8'),
            $('<ul>').append(
                $('<li>').text(jsonStudentsArr[index].id + ': ' + jsonStudentsArr[index].name),
                $('<li>').text('Email : ' + jsonStudentsArr[index].email),
            )
        ));
    }
    return container;
}