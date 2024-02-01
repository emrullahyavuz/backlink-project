const backlinkTitle = document.getElementById("backlinkTitle");
const xmarkIcon = document.getElementById("xmarkIcon");
const websiteNameInput = document.getElementById("websiteNameInput");
const websiteDomainInput = document.getElementById("websiteDomainInput");
const backlinkLists = document.getElementById("backlinkLists");
const backlinkContainer = document.querySelector(".backlinkContainer");
const backlinkForm = document.querySelector(".backlinkForm");

let backlinks = [];

function getBacklink() {
  backlinkContainer.classList.toggle("active");
  websiteNameInput.focus();
}

function backlinkValidate(nameValue, domainValue) {
  const expression =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/g;
  const regex = new RegExp(expression);

  if (!nameValue || !domainValue) {
    alert("website adını ve adresini doğru formatta giriniz.");
    return false;
  }

  if (!domainValue.match(regex)) {
    alert("url'i doğru formatta giriniz.");
    return false;
  }

  return true;
}

function deleteBacklink(url) {
    backlinks.forEach((backlink,index) => {
        if (backlink.url === url) {
          backlinks.splice(index,1)
        }
    });
    
    localStorage.setItem("backlinks", JSON.stringify(backlinks));
    getBacklinks()
    
}

function addBackLinks() {
    backlinkLists.textContent = "";
    backlinks.forEach((backlink) => {
        const {name,url} = backlink;
        const item = document.createElement("div");
        item.classList.add("backlinkItem")
        const closeIcon = document.createElement("i");
        closeIcon.classList.add("fa-solid","fa-xmark");
        closeIcon.setAttribute("onclick",`deleteBacklink('${url}')`);

        const backlinkInfo = document.createElement("div");
        backlinkInfo.classList.add("backlinkUrlTitle")
        const baclinkLink = document.createElement("a");

        baclinkLink.setAttribute("href",`${url}`);
        baclinkLink.setAttribute("target","_blank");
        baclinkLink.textContent = name;

        backlinkInfo.appendChild(baclinkLink);
        item.append(closeIcon,backlinkInfo);
        backlinkLists.appendChild(item)



    })
}

function getBacklinks() {
  if (localStorage.getItem("backlinks")) {
    backlinks = JSON.parse(localStorage.getItem("backlinks"));
  }

  addBackLinks();
}

function backlinkSubmit(e) {
  e.preventDefault();
  const webNameValue = websiteNameInput.value;
  let webDomainValue = websiteDomainInput.value;

  if (!webDomainValue.includes("https:") && !webDomainValue.includes("http:"))
    webDomainValue = `https://${webDomainValue}`;

  if (!backlinkValidate(webNameValue, webDomainValue)) {
    return false;
  }

  const backlink = {
    name: webNameValue,
    url: webDomainValue,
  };

  backlinks.push(backlink);
  localStorage.setItem("backlinks", JSON.stringify(backlinks));
  getBacklinks();
  backlinkContainer.classList.remove("active")
  backlinkForm.reset();
  websiteNameInput.focus();
}

getBacklinks();

backlinkTitle.addEventListener("click", getBacklink);
xmarkIcon.addEventListener("click", getBacklink);
backlinkForm.addEventListener("submit", backlinkSubmit);
