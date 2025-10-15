let typeWriterEffectWorking = false;
let typeWriterEffectInterval = null;
let typeWriterEffectIndex = 0;

let charaName = "Chara"

const setCharaName = () => {
    const newName = prompt("Name the fallen human");
    if (newName.toLowerCase() == "sans") {
        alert("nope.")
        return
    }
    if (newName.toLowerCase() == "papyru") {
        alert("I'LL ALLOW IT!!!!!!!!!!!!")
    }
    if (newName.toLowerCase() == "toriel") {
        alert("why not choose your own name, my child")
        return
    }
    if (newName.toLowerCase() == "chara") {
        alert("The true name")
    }
    if (newName.toLowerCase() == "alphys") {
        alert("D-Don't do that!")
        return
    }

    charaName = newName


}

const startDialogs = [
    "Greetings",
    "I am Chara",
    "Thank you",
    "Your power awakened me from death.",
    `My "human soul."`,
    `My "determination."`,
    `They were not mine, but YOURS.`,
    `At first, I was so confused.`,
    `Our plan had failed, hadn't it?`,
    `Why was I brought back to life?`,
    `You.`,
    `With your guidance.`,
    `I realized the purpose of my reincarnation.`,
    `Power.`,
    `Together, we eradicated the enemy and became strong.`,
    `HP. ATK. DEF. GOLD. EXP. LV.`,
    `Every time a number increases, that feeling...`,
    `That's me.`,
    `"Chara"`,
    `Now.`,
    `Now, we have reached the absolute.`,
    `There is nothing left for us here.`,
    `Let us erase this pointless world, and move on to the next.`
]

const chooseDialog = {
    eraseDialog: [
        "Right. You are a great partner",
        "We'll be together forever, won't we?"
    ],
    dontEraseDialog: [
        "No...?",
        "Hmm...",
        "How curious.",
        "You must have misunderstood.",
        "SINCE WHEN WERE YOU THE ONE IN CONTROL?"
    ]
}
const imageElementDiv = document.getElementsByClassName("chara")[0];
const el = document.getElementsByClassName("text");
const fullscrFrame = document.getElementsByClassName("fullscr-frame")[0];
const slashImgElement = document.getElementsByClassName("slash")[0];
const damageImgElement = document.getElementsByClassName("damage")[0];

let dialogIndex = 0;
let subDialogIndex = 0;
let dialogSelectionErase = null;
let haveSpaceBefore = false;

const startTypeWriterEffect = (textString) => {
    if (!textString) {
        el[0].innerHTML = ""
        return
    }
    // el[0].innerText = textString;
    // return;
    el[0].innerText = "";
    typeWriterEffectWorking = true;
    typeWriterEffectIndex = 0;

    typeWriterEffectInterval = setInterval(() => {
        if (typeWriterEffectIndex < textString.length) {
            if (textString.charAt(typeWriterEffectIndex) === ' ') {
                typeWriterEffectIndex++;
                haveSpaceBefore = true;
                return;
            }
            el[0].innerText += (haveSpaceBefore ? ' ' : '') + textString.charAt(typeWriterEffectIndex);
            typeWriterEffectIndex++;
            haveSpaceBefore = false;
        } else {
            clearInterval(typeWriterEffectInterval);
            typeWriterEffectWorking = false;
        }
    }, 100);
}


const triggerSlashImmediate = () => {
    fullscrFrame.classList.add("d-none");
    slashImgElement.classList.remove("d-none");
    slashImgElement.classList.add("d-block");
    trigger99999damage();
}



const triggerSlash = () => {
    setTimeout(() => {
        triggerSlashImmediate();
    }, 5000)
}

const trigger99999damage = () => {
    setTimeout(() => {
        slashImgElement.classList.add("d-none");
        slashImgElement.classList.remove("d-block");

        damageImgElement.classList.remove("d-none");
        damageImgElement.classList.add("d-block");
        endOfDamage();
    }, 2000)
}


const endOfDamage = () => {
    setTimeout(() => {
        damageImgElement.classList.add("d-none");
        damageImgElement.classList.remove("d-block");
        alert("Amına kodumun soykırımcısı seni!");
        location.reload();
    }, 2000)
}


const continueDialogs = () => {
    if (typeWriterEffectWorking) return;


    if (dialogIndex === startDialogs.length) {

        if (dialogSelectionErase == null) {
            dialogSelectionErase = confirm("Erase: OK | DO NOT: Cancel") ? "eraseDialog" : "dontEraseDialog"
        }
        const subDialogTextArray = chooseDialog[dialogSelectionErase];

        if ((dialogSelectionErase == "dontEraseDialog") && (subDialogIndex == (subDialogTextArray.length - 1))) {
            imageElementDiv.classList.add("wide-eye");
        }
        if (subDialogIndex == subDialogTextArray.length) {
            if ((dialogSelectionErase == "dontEraseDialog")) {
                imageElementDiv.classList.remove("wide-eye");
                imageElementDiv.classList.add("jump-scare");

                fullscrFrame.classList.add("jump-scare");
                startTypeWriterEffect("")
                triggerSlash();
                return;
            } else if (dialogSelectionErase == "eraseDialog") {
                triggerSlashImmediate();
            }

        } else {
            startTypeWriterEffect(subDialogTextArray[subDialogIndex]);
            subDialogIndex++;
        }

    }

    if (dialogIndex < startDialogs.length) {
        startTypeWriterEffect(startDialogs[dialogIndex]);
        dialogIndex++;
    }

}

continueDialogs();

document.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        continueDialogs();
    }

});
