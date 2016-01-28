if(Meteor.isClient){    
    $('div[name="signInModal"]').modal({
        detachable : false,
        allowMultiple : false,
    });

    // Load
    Template.loginModal.rendered = function () {
        var errorRegex = /([Uu]ser|[Pp]assword)/;
        $(document)
            .on("submit", "form[name='loginFields']", function (event) {
                event.preventDefault();
            
                var user = $("input#username").val();
                var password = $("input#password").val();     

                switch($("div[name='loginSubmit']").data("method"))
                {
                    case 'login':
                        Meteor.loginWithPassword(user, password, function(error) {
                            if(!error) {
                                $("form[name='loginFields']").form('clear');
                                $('.modal[name="signInModal"]').modal('hide');
                                delete Session.keys['guestName'];
                                Session.set('userType','registered');
                            } else {
                                if(errorRegex.exec(error.reason)) {
                                    $("form[name='loginFields']").form('add errors',["Invalid username or password."]);
                                }else {
                                    $("form[name='loginFields']").form('add errors',[error.reason]);
                                }
                            }      
                        });
                        break;
                    case 'register':
                        var confirmation = $("input#confirm").val();
                        var firstname= $("input#first").val();
                        var lastname=$("input#last").val();
                        var displayname=$("input#display").val();
                        
                        if(confirmation == password) {
                            Accounts.createUser({email : user, 
                                                 password : password,
                                                 profile : {
                                                    name : {
                                                        first : (firstname!="") ? firstname : null,
                                                        last : (lastname!="") ? lastname : null,
                                                        display : (displayname!="") ? displayname : null,
                                                    },
                                                    contact : {
                                                        email : user,
                                                        phone : null,
                                                    },
                                                    settings : {
                                                        display : {
                                                            display : (displayname!=""),
                                                            first: (firstname!="" && displayname==""),
                                                            last: (lastname!="" && displayname==""),
                                                            email: false,
                                                            text: false    
                                                        },
                                                        contact : {
                                                            email : false,
                                                            text : false
                                                        }
                                                    }
                                                 }}, function(error){
                                if(!error) {
                                    $("form[name='loginFields']").form('clear');
                                    $('.modal[name="signInModal"]').modal('hide');
                                    delete Session.keys['guestName'];
                                    Session.set('userType','registered');
                                } else {
                                    if(errorRegex.exec(error.reason)) {
                                        $("form[name='loginFields']").form('add errors',["Invalid username or password."]);
                                    }else {
                                        $("form[name='loginFields']").form('add errors',[error.reason]);
                                    }
                                }
                            });
                        }
                        
                        break;
                }
            })
            .on("click", ".ui.cancel.button.signIn", function(){
                switch($(this).data("method")) {
                    case 'cancel':
                        $('.modal[name="signInModal"]').modal('hide');
                        break;
                    case 'register':
                        $('.registration_field').show();
                        $(this).data("method","login");
                        $("div.button[name='loginSubmit']").data("method","register");
                        $("div.button[name='loginSubmit']").html('<i class="add user icon"></i>Register');
                        $(this).html('<i class="sign in icon"></i>Login');
                        break;
                    case 'login':
                        $('.registration_field').hide();
                        $(this).data("method","register");
                        $("div.button[name='loginSubmit']").data("method","login");
                        $("div.button[name='loginSubmit']").html('<i class="sign in icon"></i>Login');
                        $(this).html('<i class="add user icon"></i>Register');
                        break;
                }
            })
            .on("click", ".ui.ok.button.signIn", function() {
                switch($(this).data("method")) {
                    case 'login' :                        
                        var formValidationRules = {
                            on:'blur',
                            fields : {
                                username : {
                                    identifier : 'username',
                                    rules : [
                                        {
                                            type:'email',
                                            prompt : 'Please enter a valid e-mail for your username'
                                        }
                                    ]
                                },
                            }
                        };
                        
                        var formSettings = {
                            onSuccess : function (event) {                                
                             
                            }
                        };
                        
                        $("form[name='loginFields']").form(formValidationRules, formSettings);
                        $("form[name='loginFields']").submit();

                        break;
                    case 'register' :
                        var formValidationRules = {
                            on:'blur',
                            fields : {
                                username : {
                                    identifier : 'username',
                                    rules : [
                                        {
                                            type:'email',
                                            prompt : 'Please enter a valid e-mail for your username'
                                        }
                                    ]
                                },
                                password : {
                                    identifier : 'password',
                                    rules : [
                                        {
                                            type : 'minLength[8]',
                                            prompt : 'Passwords must be at least 8 characters.'
                                        }
                                    ]
                                },
                                confirm : {
                                    identifier : 'confirm',
                                    rules : [
                                        {
                                            type : 'match[password]',
                                            prompt : 'Password and Confirmation do not match.'
                                        }
                                    ]
                                }
                            }
                        };
                        
                        var formSettings = {
                            onSuccess : function (event) {                                
                             
                            }
                        };
                        
                        $("form[name='loginFields']").form(formValidationRules, formSettings);
                        $("form[name='loginFields']").submit();
                        
                        break;
                };
            });
    };
    
    // Events
    Template.loginModal.events({
        'form submit' : function() {
            console.log('working');
        }
    });
    
    Template.navbar.events({
        'click [name="signIn"]' : function(event) {
            event.preventDefault();
            
            $('.modal[name="signInModal"]').modal({
                onDeny : function () {
                    return false;
                },
                onApprove : function () {
                    return false;
                },
                onShow : function () {
                    if($('div[name="loginSubmit"]').data('method')=='login')
                        $(".registration_field").hide();
                },
                onHidden : function () {
                    $(".registration_field").show();   
                }
            })
            .modal('show');
        }
    });
    
    // Helpers
    Template.loginModal.helpers({
        
    });
}