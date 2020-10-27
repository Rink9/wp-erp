Feature('Accounting Activation & Deactivation');

Scenario('Accounting Module and extension activation/deactivation', (I) => {
    /*   Log in   */
    I.amOnPage('/test5/wp-admin/');
	I.fillField('Username or Email Address','admin')
	I.fillField('Password','admin')
	I.checkOption('Remember Me')
    I.click('Log In')
    I.click('WP ERP')
    I.click('Modules')
    /*   Activate    */
    I.click("//div[@id='wpbody-content']/div[2]/div/div[2]/div/div[3]/div/div[2]/label/span")
    I.click('Accounting')
    I.wait(3)
    I.click("//input[@value='inventory']")
    I.checkOption('Select All')
    I.click('Activate')
    I.click('#close_table_nav_btn')
    /*   Deactivate   */ 
    I.click("//div[@id='wpbody-content']/div[2]/div/div[2]/div/div[3]/div/div[2]/label/span")
    I.wait(4)
    I.click('Accounting')
    I.click("//input[@value='inventory']")
    I.checkOption('Select All')
    I.click('Deactivate')
    I.click('#close_table_nav_btn')
    
    
    
    
   



});


