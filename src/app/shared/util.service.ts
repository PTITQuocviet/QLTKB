import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class UtilService {

    /**
     * 
     * @param data 
     * @param filename 
     */
    saveFile(data: Blob | string, filename: string) {
        const blob = new Blob([data], { type: 'application/octet-stream' });
        const a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = filename;
        a.click();
    }


    dateToString(date: Date) {
        return date.getFullYear() + '-'
            + (date.getMonth() + 1).toString().padStart(2, '0') + '-'
            + date.getDate().toString().padStart(2, '0') + '_'
            + date.getHours().toString().padStart(2, '0') + '-'
            + date.getMinutes().toString().padStart(2, '0') + '-'
            + date.getSeconds().toString().padStart(2, '0');
    }

    /**
     * format date thành dạng đơn giản, format chỉ có các cụm chữ sau: 'yyyy-mm-dd hh-mi-ss'. mm là tháng, mi là phút, ss là giây
     * @param date 
     * @param format 
     * @returns 
     */
    dateToStringSimple(date: Date, format: string) {
        return  format.replace('yyyy', date.getFullYear().toString())
            .replace('mm', (date.getMonth() + 1).toString().padStart(2, '0'))
            .replace('dd', (date.getDate() + 1).toString().padStart(2, '0'))
            .replace('hh', (date.getHours() + 1).toString().padStart(2, '0'))
            .replace('mi', (date.getMinutes() + 1).toString().padStart(2, '0'))
            .replace('ss', (date.getSeconds() + 1).toString().padStart(2, '0'));
    }
}