import { useEffect, useState } from "react";

const reqImage = (src: string) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function () {
      resolve(img);
    };
    img.onerror = img.onabort = function () {
      reject(src);
    };
    img.src = src;
  });
};

export default function usePrecacheImages(imageList: string[]) {
  const [precachedImages, setPrecachedImages] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const imagesPromiseArray: Promise<unknown>[] = [];

      for (const i of imageList) {
        imagesPromiseArray.push(reqImage(i));
      }

      await Promise.allSettled(imagesPromiseArray);

      setPrecachedImages(true);
    })();
  }, [imageList]);

  return precachedImages;
}
