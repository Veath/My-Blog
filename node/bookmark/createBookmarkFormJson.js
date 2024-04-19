import * as fs from 'node:fs/promises';

function createBookmarkFormJson(json) {
  const template = `<!DOCTYPE NETSCAPE-Bookmark-file-1>
  <!-- This is an automatically generated file.
       It will be read and overwritten.
       DO NOT EDIT! -->
  <META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
  <TITLE>Bookmarks</TITLE>
  <H1>Bookmarks</H1>
  <DL><p>
      <DT><H3 ADD_DATE="1540120397" LAST_MODIFIED="1688625885" PERSONAL_TOOLBAR_FOLDER="true">FE-书签栏</H3>
      ${formateJson(json)}
  </DL><p>  
`;

  function formateJson(json) {
    let template = '';
    for (let key in json) {
      if (json[key].children) {
        template += `<DT><H3 ADD_DATE="1540120397" LAST_MODIFIED="1688625885">${
          json[key].title
        }</H3>\n<DL><p>\n${formateJson(json[key].children)}\n</DL><p>\n`;
      } else {
        template += `<DT><A HREF="${json[key].href}" ADD_DATE="1540120397" LAST_MODIFIED="1688625885">${json[key].title}</A>\n`;
      }
    }
    return template;
  }

  return template;
}

async function main() {
  const jsonPath = './FE-bookmark.230802.json';
  const bookmarkContent = await fs.readFile(jsonPath);
  const bookmarkJson = JSON.parse(bookmarkContent.toString());

  const html = createBookmarkFormJson([bookmarkJson]);
  await fs.writeFile('./FE-bookmark.230802.html', html);
}

main();
