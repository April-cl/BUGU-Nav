const $siteList = $(".siteList");
const $addButton = $siteList.find("li.addButton");
const collection = localStorage.getItem("collection");
const collectionObject = JSON.parse(collection);
const hasMap = collectionObject || [
  {
    logo: "A",
    url: "https://www.acfun.cn",
  },
  {
    logo: "B",
    url: "https://www.bilibili.com",
  },
];
const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, "");
};

const render = () => {
  $siteList.find("li:not(.addButton)").remove();
  hasMap.forEach((node, index) => {
    const $li = $(`<li class="site">
          <div class="siteLogo">${node.logo}</div>
          <div class="siteLink">${simplifyUrl(node.url)}</div>
          <div class="close"><svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-baseline-close-px"></use>
</svg></div>
        </li>`).insertBefore($addButton);
    $li.on("click", () => {
      window.open(node.url);
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation();
      hasMap.splice(index, 1);
      render();
    });
  });
};

render();

$(".addButton").on("click", () => {
  let url = window.prompt("添加网址");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  hasMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    url: url,
  });
  render();
});

window.onbeforeunload = () => {
  const string = JSON.stringify(hasMap);
  localStorage.setItem("collection", string);
};

$(document).on("keypress", (e) => {
  const { key } = e;
  for (let i = 0; i < hasMap.length; i++) {
    if (hasMap[i].logo.toLowerCase() === key) {
      window.open(hasMap[i].url);
    }
  }
});
