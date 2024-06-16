chrome.runtime.onMessage.addListener((req) => {
  if (req === "LOAD") {
    // 엔트리 이야기에 올라온 글 리스트 얻기
    const list = [
      ...document
        .querySelector(".nextInner section")
        ?.querySelectorAll("ul > li[class]"),
    ];
    if (list.length != 0) displayPostImage(list);
  }
});

chrome.storage.local.get("block", function (block) {
  if (Object.keys(block).length === 0) {
    chrome.storage.local.set({ block: [] });
  }
});

const observer = new MutationObserver(() => {
  // 엔트리 이야기에 올라온 글 리스트 얻기
  const list = [
    ...document
      .querySelector(".nextInner section")
      ?.querySelectorAll("ul > li[class]"),
  ];
  if (list.length != 0) displayPostImage(list);
});

observer.observe(document.querySelector("body"), {
  childList: true,
  subtree: true,
});
