$("#signup").click(function() {
    $("#first").fadeOut("fast", function() {
    $("#second").fadeIn("fast");
    });
    });
    
    $("#signin").click(function() {
    $("#second").fadeOut("fast", function() {
    $("#first").fadeIn("fast");
    });
    });
    
    
      
             $(function() {
               $("form[name='login']").validate({
                 rules: {
                   
                   email: {
                     required: true,
                     email: true
                   },
                   password: {
                     required: true,
                     
                   }
                 },
                  messages: {
                   email: "Please enter a valid email address",
                  
                   password: {
                     required: "Please enter password",
                    
                   }
                   
                 },
                 submitHandler: function(form) {
                //    form.submit();
                   form.reset();

                //    form.submit(function(){
                //     location.href = 'index.html';
                //  })
                    
       
                 }
               });
             });

         
            //  auth.onAuthStateChanged(user => {
            //    if(user){
            //     $('#login-btn').click(function(){ window.open('index.html')});
            //    }else {
            //      console.log('not a user')
            //    }
            //  })
               
             


   //if user is true then go to index page otherwise show error message - needs to be done
   
          
             
    
    
    $(function() {
      
      $("form[name='registration']").validate({
        rules: {
          // firstname: "required",
          // lastname: "required",
          email: {
            required: true,
            email: true
          },
          password: {
            required: true,
            minlength: 5
          }
        },
        
        messages: {
          firstname: "Please enter your firstname",
          lastname: "Please enter your lastname",
          password: {
            required: "Please provide a password",
            minlength: "Your password must be at least 5 characters long"
          },
          email: "Please enter a valid email address"
        },
      
        submitHandler: function(form) {
          // form.submit();
        // form.close();

        form.reset();

        



        // form.location.href = 'index.html';
        //direct login page to the index.html page once log in is completed
        }
      });

    });



   
    