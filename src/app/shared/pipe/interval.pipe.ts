import { Pipe, PipeTransform } from '@angular/core';

/**
 * Đổi thời gian số đơn vị giây thành dạng chữ.
 * Dùng unix time đơn vị mili giây, thời gian hiển thị mức nhỏ nhất là giây.
 * Với thời gian là số âm thì kết quả giống số dương nhưng thêm dấu - ở trước.
 * Với thời gian là số 0 thì kết quả là '0 seconds'.
 * Usage:
 *   value | interval:type
 *   type có giá trị là 'compact' hoặc 'full'. Mặc định là compact
 * Example:
 *   {{ 2 | interval:'compact' }}
 *   hiển thị dạng rút gọn làm tròn lên
 * 
 */
@Pipe({
  name: 'interval'
})
export class IntervalPipe implements PipeTransform {

  transform(interval: number, type: string = 'compact'): string {
    if (interval === 0) {
      return '0 seconds';
    }
    let isMinus = false;//đánh dấu inerval là số âm
    if (interval < 0) {
      interval = -interval;
      isMinus = true;
    }

    interval = interval / 1000;

    const minutes = Math.floor(interval / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const seconds = interval - minutes * 60;

    let ret: string = isMinus ? '-' : '';

    if (type === 'compact') {
      if (days > 0) {
        return ret + (days + 1) + ' days';
      }

      if (hours > 0) {
        return ret + (hours + 1) + ' hours';
      }

      if (minutes > 0) {
        return ret + (minutes + 1) + ' minutes';
      }

      if (seconds > 0) {
        return ret + (seconds + 1) + ' seconds';
      }

      return '#error: ' + interval;
    }

    if (type === 'full') {//code của An
      const strDays = days > 0 ? `${days}` + " days " : ""
      const strHours = hours > 0 ? `${hours - 24 * days}` + " hours " : ""
      const strMinutes = minutes > 0 ? `${minutes - 60 * hours}` + " minutes " : ""
      const strSeconds = (minutes === 0 && hours === 0 && days === 0) ? `${seconds}` + " seconds " : ""

      ret += strDays + strHours + strMinutes + strSeconds;
      return ret;
    }

    return '#error-args: ' + type;//sai tham số pipe
  }
}
