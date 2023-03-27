const foreUpload = document.querySelector("#file-fore"),
  backUpload = document.querySelector("#file-back"),
  canvasFore = document.querySelector("#canvas"),
  canvasBack = document.querySelector("#canvas-grayed"),
  context = canvas.getContext("2d"),
  contextGray = canvasBack.getContext("2d"),
  clearBtn = document.querySelector(".clear"),
  mergeBtn = document.querySelector(".merge");

let imgFore = null;
let imgBack = null;

foreUpload.addEventListener("change", () => {
  if (!foreUpload.value == "") {
    let filename = "./resources/" + foreUpload.value.slice(12);
    imgFore = new SimpleImage(filename);
    imgFore.drawTo(canvasFore);
    foreUpload.value = "";
    clearBtn.classList.remove("disabled");
    if (imgFore && imgBack) {
      mergeBtn.classList.remove("disabled");
    }
  }
});
backUpload.addEventListener("change", () => {
  if (!backUpload.value == "") {
    let filename = "./resources/" + backUpload.value.slice(12);
    imgBack = new SimpleImage(filename);
    imgBack.drawTo(canvasBack);
    backUpload.value = "";
    clearBtn.classList.remove("disabled");
    if (imgFore && imgBack) {
      mergeBtn.classList.remove("disabled");
    }
  }
});

clearBtn.addEventListener("click", () => {
  if (imgFore) {
    context.clearRect(0, 0, imgFore.getWidth(), imgFore.getHeight());
    imgFore = null;
    clearBtn.classList.add("disabled");
    mergeBtn.classList.add("disabled");
  }
  if (imgBack) {
    contextGray.clearRect(0, 0, imgBack.getWidth(), imgBack.getHeight());
    imgBack = null;
    clearBtn.classList.add("disabled");
    mergeBtn.classList.add("disabled");
  }
});

mergeBtn.addEventListener("click", () => {
  if (imgFore && imgBack) {
    let imgOutput = new SimpleImage(imgFore.getWidth(), imgFore.getHeight());
    console.log("converting");
    for (let px of imgFore.values()) {
      let x = px.getX(),
        y = px.getY(),
        r = px.getRed(),
        g = px.getGreen(),
        b = px.getBlue(),
        pxBack = imgBack.getPixel(x, y);

      if (g > r + b && x <= imgBack.getWidth() && y <= imgBack.getHeight()) {
        imgOutput.setPixel(x, y, pxBack);
      } else {
        imgOutput.setPixel(x, y, px);
      }
    }
    imgOutput.drawTo(canvasBack);
    imgOutput.drawTo(canvasFore);
    mergeBtn.classList.add("disabled");
  }
});
