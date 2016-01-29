if(Meteor.isClient){
    Template.settingsChoice.events({
        'click .item' : function(event) {
            event.preventDefault();   
            $('.settingsChoice > .item').removeClass('active');
            $(event.target).addClass('active');
            
            var group = $(event.target).data('tab');
            console.log(group);
            $('.settings').removeClass('active');
            $('.settings[data-tab="'+group+'"]').addClass('active');
        }
        
    });
    
    Template.displayNameSettings.helpers({
        'displayNameValue' : function () {
            return (Meteor.user().profile.name.display) || "";   
        },
        'firstNameValue' : function () {
            return (Meteor.user().profile.name.first) || "";   
        },
        'lastNameValue' : function () {
            return (Meteor.user().profile.name.last) || "";   
        },
        'showDisplay' : function () {
            return (Meteor.user().profile.settings.display.display) ? 
                'checked' : '';
        },
        'showLast' : function () {
            return (Meteor.user().profile.settings.display.last) ? 
                'checked' : '';        
        },
        'showFirst' : function () {
            return (Meteor.user().profile.settings.display.first) ? 
                'checked' : '';        
        }
    });
    
    Template.contactSettings.helpers({
        'allowSMS' : function () {
            return (Meteor.user().profile.settings.contact.text) ? 
                'checked' : '';
        },
        'allowEmail' : function () {
            return (Meteor.user().profile.settings.contact.email) ? 
                'checked' : '';
        },
        'smsValue' : function () {
            return Meteor.user().profile.contact.phone || "";
        },
        'emailValue' : function () {
            return Meteor.user().profile.contact.email || "";   
        }
    });
    
    Template.displayNameSettings.events ({
        'click input[name="showDisplay"]' : function () {
            $('input[name="showFirst"]').prop('checked', false);
            $('input[name="showLast"]').prop('checked', false);
        },
        'click input[name="showFirst"]' : function () {
            $('input[name="showDisplay"]').prop('checked', false);
        },
        'click input[name="showLast"]' : function () {
            $('input[name="showDisplay"]').prop('checked', false);
        },
        'click .save' : function () {
            var profile = Meteor.user().profile;
            var show = {
                first : $('input[name="showFirst"]').prop('checked'),
                last : $('input[name="showLast"]').prop('checked'),
                display : $('input[name="showDisplay"]').prop('checked'),
                email : profile.settings.display.email,
                phone : profile.settings.display.phone
            };
            var values = {
                first : $('input[name="firstName"]').val(),
                last : $('input[name="lastName"]').val(),
                display : $('input[name="displayName"]').val()
            };
            
            Meteor.users.update(Meteor.userId(), {$set: {"profile.name" : values,
                                                         "profile.settings.display" : show}});
        },
        'click .reset' : function () {
            console.log('reset');
        }
    });
    
    Template.contactSettings.events({
        'click .save' : function () {
            var profile = Meteor.user().profile;
            var allow = {
                text : $('input[name="allowSMS"]').prop('checked'),
                email : $('input[name="allowEmail"]').prop('checked')
            }
            
            var contact = {
                phone : $('input[name="sms"]').val(),
                email : $('input[name="email"]').val()
            }
            
            Meteor.users.update(Meteor.userId(), {$set : {"profile.contact" : contact,
                                                          "profile.settings.contact" : allow}});
        },
        'click .reset' : function () {
            
        }
    });
    
    Template.accountSettings.events({
        'click .save' : function () {
            var oldPassword = $('input[name="currentPassword"]').val();
            var newPassword = $('input[name="newPassword"]').val();
            var confirmPassword = $('input[name="confirmPassword"]').val();
            
            if(newPassword == confirmPassword) {
                Accounts.changePassword(oldPassword, newPassword, function (error, result){
                    console.log(result);   
                });   
            }
        },
        'click .reset' : function () {
            
        }
    });
}