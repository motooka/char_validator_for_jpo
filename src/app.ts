// @ts-ignore
import { zenkaku } from './zenkaku'

const zenkakuMap: { [key: string]: boolean} = {};
window.addEventListener('load', () => {
    const src = document.getElementById('src');
    if(src instanceof HTMLTextAreaElement) {
        src.addEventListener('keyup', () => {
            parse(src.value);
        });
        src.addEventListener('change', () => {
            parse(src.value);
        });
    }
    else {
        alert('初期化に失敗しました。動作しません。ごめんなさい。');
    }
    zenkaku.forEach((validChar: string) => {
        zenkakuMap[validChar] = true;
    })
});

function parse(str: string) {
    const errors: string[] = [];
    for(const char of str) {
        const code = char.charCodeAt(0);
        if(0x20<=code && code<=0x7e) {
            continue;
        }
        if(!zenkakuMap[char]) {
            errors.push(char);
        }
    }

    const resultCodeContainer = document.querySelector('#resultError > div');
    if(resultCodeContainer) {
        resultCodeContainer.textContent = '';
        errors.forEach((char) => {
            const elem = document.createElement('code');
            elem.textContent = char;
            resultCodeContainer.appendChild(elem);
        });
    }

    const resultOK = document.getElementById('resultOK');
    const resultError = document.getElementById('resultError');
    if(str.length <= 0) {
        resultError?.setAttribute('style', 'display: none');
        resultOK?.setAttribute('style', 'display: none');
    }
    else if(errors.length > 0) {
        resultError?.setAttribute('style', 'display: block');
        resultOK?.setAttribute('style', 'display: none');
    }
    else {
        resultOK?.setAttribute('style', 'display: block');
        resultError?.setAttribute('style', 'display: none');
    }
}
