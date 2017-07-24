$( document ).ready(function() {
    
    $('select').material_select();
    $('.skuCheck').on('click',function() {
        var checked=false;
        var qtyInp=$(this).parent().siblings('.qtyInpParnt').children('.qtyInp');
        if( $(this).is(':checked')) {
            checked=true;
            qtyInp.removeAttr('disabled');
                var input=qtyInp;
                var is_name=input.val();
                if(is_name) {
                    input.removeClass("invalid").addClass("valid");
                } else {
                    input.removeClass("valid").addClass("invalid");
                }
            
        } else {
            if(hasValue(qtyInp)){
                emptyValue(qtyInp);
                // if(qtyInp.hasClass('error_show')) {
                //     console.log("qtyInp",qtyInp.attr('class'));
                //     qtyInp.css('d')                   
                // }
            }
            qtyInp.attr('disabled','disabled');
            if(qtyInp.hasClass('valid'))
                qtyInp.removeClass('valid');
            else if (qtyInp.hasClass('invalid')){
                qtyInp.removeClass('invalid');
                 console.log("qtyInp",qtyInp.siblings('span').attr('class'));
                 qtyInp.siblings('span').removeClass('error_show');
                 qtyInp.siblings('span').css('display','none');
            }
        }

    });
    $('input').on('input', function() {
        var input=$(this);
        var is_name=input.val();
        if(is_name){input.removeClass("invalid").addClass("valid");
        } else{
            input.removeClass("valid").addClass("invalid");
        }
    });
    //action after submit button click event
    $('#submitBtn').click (function(event){
        var form_data=$("#outletForm").serializeArray();
        var error_free=true;
        for (var input in form_data) {
            var element=$('.'+form_data[input]['name']);
            var valid=element.hasClass("valid");
            var error_element=$("span", element.parent());

            if (!valid) {
                 error_element.css('display','inline');
                error_element.removeClass("error").addClass("error_show"); 
                error_free=false;
            } else{
                 error_element.css('display','none');
                error_element.removeClass("error_show").addClass("error");
            }
        }
        if (!error_free){
            event.preventDefault(); 
        }
        else{

            alert('No errors: Form will be submitted');
        }
   
    });
            
    function hasValue(elem) {
        return $(elem).filter(function() { return $(this).val(); }).length > 0;
    }
    function emptyValue(elem) {
        return $(elem).filter(function() { return $(this).val('')});  
    }
  //Autocomplete
    $(function() {
        $.ajax({
            type: "GET",
            url: "outletss.csv",
            success: function(data) {
            var lines=csvJSON(data);
            $('input.autocomplete').autocomplete({   
              data: lines,
              limit: 5, // The max amount of results that can be shown at once. Default: Infinity.
            });
           }
         });
        function csvJSON(csv) {
            var lines=csv.split("\n");
            var objectArray=[];
            var object={};  
            for(var count = 0 ; count < lines.length -1 ; count ++){
            object[lines[count]]=null; 
            }
            return object;
        }
    });  
});
