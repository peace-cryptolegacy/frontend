const cfg = {};
 
//setup smtp server
cfg.smtp = {
    host: xxx,
    user: user,
    pass: pass,
    port: port
};
 
//setup email headers
cfg.email = {
    to: 'user@example.com',
    from: 'sender@example.com'
};
 
const Notify = require('app-notify');
const notify = new Notify(cfg);
 
//send an email
notify.email.send({
    subject: 'This is a test',
    message: 'Hello world!'
})
.then(function(data){
    console.log(data);
})
.catch(function(err){
    console.error(err);
});

module.exports = notify;