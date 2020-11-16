Feature('addWonDeals');

Scenario('addWonDeals', (I) => {
    /*   Log in   */
    I.amOnPage('/test10/wp-admin/');
    I.fillField('Username or Email Address','admin')
    I.fillField('Password','admin')
    I.checkOption('Remember Me')
    I.click('Log In')
    I.click('WP ERP')
    /*   Adding new Deals   */
    I.click('CRM')
    I.moveCursorTo('//*[@id="wpbody-content"]/div[2]/ul/li[4]/a')
    I.click('All Deals')
    I.wait(2)
    I.click('Open deals')
    I.wait(2)
    I.click('Won deals')
    I.click('//*[@id="erp-deals"]/div/div[1]/div[1]/h1/a')
    I.wait(3)
    I.click('//*[@id="new-deal-modal-body"]/div[1]/div/div[2]/input')
    I.type('auto')
    I.wait(3)
    I.pressKey("ArrowDown")
    I.pressKey("Enter")
    I.wait(2)
    I.click('//*[@id="new-deal-modal-body"]/div[2]/div/div[2]/input')
    I.type('wedevs')
    I.wait(2)
    I.pressKey("ArrowDown")
    I.pressKey("Enter")
    I.wait(4)
    I.click('//*[@id="new-deal-modal-body"]/div[4]/input')
    I.type('2000')
    I.click('//*[@id="new-deal-modal-body"]/div[5]/div/ul/li[3]')
    I.click('Save')
    I.wait(2)
    I.click('OK')

});
