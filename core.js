/**
 * @param {HTMLElement[]} d
 */
function range(d) {
  chrome.storage.local.get("block", function ({ block }) {
    function blocking(id) {
      block.push(id);
      chrome.storage.local.set({ block });
      location.reload();
    }

    function unblock(id) {
      block = block.filter((u) => u !== id);
      chrome.storage.local.set({ block });
      location.reload();
    }

    d.forEach((dom) => {
      const contents = dom.querySelectorAll("div > div")[1];
      [...contents.querySelectorAll("a")].forEach((link) => {
        const url = link.href;
        if (
          url.startsWith("http://playentry.org//uploads/") ||
          url.startsWith(
            "https://playentry.org/redirect?external=https://ifh.cc/i-"
          ) ||
          url.startsWith(
            "https://playentry.org/redirect?external=https://ifh.cc/v-"
          ) ||
          (url.startsWith(
            "https://playentry.org/redirect?external=https://ifh.cc/g/" // 정규식 안 사용해서 킹받으시다면 풀리퀘ㄱ
          ) &&
            !link.parentElement.querySelector(".waffle"))
        ) {
          const user = link.parentElement.parentElement
            .querySelector("li > div > a")
            .href.match(/[a-f\d]{24}/)[0];
          let blocked = block.includes(user);

          const image = document.createElement("img");
          if (!blocked) {
            if (url.startsWith("http://playentry.org//u")) {
              image.src = url;
              image.onerror = () => {
                image.setAttribute("controls", true);
                image.outerHTML = image.outerHTML.replace("img", "video");
              };
            } else {
              if (
                url.startsWith(
                  "https://playentry.org/redirect?external=https://ifh.cc/v-"
                ) ||
                url.startsWith(
                  "https://playentry.org/redirect?external=https://ifh.cc/i-"
                )
              ) {
                image.src = `https://ifh.cc/g/${url.slice(40).split("-")[1]}`;
              } else {
                image.src = url.slice(40);
              }
              image.title = `ifh.cc로 올린 사진입니다`;
              image.onerror = () => {
                image.setAttribute("controls", true);
                image.outerHTML = image.outerHTML.replace("img", "video");
              };
            } // image.oneerror은 같은 속성인데 불필요하게 두 번 쓴게 불편하시다면 풀리퀘ㄱ
          } else {
            image.src =
              "https://playentry.org//uploads/8e/48/8e48286flup0keag36t4743a431ofced.png";
            image.alt =
              "이 사용자는 차단되었습니다. 차단 해제하려면 차단해제를 눌러주세요.";
            link.removeAttribute("url");
          }
          image.className = "waffle";
          image.style.cursor = "pointer";
          image.addEventListener("click", () => {
            window.open(image.src);
          });
          link.setAttribute("url", url);
          link.innerText = null;
          link.removeAttribute("href");
          link.append(image);
          link.style.display = "flex";
          blocker =
            image.parentElement.parentElement.parentElement.lastChild.lastChild
              .firstChild.firstChild;
          blockerbutton = blocker.lastChild.cloneNode(true);
          blockerbutton.lastChild.removeAttribute("href");
          if (blocked) {
            blockerbutton.innerHTML = blockerbutton.innerHTML
              .replace("신고하기", "차단해제")
              .replace("댓글 가리기", "차단해제")
              .replace("삭제하기", "차단해제"); // 왜 innerText 안됨;
          } else {
            blockerbutton.innerHTML = blockerbutton.innerHTML
              .replace("신고하기", "차단하기")
              .replace("댓글 가리기", "차단하기")
              .replace("삭제하기", "차단하기"); // 왜 innerText 안됨;
          }
          blockerbutton.onclick = () => {
            if (blocked) {
              if (
                confirm(
                  "이 사용자를 차단 해제할까요?\n(차단 해제시 자동으로 새로고침됩니다)"
                )
              ) {
                unblock(user);
              }
            } else {
              if (
                confirm(
                  "이 사용자를 차단할까요?\n(차단 시 자동으로 새로고침됩니다)"
                )
              ) {
                blocking(user);
              }
            }
          };
          blocker.lastChild.after(blockerbutton);
          if (
            url.split(".")[3] != undefined &&
            url.startsWith(
              "https://playentry.org/redirect?external=https://ifh.cc/v-"
            )
          ) {
            for (let i = 2; i < image.src.split(".").length; i++) {
              j = image.parentElement.cloneNode(true);
              if (!blocked) {
                j.firstChild.src = `https://ifh.cc/g/${
                  j.firstChild.src.split(".")[i]
                }`;
              }
              j.firstChild.className = `waffle`;
              link.after(j);
            }
          }
        }
      });
    });
  });
}

async function upload() {
  return new Promise((res, _) => {
    const input = document.createElement("input");
    input.type = "file";
    input.click();
    input.addEventListener("change", async () => {
      const file = input.files[0];
      const form = new FormData();
      form.append("file", file);
      form.append("type", "notcompress");

      const d = await (
        await fetch("https://playentry.org/rest/picture", {
          method: "POST",
          body: form,
        })
      ).json();
      res({
        id: d.filename,
        ext: d.imageType,
      });
    });
  });
}

function click() {
  upload().then((d) => {
    navigator.clipboard.writeText(
      `playentry.org//uploads/${d.id.slice(0, 2)}/${d.id.slice(2, 4)}/${d.id}.${
        d.ext
      }`
    );
  });
}

function imageUploadButton() {
  try {
    const imagehover = document.createElement("style");
    imagehover.textContent = `.imagebuttonstyle:hover {
      background-image: url("https://playentry.org/uploads/확프/사진/확프사진온.svg") !important;
    }`;
    document.head.appendChild(imagehover);
    wasans = document.querySelector("div > div > div > div > div > div > div");
    wasansclone = wasans.cloneNode(true);
    wasansclone.style.marginLeft = "10px";
    wasansclone.firstChild.classList.add("imagebuttonstyle");
    wasansclone.onclick = () => {
      click();
    };
    wasans.after(wasansclone);
    wasansclone.firstChild.style.backgroundImage =
      "url('https://playentry.org/img/IcoCmtPicture.svg')";
    wasansclone.firstChild.style.backgroundRepeat = "no-repeat";
  } catch {
    setTimeout(() => {
      imageUploadButton();
    }, 100);
  }
}
if (
  new RegExp("https://playentry.org/community/entrystory/list.*$").test(
    location.href
  )
) {
  imageUploadButton();
}
