import { When } from "@wdio/cucumber-framework";
import chai from "chai";
import reporter from "../../helper/reporter.js";
import nopcommerceHomePage from "../../page-objects/nopcommerce.home.page.js";

When(/^An as (.*) user login to nopcommerce site$/, async function(user){
if(!user) throw Error(`Given user: ${user} is not valid`);
user = user.trim().toUpperCase();
console.log(user);
try {
    reporter.addStep(this.testid, "info", "Login to nopcommerce demo site... ");
    await nopcommerceHomePage.loginTonopCommerceWeb(
        this.testid,
        //@ts-ignore
        browser.options.nopeCommerceBaseURL,
        process.env[`TEST_NOP_${user}_USERNAME`],
        process.env[`TEST_NOP_${user}_PASSWORD`]
    )
} catch (error) {
    error.message = `${this.testid}: Failed at nopcommerce login step, ${error.message}`;
    throw error
}
});

When(/^Search users in customer list$/, async function(){

});



//Please add `assert{type:"json"}; at the end when importing JSON
//eg. import contants from "../../data/constants.json" assert{type:"json"};