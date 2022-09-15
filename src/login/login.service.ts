import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

async function loginHelper(zid: string, password: string) {
  const browser = await puppeteer.launch({ headless: false });
  let ans = false;
  try {
    const page = await browser.newPage();
    await page.goto('https://webcms3.cse.unsw.edu.au/login');

    // await page.screenshot({ path: 'amazing1.png' });
    await page.type('#zid', `${zid}`);
    await page.type('#password', `${password}`);
    await page.click('.well button');
    await page.waitForNavigation();
    // await page.screenshot({ path: 'amazing2.png' });
    const url = await page.url();
    if (url === 'https://webcms3.cse.unsw.edu.au/login') {
      ans = false;
    } else {
      ans = true;
    }
    await browser.close();
    return ans;
  } catch (error) {
    console.log(error);
  } finally {
    await browser.close();
    return ans;
  }
}
@Injectable()
export class LoginService {
  //function for checking if user login

  async checkLogin(zid: string, password: string) {
    return loginHelper(zid, password);
  }
}
