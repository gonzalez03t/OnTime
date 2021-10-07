function encode(input) {
  var keyStr =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  var output = '';
  var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
  var i = 0;

  while (i < input.length) {
    chr1 = input[i++];
    chr2 = i < input.length ? input[i++] : Number.NaN; // Not sure if the index
    chr3 = i < input.length ? input[i++] : Number.NaN; // checks are needed here

    enc1 = chr1 >> 2;
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    enc4 = chr3 & 63;

    if (isNaN(chr2)) {
      enc3 = enc4 = 64;
    } else if (isNaN(chr3)) {
      enc4 = 64;
    }
    output +=
      keyStr.charAt(enc1) +
      keyStr.charAt(enc2) +
      keyStr.charAt(enc3) +
      keyStr.charAt(enc4);
  }
  return output;
}

function readImageFile(file) {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onabort = () => reject('file reading was aborted');
    reader.onerror = () => reject('file reading has failed');
    reader.onload = () => {
      // Do whatever you want with the file contents
      // console.log('in onload:', reader.result);
      resolve(reader.result);
    };

    reader.readAsArrayBuffer(file);
  });
}

const NSFW_CLASSNAMES = ['Hentai', 'Porn', 'Sexy'];

export async function classifyUploadedImage(imageRef, model) {
  if (imageRef && model) {
    const predictions = await model.classify(imageRef.current);

    if (!predictions) {
      return false;
    }

    if (!process.env.NODE_ENV !== 'production') {
      console.log('MODEL PREDICTIONS:', predictions);
    }

    for (const { className, probability } of predictions) {
      if (NSFW_CLASSNAMES.includes(className) && probability > 0.25) {
        return false;
      }
    }

    return true;
  } else {
    return false;
  }
}

export default async function getUploadedImageContents(file) {
  const fileContents = await readImageFile(file);
  return 'data:image/png;base64,' + encode(new Uint8Array(fileContents));
}
