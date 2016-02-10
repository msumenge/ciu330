<?php
    function base_url($i) {
        $url = 'http://localhost/ciu330/';
        
        if(isset($i))
            $url .= $i;
        
        return $url;
    }

    $page = 0;
?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>CIU330</title>

    <!-- Bootstrap -->
    <link href="<?php echo base_url('css/bootstrap.min.css'); ?>" rel="stylesheet">

    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="<?php echo base_url('css/font-awesome.min.css'); ?>">
    
    <!-- jQuery -->
    <script src="<?php echo base_url('js/jquery-1.12.0.min.js'); ?>"></script>
    
    <!-- Site -->
    <link rel="stylesheet" href="<?php echo base_url('css/main.css'); ?>">
    <script src="<?php echo base_url('js/main.js'); ?>"></script> 
    
    <!--Favicon-->
    <link rel="icon" type="image/png" href="<?php echo base_url('images/icon.png'); ?>">
</head>
<body>
<?php if($page == 0) { ?>
    <h2 class="text-center">CIU330</h2>
    <div class="container">
        <div class="row">
            <div class="col-md-4 col-md-offset-4 form-container">
                <form class="form" method="post" action="">
                    <div class="marg-top-15">
                        <span class="animate">Username</span>
                        <input type="text" name="form-username" class="form-control fullwidth" required />
                    </div>
                    <div class="marg-top-40">
                        <span class="animate">Password</span>
                        <input type="password" name="form-password" class="form-control fullwidth" required />
                    </div>
                    <div class="checkbox no-select marg-top-25">
                        <i class="fa fa-square-o"></i> Keep me signed in
                        <input type="checkbox" hidden="hidden" name="form-auto-login"/>
                    </div>
                    
                    <button type="submit" class="btn action-btn fullwidth marg-top-15">Sign in</button>
                </form>
            </div>
        </div>
    </div>
    
    <script>
        $('.checkbox').on('click', function() {
            var i_tag = $(this).find('i');
            var checkbox = $(this).find('input');
            
            if(i_tag.hasClass('fa-square-o')) {
                i_tag.removeClass('fa-square-o').addClass('fa-check-square-o');
                checkbox.prop("checked", true);
            } else {
                i_tag.removeClass('fa-check-square-o').addClass('fa-square-o');
                checkbox.prop("checked", false);
            }
        });
        
        $('.form div input').on('focusin focusout', function() {
            if($(this).is(":focus")) {
                $(this).siblings('span').addClass('active-input-label');
            } else {
                if($(this).val() == '') {
                    $(this).siblings('span').removeClass('active-input-label');
                }
                
            }
        });
    </script>
<?php } else if($page == 1) { ?>

<?php } ?>
    
    <script src="<?php echo base_url('js/bootstrap.min.js'); ?>"></script>
    <script>

    </script>
</body>
</html>