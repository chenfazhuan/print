/* eslint-disable */
import print from './init';

import Browser from './browser';

const printInit = print.init;

let wePrint = null;

if (Browser.isEdge() || Browser.isIE()) {
  require.ensure([], () => {
    require('../pdf/index.js');
    const PDFPrint = res => {
      if (res.type === 'cloud') {
        window.showPdf(res.printData, dom => {
          printInit({
            ...res,
            htmlData: dom,
          });
        });
      } else {
        printInit({
          ...res,
        });
      }
    };
    window.wePrint = wePrint = PDFPrint;
  });
} else if (typeof window !== 'undefined') {
  window.wePrint = wePrint = printInit;
}

export default wePrint;
