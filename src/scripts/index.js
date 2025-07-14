
function LoadDashboard(){
    if($.cookie('userid')){
        
        $.ajax({
        method: "get", 
        url:`../../public/pages/user_dashboard.html`,
        success: (response)=>{
             $("section").html(response);
             $("#lblUser").html($.cookie('userid'));
             $.ajax({
                 method:'get',
                 url: `http://127.0.0.1:4040/appointments/${$.cookie('userid')}`,
                 success: (appointments=>{
                     appointments.map(appointment=>{
                          $(`<div class="alert alert-success alert-dismissible">
                               <h2>${appointment.title}</h2>
                               <p> ${appointment.description} </p>
                               <div class="bi bi-calendar"> ${appointment.date.slice(0, appointment.date.indexOf("T"))}</div>
                               <div class="mt-3">
                                  <button class="bi bi-pen-fill btn btn-warning m-x2"></button>
                                  <button class="bi bi-trash btn btn-danger m-x2"></button>
                               </div>
                            </div>`).appendTo("#appointments");
                     })
                 })
             })
          }
        })

    } else {
        $.ajax({
        method: "get", 
        url:`../../public/pages/${page_name}`,
        success: (response)=>{
            $("section").html(response);
          }
        })
    }
}


function LoadPage(page_name){
    $.ajax({
        method: "get", 
        url:`../../public/pages/${page_name}`,
        success: (response)=>{
            $("section").html(response);
          }
        })
}

$(function(){
    LoadPage("home.html");

    //New User Button Click - on home
    $(document).on("click", "#btnNewUser",()=>{
        LoadPage("new_user.html");
    })

    // Signin Button Click - on home
    $(document).on("click", "#btnSignin",()=>{
        LoadPage("user_login.html");
    })

    $(document).on("click", "#btnExistingUser",()=>{
        LoadPage("user_login.html");
    })

    // Register Button Click - Post Data to Users

     $(document).on("click", "#btnRegister",()=>{

        var user = {
            user_id : $("#user_id").val(),
            user_name: $("#user_name").val(),
            password: $("#password").val(),
            mobile: $("#mobile").val()
        }

        $.ajax({
            method: "post",
            url: `http://127.0.0.1:4040/register-user`,
            data: user,
            success:()=>{
                alert('User Registered');
            }
        })
        LoadPage("user_login.html");
    })
    
    // Login Button - on login page

    $(document).on("click", "#btnLogin",()=>{

          var user_id = $("#user_id").val();

          $.ajax({
            method: 'get',
            url: `http://127.0.0.1:4040/users/${user_id}`,
            success: (userDetails)=>{
                 if(userDetails){
                     if($("#password").val()===userDetails.password){
                         $.cookie('userid', $("#user_id").val());
                         LoadDashboard();
                     } else {
                         alert('Invalid Password');
                     }
                 } else {
                     alert(`User Not Found`);
                 }
            }
          })

    })

    // Signout Logic

    $(document).on("click", "#btnSignout",()=>{
         $.removeCookie('userid');
         LoadPage('home.html');
    })
    // New Appointment
    $(document).on("click", "#btnNewAppointment",()=>{
         LoadPage('add_appointment.html');
    })

    $(document).on("click", "#btnCancel",()=>{
         LoadPage('user_dashboard.html');
    })

})