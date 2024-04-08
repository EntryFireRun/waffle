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
            backgroundblack = document.createElement("div");
            wtfblackbro = document.createElement("h1");
            yesqu = document.createElement("input");
            noqu = document.createElement("input");
            itscenterbutton = document.createElement("div");
            backgroundfill = document.createElement("div");
            reloadcon = document.createElement("p");

            backgroundblack.style.backgroundColor = "#00000088";
            backgroundblack.style.width = "100vw";
            backgroundblack.style.height = "100vh";
            backgroundblack.style.zIndex = "100";
            backgroundblack.style.position = "fixed";

            wtfblackbro.innerText = "정말로 차단하실건가요?";
            wtfblackbro.style.textAlign = "center";
            wtfblackbro.style.marginTop = "30px";

            yesqu = document.createElement("input");
            yesqu.style.marginRight = "20px";
            yesqu.style.width = "200px";
            yesqu.style.marginTop = "50px";
            yesqu.style.height = "50px";
            yesqu.style.borderRadius = "25px";
            yesqu.style.borderStyle = "none";
            yesqu.style.backgroundColor = "green";
            yesqu.style.fontSize = "20px";
            yesqu.style.color = "white";
            yesqu.style.cursor = "pointer";
            yesqu.type = "button";
            yesqu.value = "네~ 네~";
            yesqu.onclick = () => {
              if (blocked) {
                unblock(user);
              } else {
                blocking(user);
              }
            };

            noqu = document.createElement("input");
            noqu.style.marginRight = "20px";
            noqu.style.width = "200px";
            noqu.style.marginTop = "50px";
            noqu.style.height = "50px";
            noqu.style.borderRadius = "25px";
            noqu.style.borderStyle = "none";
            noqu.style.backgroundColor = "red";
            noqu.style.fontSize = "20px";
            noqu.style.color = "white";
            noqu.style.cursor = "pointer";
            noqu.type = "button";
            noqu.value = "응 아니야~";
            noqu.onclick = () => {
              backgroundfill.remove();
              backgroundblack.remove();
            };

            itscenterbutton.style.display = "flex";
            itscenterbutton.style.justifyContent = "center";
            itscenterbutton.style.alignItems = "center";

            backgroundfill.style.backgroundColor = "white";
            backgroundfill.style.width = "50vw";
            backgroundfill.style.height = "25vh";
            backgroundfill.style.zIndex = "101";
            backgroundfill.style.position = "fixed";
            backgroundfill.style.left = "25%";
            backgroundfill.style.top = "37.5%";
            backgroundfill.style.borderRadius = "50px";

            reloadcon.style.marginLeft = "auto";
            reloadcon.style.marginRight = "auto";
            reloadcon.style.width = "100%";
            reloadcon.style.textAlign = "center";
            reloadcon.style.marginTop = "15px";
            reloadcon.innerText = "네~네~를 선택하시면 자동으로 새로고침됩니다";

            document.querySelector("#__next").prepend(backgroundblack);
            document.querySelector("#__next").prepend(backgroundfill);
            backgroundfill.appendChild(wtfblackbro);
            backgroundfill.appendChild(itscenterbutton);
            itscenterbutton.appendChild(yesqu);
            itscenterbutton.appendChild(noqu);
            itscenterbutton.after(reloadcon);
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
/* <div style="
    background-color: white;
    width: 50vw;
    height: 25vh;
    z-index: 101;
    position: fixed;
    left: 25%;
    top: 37.5%;
    border-radius: 50px;
"><h1 style="
    text-align: center;
    margin-top: 30px;
">정말로 차단하실건가요?</h1><div style="
    display: flex;
    justify-content: center;
    align-items: center;
"><input type="button" value="네" style="
    margin-right: 20px;
    width: 200px;
    margin-top: 50px;
    height: 50px;
    border-radius: 25px;
    border-style: none;
    background-color: green;
    font-size: 20px;
    color: white;
    cursor: pointer;
"><input type="button" value="응 아니야~" style="
    margin-left: 20px;
    width: 200px;
    margin-top: 50px;
    height: 50px;
    border-radius: 25px;
    border-style: none;
    background-color: red;
    font-size: 20px;
    color: white;
    cursor: pointer;
"></div></div>
<div style="
    background-color: #00000088;
    width: 100vw;
    height: 100vh;
    z-index: 100;
    position: fixed;
"></div> */
