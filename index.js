import { convertFromJson } from "./scripts/converter.js";


/**@type { HTMLInputElement } */
const fileInput = document.getElementById("file-input");

/**@type { HTMLButtonElement } */
const convertBtn = document.getElementById("convert-btn");

/**@type { HTMLParagraphElement } */
const resultTextElement = document.getElementById("result-text");

/**@type { HTMLAnchorElement } */
const downloadBtn = document.getElementById("download-btn");

/**@type { HTMLInputElement } */
const langInput = document.getElementById("lang-input");


/**@type { Blob } */
let downloadBlob = null;
let convertedSrt = "";
let language = langInput.value;


convertBtn.addEventListener("click", async () => {
    const json = await fileInput.files[0].text();
    convertedSrt = convertFromJson(json, language);
    
    resultTextElement.innerText = convertedSrt;
    downloadBlob = new Blob([convertedSrt], { type: "text/plain" });
});


downloadBtn.addEventListener("click", () => {
    if (langInput.value != null && langInput.value != '') {
        language = `.${langInput.value}`
    } else {
        language = '';
    }
    
    downloadBtn.download = fileInput.files[0].name.slice(0, -5) + language + ".srt";

    downloadBtn.href = URL.createObjectURL(downloadBlob);
});

