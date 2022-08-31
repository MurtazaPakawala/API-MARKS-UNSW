import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

async function loginHelper(zid: string, password: string) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://webcms3.cse.unsw.edu.au/login');
  //   await page.screenshot({ path: 'amazing1.png' });
  await page.type('#zid', `${zid}`);
  await page.type('#password', `${password}`);
  await page.click('.well button');
  await page.waitForNavigation();
  //   await page.screenshot({ path: 'amazing2.png' });
  const url = await page.url();
  await browser.close();
  if (url === 'https://webcms3.cse.unsw.edu.au/login') {
    return false;
  } else {
    return true;
  }
}
@Injectable()
export class LoginService {
  //function for checking if user login

  async checkLogin(zid: string, password: string) {
    return await loginHelper(zid, password);
  }
}
