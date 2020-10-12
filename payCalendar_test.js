Feature('payCalendar');

Scenario('payCalendar', (I) => {
    I.amOnPage('/test7/wp-admin/');
	I.fillField('Username or Email Address','admin')
	I.fillField('Password','admin')
	I.checkOption('Remember Me')
	I.click('Log In')
	I.click('WP ERP')
    I.click('HR')
    I.moveCursorTo('//*[@id="wpbody-content"]/div[2]/ul/li[4]/a')
    I.click('Pay Calendar')
    I.click('Add New Pay Calendar')
    I.fillField("//input[@type='text']", "automation")
    I.click('//*[@id="dashboard-widgets-wrap"]/div/div[1]/div/div[2]/select')
    I.click('//*[@id="dashboard-widgets-wrap"]/div/div[1]/div/div[2]/select/option[2]')
    I.click('Add Employee')
    I.checkOption('QA')
    I.click('Add employee to list')
    I.wait('3')
    I.click('Create Pay Calendar')
    I.acceptPopup('OK')
    
    

    


    

    //I.click('//*[@id="myModal"]/div/div/div[3]/button')
    //I.click('Confirm')
   


    
    //I.fillField('Calendar Name','automation')

    


});
