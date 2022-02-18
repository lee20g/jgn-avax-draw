// 多语言处理的核心方法

// 简繁转换方法
import zhLangTrans from './zh_lang_trans.js'
window.zhLangTrans = zhLangTrans

export default {
  
  // 获得单个文案的方法
  // 这个方法就是全局lg()方法的最终调用方法
  // str 参数可以为字符串，
  // 也可以为json, 如: {key: 'app.user', template_vars:{name: 'value'}, template_class:{name: 'class_str'}}
  // 也可以为json, 如: {key: 'app.user', template_arr:[{key: xxx, val: xxx,, style: xxx, class:xxx}],cfg_no_html_tag: true,}
  // 说明：cfg_no_html_tag 为标记不转换 span
  lg(str, dataset) {
    let db = window.web_lang;

    // 如果传入了组件的语言配置，则采用组件的语言配置
    if (dataset) {
      db = dataset;
    }

    // 如果传入了复杂配置的str（带着模板字符串）
    let cfg = null;
    if (typeof str === "object") {
      cfg = str;
      str = str.key;
    }

    //拆分
    let arr_keys = str.split(".");

    // 筛选语言对象（包含多语言）
    let text_temp = Object.assign({}, db);
    for (let index in arr_keys) {
      let item = arr_keys[index];

      if (text_temp[item]) {
        text_temp = text_temp[item];
      } else {
        break;
      }
    }

    // 查错
    if (typeof text_temp !== "object") {
      console.log("![cp_lang] lang-text err. for: " + str);
    }

    // 简繁转换兼容处理-step1
    let lang = window.lang || 'en';
    if (lang.indexOf("zh_") >= 0 && !text_temp[lang]) {
      lang = "zh";
    }

    //筛选具体语言文案
    text_temp = text_temp[lang] || text_temp["en"];

    // 否则照常处理
    if (typeof text_temp !== 'string') {
      console.log("!lang-text err. for: " + str);
      // console.log(text_temp)
      return "□□□";
      // return "";
    }

    // 返回最终结果前，
    // 替换简单模板变量
    if (cfg && cfg.template_vars) {
      for (let name in cfg.template_vars) {
        let t_reg = new RegExp("{{" + name + "}}", "g");
        let t_value = cfg.template_vars[name];

        text_temp = text_temp.replace(t_reg, t_value);
      }
    }
    // 替换复杂模板变量
    if (cfg && cfg.template_arr) {
      cfg.template_arr.forEach(function(item) {
        let t_reg = new RegExp("{{" + item.key + "}}", "g");
        let t_value = item.val;

        // 变量千分位
        // if (item.cfg_qfw) {
        //   t_value = bus.app.$options.filters["qfw"](t_value);
        // }

        if (!cfg.cfg_no_html_tag) {
          let t_class = item.class ? ` class="${item.class}"` : "";
          let t_style = item.style ? ` style="${item.style}"` : "";

          t_value = `<span ${t_class} ${t_style}>${t_value}</span>`;
        }

        text_temp = text_temp.replace(t_reg, t_value);
      });
    }

    // 简繁转换兼容处理-step2
    let win_lang = window.lang
    if (
      win_lang.indexOf("zh_") >= 0 &&
      !text_temp[win_lang] &&
      window.zhLangTrans
    ) {
      if (win_lang === "zh_s") {
        text_temp = window.zhLangTrans.trans(text_temp);
      } else if (win_lang === "zh_t") {
        text_temp = window.zhLangTrans.trans(text_temp, "t");
      }
    }

    return text_temp;
  },

  // 从全局文案取出一组多语言文案如传入：'app.login', 则返回 app.login 的多语言 json
  lgRefer(str) {
    let db = window.web_lang;

    let arr_keys = str.split(".");
    let text_temp = db;
    for (let index in arr_keys) {
      let item = arr_keys[index];

      if (text_temp[item]) {
        text_temp = text_temp[item];
      } else {
        break;
      }
    }

    if (!text_temp) {
      console.log("lgRefer-queryAppRefer err. :" + str);
    }
    return text_temp;
  },
};
