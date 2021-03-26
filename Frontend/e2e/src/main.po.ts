import { browser, by, element } from 'protractor';

export class MainPo {
  async navigateTo() {
    return browser.get('http://localhost:4200/uploadfile');
  }

  async inputFile(){
    var path = require('path');
    var fileToUpload = '../src/goedvoorbeeld2.txt',
      absolutePath = path.resolve(__dirname, fileToUpload);
    await element(by.id('input-file')).sendKeys(absolutePath);
  }

  async submitForm(){
    await element(by.id('input-upload')).click();
  }

  async getViewModel(){
    const viewmodel = await element.all(by.id('Viewmodel-aanwezig'));
    return viewmodel.length;
  }
}
