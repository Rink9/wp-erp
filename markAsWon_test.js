Feature('markAsWon');

Scenario('markAsWon', (I) => {
    /*   Log in   */
    I.amOnPage('/test10/wp-admin/');
    I.fillField('Username or Email Address','admin')
    I.fillField('Password','admin')
    I.checkOption('Remember Me')
    I.click('Log In')
    I.click('WP ERP')
    /*   Mark as Won Deals   */
    I.click('CRM')
    I.moveCursorTo('//*[@id="wpbody-content"]/div[2]/ul/li[4]/a')
    I.click('All Deals')
    I.click('wedevs deal')
    I.click('Won')
    I.amOnPage('http://localhost/test10/wp-admin/admin.php?page=erp-crm&section=deals')
    I.wait(3)
});
