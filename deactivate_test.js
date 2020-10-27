Feature('Deactive plugin');

Scenario('Deactive plugin', (I) => {
    I.amOnPage('/test4/wp-admin/');
	I.fillField('Username or Email Address','admin')
	I.fillField('Password','admin')
	I.checkOption('Remember Me')
	I.click('Log In')
    I.click('Plugins')
    I.click('Deactivate WP ERP')
    I.click('Submit & Deactivate')
    pause();
    
   



});
