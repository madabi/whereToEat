jQuery(document).ready(function(){
    $('#Who').hide();
    $('#What').hide(); 
    
    $('#where_button').on('click', function(){
        $('#What').hide();
        $('#Who').hide();
        $('#Where').show();
    })
    
    $('#what_button').on('click', function(){
        $('#Where').hide();
        $('#Who').hide();
        $('#What').show();
    })
        
    $('#who_button').on('click', function(){
        $('#What').hide();
        $('#Where').hide();
        $('#Who').show();
    })    
    
});

