export const checkMultipleAccountIssue = () => {
  const owner = Session.getEffectiveUser().getEmail();
  return owner;
};

export const addImageSlide = (img: string) => {
  const blobImg = Utilities.newBlob(
    Utilities.base64Decode(img),
    'image/png',
    'Your Generated Background'
  );
  const pres = SlidesApp.getActivePresentation();
  const slide = pres.getSelection().getCurrentPage();
  slide.getBackground().setPictureFill(blobImg);
};

export const addImage = (img: string) => {
  //  var blobImg = Utilities.newBlob(Utilities.base64Decode(img), 'image/png',"Your Generated Background");
  if (img == null) {
    return;
  }
  const blobImg = Utilities.newBlob(
    Utilities.base64Decode(img),
    'image/png',
    'Your Generated Background'
  );
  const slide = SlidesApp.getActivePresentation()
    .getSelection()
    .getCurrentPage();
  slide.insertImage(blobImg);
};
