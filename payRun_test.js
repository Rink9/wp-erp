Feature('payRun');

Scenario('payRun', (I) => {
    I.amOnPage('/test8/wp-admin/');
	I.fillField('Username or Email Address','admin')
	I.fillField('Password','admin')
	I.checkOption('Remember Me')
	I.click('Log In')
	I.click('WP ERP')
    I.click('HR')
    I.moveCursorTo('//*[@id="wpbody-content"]/div[2]/ul/li[4]/a')
    I.click('Pay Calendar')
    I.click('//*[@id="dashboard-widgets-wrap"]/div/div[2]/div[2]/span[2]')
    I.wait('5')
    I.fillField("//div[@id='pay-run-wrapper-employees']/div/div/input", "2020-01-01")
    I.fillField("//div[@id='pay-run-wrapper-employees']/div/div/input[2]", "2020-01-30")
    I.fillField("//div[@id='pay-run-wrapper-employees']/div/div[2]/input", "2020-02-01")
    I.click('//*[@id="pay-run-wrapper-employees"]/div[3]/button')
    I.click('//*[@id="pay-run-wrapper-variable-input-tab"]/div[2]/div[1]/div/div[1]/select')
    I.click('//*[@id="pay-run-wrapper-variable-input-tab"]/div[2]/div[1]/div/div[1]/select/option[1]')
    I.click('//*[@id="pay-run-wrapper-variable-input-tab"]/div[2]/div[1]/div/div[1]/select')
    I.click('//*[@id="pay-run-wrapper-variable-input-tab"]/div[2]/div[1]/div/div[1]/input[1]')
    I.type('2000')
    I.amOnPage('http://localhost/test8/wp-admin/admin.php?page=erp-hr&section=payroll&sub-section=payrun&tab=payslips&prid=12')
    I.amOnPage('http://localhost/test8/wp-admin/admin.php?page=erp-hr&section=payroll&sub-section=payrun&tab=approve&prid=12')
    I.click('Approve')
    I.wait('5')
    I.click('Confirm')
    
    
    


    



});
