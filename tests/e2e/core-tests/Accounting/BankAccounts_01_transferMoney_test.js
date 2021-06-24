Feature('Bank Accounts');

Scenario('Bank transfer money',({ I }) => {
	I.loginAsAdmin();
		I.click('WP ERP');
		I.click('Accounting');
		I.moveCursorTo('//*[@id="erp-accounting"]/div[1]/ul/li[5]/a');
		I.click('Bank Accounts')
    	I.click({ css : '.wperp-selected-option'});
    	I.click('Transfer Money');
    	I.wait(5);
    	I.click({ css : '.wperp-btn'});
    	I.click('//div[@id="transfer_funds_from"]//span[@class="multiselect__single"]');
    	I.wait(5);
    	I.click('//div[3]/ul/li/span');
    	I.click('//div[3]/ul/li/span');
    	I.click('//div[@id="transfer_funds_to"]//span[@class="multiselect__single"]');
    	I.click('//div[2]/div/div/div[3]/ul/li/span');
    	I.fillField('#transfer_amount', '100');
    	I.click('//div[2]/button');
});