var fs = require("fs");
var Jimp = require("jimp");

function brightnessByColor(color) {
  var color = "" + color,
    isRGB = color.indexOf("rgb") == 0;
  if (isRGB) {
    var m = color.match(/(\d+){1}/g);
    if (m)
      var r = m[0],
        g = m[1],
        b = m[2];
  }
  if (typeof r != "undefined") return (r * 299 + g * 587 + b * 114) / 1000;
}

const Symbole = (i, k, image) => {
  var color = image.getPixelColor(i, k);
  var  rgba=Jimp.intToRGBA(color);


  if (brightnessByColor(`rgb(${rgba.r},${rgba.g},${rgba.b})`)>200) {
    return"."
  }else
  if (brightnessByColor(`rgb(${rgba.r},${rgba.g},${rgba.b})`)>150) {
    return","
  }else
  if (brightnessByColor(`rgb(${rgba.r},${rgba.g},${rgba.b})`)>100) {
    return"("
  }
  else
  if (brightnessByColor(`rgb(${rgba.r},${rgba.g},${rgba.b})`)>50) {
    return"?"
  }
  else{
    return"#"
  }
};

Jimp.read("./ranim.jpg")
  .then((image) => {
    var ch = "";
    var h =80;
    var w =150;
    image.resize(w, h);
    image.greyscale();
    image.write("lena-small-bw.jpg");
    for (i = 0; i < h+ 1; i++) {
      for (k = 0; k < w+ 1; k++) {
        ch += Symbole(k, i, image);
      }
      ch += "\n";
    }
    fs.writeFile("texr.txt", ch, function (err) {
      if (err) return console.log(err);
     console.log(ch); 
    });
  })

  .catch((err) => {
    console.log(err);
  });
