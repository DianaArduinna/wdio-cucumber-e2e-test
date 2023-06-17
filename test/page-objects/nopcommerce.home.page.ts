import Page from "./page.js";
import chai, { use } from "chai";
import reporter from "../helper/reporter.js";

class HomePage extends Page {
  constructor() {
    super();
  }

  /** Page Objects */
  get usernameInputBox() {
    return $(`#Email`);
  }
  get passwordInputBox() {
    return $(`#Password`);
  }
  get loginBtn() {
    return $(`button=Log in`);
  }

  /** Page Actions */
  async loginTonopCommerceWeb(testid: string, url: string, username: string, password: string){
    if(!url || !username || !password){
      throw Error (`Given data, url: ${url}, username ${username} or password is not valid.`);
    }
    url = url.trim();
    username = username.trim();
    try {
      reporter.addStep(testid, "info", `Login to: ${url} with ${username}`);
      await this.navigateTo(url);
      await this.typeInto(await this.usernameInputBox, username);
      await this.typeInto(await this.passwordInputBox, password);
      await this.click(await this.loginBtn);
      reporter.addStep(testid, "info", `Login to: ${url} with ${username} is successful`);
    } catch (error) {
        error.message = `Failed login to nopcommerce web: ${url}, with username: ${username}`;
        throw error;
    }
  }
}

export default new HomePage(); //When you export it you can export all the actions
