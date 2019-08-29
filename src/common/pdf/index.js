import PDFJS from 'pdfjs-dist';

PDFJS.workerSrc = 'http://127.0.0.1:8081/js/1.js';

async function showPdf(base64) {
  if (!base64) {
    alert('出错了,无图片信息');
    return false;
  }
  const pdfList = document.querySelector('.pdfList');
  const fragment = document.createDocumentFragment(); // 生成一个空的documentFragment文档片段 //创建documentFragment储存canvas节点一次性渲染//通过querySelector选择DOM节点,使用document.getElementById()也一样

  const decodedBase64 = atob(base64); // 使用浏览器自带的方法解码
  const pdf = await PDFJS.getDocument({ data: decodedBase64 }); // 返回一个pdf对象
  const pages = pdf.numPages; // 声明一个pages变量等于当前pdf文件的页数
  for (let i = 1; i <= pages; i += 1) {
    // 循环页数
    const canvas = document.createElement('canvas');
    // eslint-disable-next-line no-await-in-loop
    const page = await pdf.getPage(i); // 调用getPage方法传入当前循环的页数,返回一个page对象
    const scale = 1; // 缩放倍数，1表示原始大小
    const viewport = page.getViewport(scale);
    const context = canvas.getContext('2d'); // 创建绘制canvas的对象
    canvas.height = viewport.height; // 定义canvas高和宽
    canvas.width = viewport.width;
    const renderContext = {
      canvasContext: context,
      viewport,
    };
    // eslint-disable-next-line no-await-in-loop
    await page.render(renderContext);
    canvas.className = 'canvas'; // 给canvas节点定义一个class名,这里我取名为canvas
    fragment.appendChild(canvas); // 添加canvas节点到fragment文档片段中
  }
  pdfList.appendChild(fragment); // 将fragment插入到pdfList节点的最后
}

// const testDom = document.getElementsByClassName('print-btn')[0];

// testDom.addEventListener('click', () => {
//   setTimeout(() => {
//     showPdf;(window.printURL);
//   }, 5000);
// });
window.showPdf = showPdf;
