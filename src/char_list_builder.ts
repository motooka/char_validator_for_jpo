import * as encoding from 'encoding-japanese';
import fs from 'fs';

function jisToJsStr(ku: number, ten: number): string {
    const firstByte = ku + 0x20;
    const secondByte = ten + 0x20;
    const arr = new Uint8Array([0x1b, 0x24, 0x42, firstByte, secondByte]);
    return encoding.convert(arr, {
        to: 'UNICODE',
        from: 'JIS',
        type: 'string',
    });
}

function isValidChar(ku: number, ten: number): boolean {
    // JIS-X0208-1997 コード表に無い文字を飛ばす
    if(ku<1 || 84<ku || ten<1 || 94<ten) {
        return false;
    }
    if(ku===2) {
        if((15<=ten && ten<=25) || (34<=ten && ten<=41) || (49<=ten && ten<=59) || (75<=ten && ten<=81) || (90<=ten)) {
            return false;
        }
    }
    if(ku===3) {
        if((ten<=15) || (26<=ten && ten<=32) || (59<=ten && ten<=64) || (91<=ten)) {
            return false;
        }
    }
    if(ku===4 && 84<=ten) {
        return false;
    }
    if(ku===5 && 87<=ten) {
        return false;
    }
    if(ku===6) {
        if((25<=ten && ten<=32) || ((57<=ten))) {
            return false;
        }
    }
    if(ku===7) {
        if((34<=ten && ten<=48) || (82<=ten)) {
            return false;
        }
    }
    if(ku===8 && 33<=ten) {
        return false;
    }
    if(9<=ku && ku<=15) {
        return false;
    }
    if(ku===47 && 52<=ten) {
        return false;
    }
    if(ku===84 && 7<=ten) {
        return false;
    }

    // 特許庁の特有ルール
    if(ku===2 && ten===3) {
        return false; // 「■」は使用できない
    }
    if(ku===2 && ten===94) {
        return false; // 合成用丸は使用できない。これは元々省かれているが、一応。
    }
    // 特許庁ルールでは「丸付き数字は使えない」とあるが、 JIS-X0208-1997 テーブルには元々無い。

    return true;
}
const array: string[] = [];
for(let ku=1; ku<=84; ku++) {
    for(let ten=1; ten<=94; ten++) {
        if(isValidChar(ku, ten)) {
            array.push(jisToJsStr(ku, ten));
        }
    }
}
const zenkakuJS = 'export const zenkaku = [' + "'" + array.join("','") + "'];";
fs.writeFileSync('src/zenkaku.ts', zenkakuJS); // このファイルは .gitignore で指定されている
