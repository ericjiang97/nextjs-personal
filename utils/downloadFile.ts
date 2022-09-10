/**
 * Downloads a file from the Prismic CDN that is publically available (without authenticaton)
 * @param url the url to download
 * @param fileName the name of the file to be named
 */
export const downloadFile = (url: string, fileName: string) => {
  return fetch(url, {
    method: "GET",
  })
    .then((response) => response.blob())
    .then((blob) => {
      var url = window.URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
      a.click();
      a.remove(); //afterwards we remove the element again
    });
};
