import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import fetch from 'node-fetch';
async function getMarksHelper(
  zid: string,
  password: string,
  code: number,
  term: string,
) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://webcms3.cse.unsw.edu.au/login');
    // await page.screenshot({ path: 'amazing1.png' });
    await page.type('#zid', `${zid}`);
    await page.type('#password', `${password}`);
    await page.click('.well button');
    await page.waitForNavigation();
    // await page.screenshot({ path: 'amazing2.png' });
    const url = await page.url();
    await page.goto(
      `https://webcms3.cse.unsw.edu.au/COMP${code}/${term}/users/grades`,
    );
    await page.waitForResponse(
      `https://webcms3.cse.unsw.edu.au/COMP${code}/${term}/users/api/sturec/z5405719`,
    );

    await page.setRequestInterception(true);
    let headers = {};
    page.on('request', (request) => {
      headers = request.headers();
    });
    let marks = {};
    // await page.screenshot({ path: 'amazing3.png' });

    const res = await fetch(
      `https://webcms3.cse.unsw.edu.au/COMP${code}/${term}/users/api/sturec/z5405719`,
      { headers: headers },
    );

    await browser.close();
    return res.text();
  } catch (error) {
    return false;
  }
}
@Injectable()
export class CoursesService {
  async getMarks(zid: string, password: string, code: number, term: string) {
    console.log(code);

    return await getMarksHelper(zid, password, code, term);
  }
}
