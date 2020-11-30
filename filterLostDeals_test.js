Feature('filter Lost Deals and view report');

Scenario('filter Lost Deals and view report', (I) => {
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
     I.click('Won Deals')
     I.wait(3)
     I.scrollPageToBottom()
     I.wait(2)
     I.scrollPageToTop()
     I.wait(2)
     I.click('Close')
     I.wait(2)
     I.click('This month')
     I.click('This week')
     I.click('Open Deals')
     I.click("(//a[contains(@href, '#')])[39]")
     I.see('Lost Deals')

});
