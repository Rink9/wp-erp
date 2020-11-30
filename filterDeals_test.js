Feature('filter new Deals & view report');

Scenario('filter new Deals & view report', (I) => {
    /*   Log in   */
    I.amOnPage('/test10/wp-admin/');
    I.fillField('Username or Email Address','admin')
    I.fillField('Password','admin')
    I.checkOption('Remember Me')
    I.click('Log In')
    I.click('WP ERP')
    /*   Filter   */
    I.click('CRM')
    I.amOnPage('/test10/wp-admin/admin.php?page=erp-crm&section=deals')
    I.click('New Deals')
    I.wait(6)
    I.scrollPageToBottom()
    I.click('Close')
    I.wait(4)
    I.scrollPageToTop()
    I.click('This month')
    I.wait(2)
    I.click('This week')
    I.click('Open Deals')
    I.wait(2)
    I.click('Open Deals')
    I.see('Open Deals')
    

});
