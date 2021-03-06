//toggle on and off checkbox
/*
    <div class="checkbox no-select">
        <i class="fa fa-square-o"></i> Keep me signed in
        <input type="checkbox" hidden="hidden" name="checkbox"/>
    </div>
*/
$('.checkbox').on('click', function() {
    var i_tag = $(this).find('i');
    var checkbox = $(this).find('input');

    if (i_tag.hasClass('fa-square-o')) {
        i_tag.removeClass('fa-square-o').addClass('fa-check-square-o');
        checkbox.prop("checked", true);
    } else {
        i_tag.removeClass('fa-check-square-o').addClass('fa-square-o');
        checkbox.prop("checked", false);
    }
});

//floating input placeholder
/*
    <div>
        <span class="animate">Password</span>
        <input type="text" name="text" />
    </div>
*/
$('.form div input').on('focusin focusout', function () {
    if ($(this).is(":focus")) {
        $(this).siblings('span').addClass('active-input-label');
    } else {
        if ($(this).val() == '') {
            $(this).siblings('span').removeClass('active-input-label');
        }

    }
});

//Canvas
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var radius = 2;
var dragging = false;

var putPoint = function(e) {
    if(dragging) {
        var xPos = e.clientX - canvas.getBoundingClientRect().left;
        var yPos = e.clientY - canvas.getBoundingClientRect().top;

        context.lineTo(xPos, yPos);
        context.stroke();
        context.beginPath();
        context.arc(xPos, yPos, radius, 0, Math.PI*2);
        context.fill();
        context.beginPath();
        context.moveTo(xPos, yPos);
    }
}

$('#canvas')
    .on('mousedown vmousedown', function(e) {
        dragging = true;
        putPoint(e);
})
    .on('mousemove vmousemove', function(e) {
        putPoint(e);
})
    .on('mouseup vmouseup', function() {
        dragging = false;
        context.beginPath();
});

//clear canvas
function resetCanvas() {
    canvas.width = $('#canvas').width();
    canvas.height = $('#canvas').height();
    context.lineWidth = radius*2;
    context.fillStyle = '#354b60';
    context.strokeStyle = '#354b60';
}
$('#canvas-opt-clear').on('click', function() {
    //if(confirm('Are you sure want to delete the drawing?')) {}
    resetCanvas();
});

//save canvas
/*
    <?php

    $data = $_POST['image'];
    $data = str_replace('data:image/png;base64,', '', $data);
    $data = str_replace(' ', '+', $data);

    $img = base64_decode($data);
    $path = '../images/' . uniqid() . '.png';
    if(file_put_contents($path, $img))
        echo $path;
    else {
        echo 'error';
    }


    //force browser to download
    #header('Content-type: image/png');
    #header('Content-disposition: attachment; filename=TheFileName.png');
    #readfile($_GET['url']);

    ?>
*/
$('#canvas-opt-save').on('click', function() {
    var canvas_data = canvas.toDataURL();

    console.log(canvas_data);
    
    /*
        $.ajax({
            method: 'post',
            url: "php/save_canvas.php",
            data: 'image='+canvas_data,
        }).success(function(feedback) {
            console.log(feedback);
        });
    */
});

//select color
$('#canvas-opt-color').on('click', function (e) {
    $('#color-input').click();
});
$('#color-input').on('change', function () {
    var c = $(this).val();
    $('#canvas-opt-color i.fa').css('color', c);
    context.fillStyle = c;
    context.strokeStyle = c;
});


//input preview
$('#file-prev, .input-file i').on('click', function () {
	$('#file-input').click();
});
//file reader
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#file-prev').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

$('#file-input').change(function(){
    readURL(this);
});


//Geolocation
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError, {enableHighAccuracy: true});
    } else {
        $('.input-location').html('<h3 class="text-center fullwidth marg-0">Geolocation is not supported by this browser.</h3>');
    }
}

function showPosition(position) {
    var latlon = position.coords.latitude + "," + position.coords.longitude;

    var img_url = "http://maps.googleapis.com/maps/api/staticmap?center="
    +latlon+"&zoom=16&size=350x250&sensor=false";
	
    $('.input-location div').append('<img src="'+img_url+'">');
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
			$('.input-location').html('<h3 class="text-center fullwidth marg-0">Please enable your location service from the settings.</h3>');
            break;
        case error.POSITION_UNAVAILABLE:
			$('.input-location').html('<h3 class="text-center fullwidth marg-0">Location information is unavailable.</h3>');
            break;
        case error.TIMEOUT:
			$('.input-location').html('<h3 class="text-center fullwidth marg-0">The request to get user location timed out.</h3>');
            break;
        case error.UNKNOWN_ERROR:
			$('.input-location').html('<h3 class="text-center fullwidth marg-0">An unknown error occurred.</h3>');
            break;
    }
}

//----------------------------------------------------
//----------------------------------------------------

$('.chat-opt').on('click', function () {
    var selected = $(this).data('chat-opt');
    var active = $('.chat-opt.active').data('chat-opt');
    
    //do nothing if input is already selected
    if(selected == active) return;
    
    //show and hide input
    $('.input-'+selected).removeClass('display-none');
    $('.input-'+active).addClass('display-none');
    
    //change input indicator
    $('.chat-opt.active').removeClass('active');
    $(this).addClass('active');
    
    switch (selected) {
        case 'text':
            console.log(selected);
            break;
        case 'canvas':
            resetCanvas();
            console.log(selected);
            break;
        case 'file':
            console.log(selected);
            break;
        case 'location':
            getLocation();
            showPosition(position);
            console.log(selected);
            break;
        case 'tap':
            console.log(selected);
            break;
        case 'camera':
            console.log(selected);
            break;
        case 'email':
            console.log(selected);
            break;
    }
    
    
});















