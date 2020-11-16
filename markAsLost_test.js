Feature('MarkAsLost');

Scenario('MarkAsLost', (I) => {
    /*   Log in   */
    I.amOnPage('/test10/wp-admin/');
    I.fillField('Username or Email Address','admin')
    I.fillField('Password','admin')
    I.checkOption('Remember Me')
    I.click('Log In')
    I.click('WP ERP')
    /*   Mark as Lost Deals   */
    I.click('CRM')
    I.moveCursorTo('//*[@id="wpbody-content"]/div[2]/ul/li[4]/a')
    I.click('All Deals')
    I.click('wedevs deal')
    I.click('Lost')
    //I.amOnPage('http://localhost/test10/wp-admin/admin.php?page=erp-crm&section=deals')
    I.wait(2)
    I.click('//*[@id="lost-reason-modal-body"]/div[1]/div/div[2]/span')
    I.pressKey("ArrowDown")
    I.pressKey("ArrowDown")
    I.pressKey("Enter")
    I.wait(2)
    I.click('//*[@id="lost-reason-modal-body"]/div[2]/input')
    I.type('test purpose')
    I.click('Mark as Lost')


});
