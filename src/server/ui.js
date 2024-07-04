export const onInstall = () => {
  onOpen();
};

export const onOpen = () => {
  const menu = SlidesApp.getUi()
    .createAddonMenu()
    .addItem('Generator', 'openDialogTailwindCSS');
  menu.addToUi();
};

export const openDialogTailwindCSS = () => {
  const html = HtmlService.createHtmlOutputFromFile(
    'dialog-demo-tailwindcss'
  ).setTitle('Slides Background');
  SlidesApp.getUi().showSidebar(html);
};
