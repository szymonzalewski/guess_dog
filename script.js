const btn = document.querySelector("button");
const btn2 = document.getElementById("drugi");
const btn3 = document.getElementById("trzeci");
const img = document.querySelector("img");
const input = document.getElementById("userInput");
const hidden = document.querySelector("#myDiv");
const hidden2 = document.querySelector("#myDiv2");
const hidden3 = document.querySelector("#myDiv3");
const welcomeText = document.querySelector("#welkomes");

const URL = "https://dog.ceo/api/breeds/image/random";

function extractBreedFromURL(url) {
  const match = url.match(/breeds\/([^\/]+)\//);
  if (match && match[1]) {
    return match[1].replace("-", " ");
  }
  return null;
}

const welcome = () => {
  setTimeout(function () {
    welcomeText.style.display = "none";
  }, 3000);
};
welcome();

const pressPictureForStart = () => {
  setTimeout(function () {
    hidden3.style.display = "";
  }, 3000);
};
pressPictureForStart();

const hide = () => {
  hidden.style.display = "none";
  hidden2.style.display = "none";
  hidden3.style.display = "none";
};
hide();

const showPic = () => {
  fetch(URL)
    .then((res) => res.json())
    .then((data) => img.setAttribute("src", data.message));
};
showPic();

const resultRemover = () => {
  setTimeout(() => {
    document.getElementById("success").innerHTML = "";
    document.getElementById("wrong").innerHTML = "";
  }, 2000);
};

btn.addEventListener("click", () => {
  hidden.style.display = "";
  hidden2.style.display = "";
  hidden3.style.display = "none";
  fetcher();
});

const fetcher = () => {
  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      img.setAttribute("src", data.message);
      btn2.onclick = () => {
        const inputTekst = input.value.trim().toLowerCase();
        const extractBreed = extractBreedFromURL(data.message)
          .replace(/-/g, " ")
          .toLowerCase();
        if (extractBreed && extractBreed === inputTekst) {
          document.getElementById("success").innerHTML = "Brawo";
          resultRemover();
          fetcher();
        } else {
          document.getElementById("wrong").innerHTML = "Niestety";
          resultRemover();
        }
      };
    })
    .catch((err) => console.error(err));
};
