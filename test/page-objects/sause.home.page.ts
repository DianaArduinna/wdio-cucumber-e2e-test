import Page from "./page.js";
import chai, { use } from "chai";
import reporter from "../helper/reporter.js";

class HomePage extends Page {
  constructor() {
    super();
  }

  /** Page Objects */
  get usernameInputBox() {
    return $(`#user-name`);
  }
  get passwordInputBox() {
    return $(`#password`);
  }
  get loginBtn() {
    return $(`#login-button`);
  }

  /** Page Actions */
  async enterUsername(testid: string, username: string) {
    if (!username) throw Error(`Given username: ${username} is not valid`);
    try {
      username = username.trim();
      await this.typeInto(await this.usernameInputBox, username);
      reporter.addStep(
        testid,
        "info",
        `Username: ${username} entered successfully`
      );
    } catch (error) {
      error.message = `Error entering username: ${username}, ${error.message}`;
      throw error;
    }
  }

  async enterPassword(testid: string, password: string) {
    if (!password) throw Error(`Given password is not valid`);
    try {
      password = password.trim();
      await this.typeInto(await this.passwordInputBox, password);
      reporter.addStep(testid, "info", `Password entered successfully`);
    } catch (error) {
      error.message = `Error entering password ${error.message}`;
      throw error;
    }
  }

  async clickLoginBtn(testid: string) {
    try {
      await this.click(await this.loginBtn);
      reporter.addStep(testid, "info", `Login button clicked`);
    } catch (error) {
      error.message = `Error clicking button ${error.message}`;
      throw error;
    }
  }

  async loginToSauseApp(testid: string, username: string, password: string){
    try {
        await this.enterUsername(testid, username);
        await this.enterPassword(testid, password);
        await this.clickLoginBtn(testid);
    } catch (error) {
        throw error;
    }
  }
}

export default new HomePage(); //When you export it you can export all the actions
