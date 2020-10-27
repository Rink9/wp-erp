Feature('Upload plugin');

Scenario('Upload plugin', (I) => {
    I.amOnPage('/test4/wp-admin/');
	I.fillField('Username or Email Address','admin')
	I.fillField('Password','admin')
	I.checkOption('Remember Me')
	I.click('Log In')
    I.click('Plugins')
    pause();
    
   



});

