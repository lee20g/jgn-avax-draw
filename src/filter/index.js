
export default {

  // todo...
  numberAddClass(str,class_str) {
    if(!str || typeof str !== 'string'){
      return str
    }

    return str.replace(/xx/g,`<span class="${class_str}"><span>`)
  },

  shortAddress(str) {
    if (!str) {
      return "";
    }
    let str_a = str.substr(0, 6);
    let str_b = str.substr(str.length - 4);
    return str_a + "..." + str_b;
  },

  // 转整数
  parseInt(num) {
    return parseInt(num);
  },
  autoParseInt(num) {
    if (num >= 9999) {
      return parseInt(num);
    } else {
      return num;
    }
  },

  // 转百分号
  bfh(val) {
    // 如果没值，直接返回空字符串
    if (val === undefined || val === null || val === "" || isNaN(val)) {
      return val;
    }

    // 如果是数值(理解为倍数数值)，处理后返回
    if (!isNaN(val)) {
      return (val * 100).toFixed(2) + "%";
    }

    // 如果是字符串，需要美化数字后两位，然后返回
    if (typeof val === "string" && val.indexOf("%") > 0) {
      return parseFloat(val.replace("%", "")).toFixed(2) + "%";
    }
  },

  // 千分位
  qfw(num) {
    // return parseFloat(num).toLocaleString()
    if (!num || isNaN(num)) {
      return num;
    } else {
      num = parseFloat(num);

      let res_num = "";

      // 如果为整数
      if (num % 1 === 0) {
        res_num = parseFloat(num).toLocaleString();
      }

      // 如果为小数
      else {
        // 转字符串
        if (num <= 0.000001) {
          num = parseFloat(num)
            .toFixed(10)
            .replace(/(0+)$/g, "");
        } else {
          num = num.toString();
        }

        // 拆分整数、小数部分
        let arr = num.split(".");
        let part_1 = parseFloat(arr[0]).toLocaleString();
        let part_2 = arr[1];

        // 小数部分精度限制10位
        part_2 = part_2.substr(0, 10);

        res_num = part_1 + "." + part_2;
      }

      // 返回
      return res_num;
    }
  },

  //
  tofixed0(num) {
    if (isNaN(num)) {
      return num;
    } else {
      return parseFloat(num).toFixed(0);
    }
  },
  tofixed2(num) {
    if (isNaN(num)) {
      return num;
    } else {
      return parseFloat(num).toFixed(2);
    }
  },
  tofixed3(num) {
    if (isNaN(num)) {
      return num;
    } else {
      return parseFloat(num).toFixed(3);
    }
  },
  tofixed4(num) {
    if (isNaN(num)) {
      return num;
    } else {
      return parseFloat(num).toFixed(4);
    }
  },
  tofixed5(num) {
    if (isNaN(num)) {
      return num;
    } else {
      return parseFloat(num).toFixed(5);
    }
  },
  tofixed6(num) {
    if (isNaN(num)) {
      return num;
    } else {
      return parseFloat(num).toFixed(6);
    }
  },
  parsefloat(num) {
    if (isNaN(num)) {
      return num;
    } else {
      return parseFloat(num);
    }
  },

  // st 到 时间
  stToDateTimeSe(st) {
    if (!st || typeof st !== "number") {
      return "";
    }

    // 对来自go语言的时间戳，抹除后3位
    if (st > 1000000000000) {
      st = parseInt(st / 1000);
    }

    // 对来自python的时间戳，补上后三位 000
    if (st < 1000000000000) {
      st = st * 1000;
    }

    let haha = new Date(st);

    if (isNaN(haha)) {
      return st;
    }

    function p(s) {
      return s < 10 ? "0" + s : s;
    }

    let d = haha.getDate();
    let m = haha.getMonth() + 1;
    let y = haha.getFullYear();

    let h = p(haha.getHours());
    let mi = p(haha.getMinutes());
    let s = p(haha.getSeconds());

    let str = `${y}-${m}-${d} ${h}:${mi}:${s}`;

    return str;
  },
  stToDateTime(st) {
    if (!st || typeof st !== "number") {
      return "";
    }

    // 对来自go语言的时间戳，抹除后3位
    if (st > 1000000000000) {
      st = parseInt(st / 1000);
    }

    // 对来自python的时间戳，补上后三位 000
    if (st < 1000000000000) {
      st = st * 1000;
    }

    let haha = new Date(st);

    if (isNaN(haha)) {
      return st;
    }

    function p(s) {
      return s < 10 ? "0" + s : s;
    }

    let d = haha.getDate();
    let m = haha.getMonth() + 1;
    let y = haha.getFullYear();

    let h = p(haha.getHours());
    let mi = p(haha.getMinutes());

    let str = `${y}-${m}-${d} ${h}:${mi}`;

    return str;
  },
  stToDate(st) {
    if (!st || typeof st !== "number") {
      return st;
    }

    // 对来自go语言的时间戳，抹除后3位
    if (st > 1000000000000) {
      st = parseInt(st / 1000);
    }

    // 对来自python的时间戳，补上后三位 000
    if (st < 1000000000000) {
      st = st * 1000;
    }

    let haha = new Date(st);
    // let dict = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    let d = haha.getDate();
    // let m = dict[haha.getMonth()]
    let m = haha.getMonth() + 1;
    let y = haha.getFullYear();

    // let str = d + ' ' + m + '.' + ' ' + y
    let str = y + "-" + m + "-" + d;

    return str;
  },
  stToTime(st_num) {
    if (!st_num) return "";

    let st = parseInt(st_num);

    // 对来自go语言的时间戳，抹除后3位
    if (st > 1000000000000) {
      st = parseInt(st / 1000);
    }

    // 对来自python的时间戳，补上后三位 000
    if (st < 1000000000000) {
      st = st * 1000;
    }

    let time = new Date(st);
    let h = time.getHours();
    let m = time.getMinutes();

    h = h.toString().padStart(2, "0");
    m = m.toString().padStart(2, "0");

    let str = `${h}:${m}`;
    return str;
  },
  stToTimeSe(st_num) {
    if (!st_num) return "";

    let st = parseInt(st_num);

    // 对来自go语言的时间戳，抹除后3位
    if (st > 1000000000000) {
      st = parseInt(st / 1000);
    }

    // 对来自python的时间戳，补上后三位 000
    if (st < 1000000000000) {
      st = st * 1000;
    }

    let time = new Date(st);
    let h = time.getHours();
    let m = time.getMinutes();
    let s = time.getSeconds();

    h = h.toString().padStart(2, "0");
    m = m.toString().padStart(2, "0");
    s = s.toString().padStart(2, "0");

    let str = `${h}:${m}:${s}`;
    return str;
  }
};