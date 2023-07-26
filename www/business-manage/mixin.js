var mixin_common = {
  data() {
    return {
      fj_url: fj_url,
      front_url: front_url,
    }
  },
  methods: {
    timeFormat: function (date) {
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? ('0' + MM) : MM;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      let h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      let m = date.getMinutes();
      m = m < 10 ? ('0' + m) : m;
      let s = date.getSeconds();
      s = s < 10 ? ('0' + s) : s;
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
    },
    dateFormat: function (date) {
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? ('0' + MM) : MM;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      let h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      let m = date.getMinutes();
      m = m < 10 ? ('0' + m) : m;
      let s = date.getSeconds();
      s = s < 10 ? ('0' + s) : s;
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
    },
    showLoading(message) {
      this.$Spin.show({
        render: (h) => {
          return h('div', [
            h('Icon', {
              'class': 'demo-spin-icon-load',
              props: {
                type: 'ios-loading',
                size: 18
              }
            }),
            h('div', message)
          ])
        }
      });
    },
    hideLoading() {
      this.$Spin.hide();
    },
    cityName(region) {
      console.log(region);
      if (undefined == region) {
        return;
      }
      var city = region.substring(0, 4);
      var item = this.$store.state.regions[city];
      if (undefined != item) {
        return item.name;
      }
    },
    countyName(region) {
      console.log(region);
      if (undefined == region) {
        return;
      }
      var item = this.$store.state.regions[region];
      if (undefined != item) {
        return item.name;
      }
    },
    fillRegion(region, row) {
      // 地域填充
      var alls = window.localStorage.getItem("train_regions");
      if (undefined == alls || '' == alls) {
        return;
      }
      alls = JSON.parse(alls);
      var city = region.substring(0, 4);
      var item = alls[city];
      if (undefined != item) {
        row.cityName = item.name;
      }
      item = alls[region];
      if (undefined != item) {
        row.countyName = item.name;
      }
    }
  },
  filters: {
    status(value) {
      for (var item of status_check) {
        if (value + '' == item.code) {
          return item.title;
        }
      }
      return value;
    },
    status2(value) {
      for (var item of status_check2) {
        if (value + '' == item.code) {
          return item.title;
        }
      }
      return value;
    },
    //保留2位小数点过滤器 不四舍五入
    number(value) {
      var toFixedNum = Number(value).toFixed(3);
      var realVal = toFixedNum.substring(0, toFixedNum.toString().length - 1);
      return realVal;
    },
    dateTime: function (value) {
      let date = new Date(value * 1000);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? ('0' + MM) : MM;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      let h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      let m = date.getMinutes();
      m = m < 10 ? ('0' + m) : m;
      let s = date.getSeconds();
      s = s < 10 ? ('0' + s) : s;
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
    },
    dateTime: function (value) {
      let date = new Date(value * 1000);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? ('0' + MM) : MM;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      let h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      let m = date.getMinutes();
      m = m < 10 ? ('0' + m) : m;
      let s = date.getSeconds();
      s = s < 10 ? ('0' + s) : s;
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
    },
    percent: function (value) {
      const realVal = parseFloat(value * 100).toFixed(2);
      return realVal;
    }
  },
}

var DICT_ROLE = {
  'ROLE_USER': '学员',
  'ROLE_TEACHER': '教师',
  'ROLE_SUPER_ADMIN': '管理员'
};

var CODES_ROLE = ['ROLE_USER', 'ROLE_TEACHER', 'ROLE_SUPER_ADMIN'];
var NAMES_ROLE = ['学员', '教师', '管理员'];
var mixin_edu = {
  data() {
    return {
      fj_url: fj_url,
      front_url: front_url,
    }
  },
  methods: {
    status: function (status) {
      //   draft, published, closed
      if ('draft' == status) {
        return '未发布';
      } else if ('published' == status) {
        return '已发布';
      } else if ('closed' == status) {
        return '已关闭';
      }
      return status;
    },
    img: function (row) {
      if (undefined != row && undefined != row.cover && '' != row.cover) {
        var json = JSON.parse(row.cover);
        var img = json.large;
        if (undefined != img && '' != img) {
          return img;
        }
      }
      return 'img/default/course.png';
    }
  },
  filters: {
    //保留2位小数点过滤器 不四舍五入
    number(value) {
      var toFixedNum = Number(value).toFixed(3);
      var realVal = toFixedNum.substring(0, toFixedNum.toString().length - 1);
      return realVal;
    },
    formatDate: function (value) {
      let date = new Date(value * 1000);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? ('0' + MM) : MM;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      let h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      let m = date.getMinutes();
      m = m < 10 ? ('0' + m) : m;
      let s = date.getSeconds();
      s = s < 10 ? ('0' + s) : s;
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
    },
    dateTime: function (value) {
      let date = new Date(value * 1000);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? ('0' + MM) : MM;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      let h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      let m = date.getMinutes();
      m = m < 10 ? ('0' + m) : m;
      let s = date.getSeconds();
      s = s < 10 ? ('0' + s) : s;
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
    },
    percent: function (value) {
      const realVal = parseFloat(value * 100).toFixed(2);
      return realVal;
    }
  },
}

var mixin_course = {
  data() {
    return {
      fj_url: fj_url,
      front_url: front_url,
      dict_status: {
        'draft': '未发布',
        'published': '已发布',
        'closed': '已关闭',
      }
    }
  },
  methods: {
    status: function (row) {
      //   draft, published, closed
      if ('draft' == row.status) {
        return '未发布';
      } else if ('published' == row.status) {
        return '已发布';
      } else if ('closed' == row.status) {
        return '已关闭';
      }
    },
    img: function (row) {
      if (undefined != row && undefined != row.cover && '' != row.cover) {
        var json = JSON.parse(row.cover);
        var img = json.large;
        if (undefined != img && '' != img) {
          return img;
        }
      }
      return 'img/default/course.png';
    },
    takeLessonIndex(seq) {
      //获取课时序号
      return seq.split('-')[0];
    },
    takeTaskIndex(seq) {
      //获取任务序号
      console.log(seq.split('-'));
      return parseInt(seq.split('-')[1]) - 1;
    }
  },
  filters: {
    //保留2位小数点过滤器 不四舍五入
    number(value) {
      var toFixedNum = Number(value).toFixed(3);
      var realVal = toFixedNum.substring(0, toFixedNum.toString().length - 1);
      return realVal;
    },
    status(value) {
      var dict_status = {
        'draft': '未发布',
        'published': '已发布',
        'closed': '已关闭',
      }
      return dict_status[value];
    },
    dateTime: function (value) {
      let date = new Date(value * 1000);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? ('0' + MM) : MM;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      let h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      let m = date.getMinutes();
      m = m < 10 ? ('0' + m) : m;
      let s = date.getSeconds();
      s = s < 10 ? ('0' + s) : s;
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
    },
  },
}

var mixin_opencourse = {
  data() {
    return {
      fj_url: fj_url,
      front_url: front_url,
    }
  },
  methods: {
    status: function (row) {
      //   draft, published, closed
      if ('draft' == row.status) {
        return '未发布';
      } else if ('published' == row.status) {
        return '已发布';
      } else if ('closed' == row.status) {
        return '已关闭';
      }
    },
    img: function (row) {
      if (undefined != row && undefined != row.largePicture && '' != row.largePicture) {
        return row.largePicture;
      }
      return 'img/default/course.png';
    },
    length: function (row) {
      if (undefined != row && undefined != row.length) {
        var hour = parseInt(row.length / 60);
        if (('' + hour).length < 2) {
          hour = '0' + hour;
        }
        var min = row.length % 60;
        if (('' + min).length < 2) {
          min = '0' + min;
        }
        return [hour, min];
      }
    }
  },
  filters: {
    //保留2位小数点过滤器 不四舍五入
    number(value) {
      var toFixedNum = Number(value).toFixed(3);
      var realVal = toFixedNum.substring(0, toFixedNum.toString().length - 1);
      return realVal;
    },
    status: function (status) {
      //   draft, published, closed
      if ('draft' == status) {
        return '未发布';
      } else if ('published' == status) {
        return '已发布';
      } else if ('closed' == status) {
        return '已关闭';
      }
      return '未知';
    },
    dateTime: function (value) {
      let date = new Date(value * 1000);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? ('0' + MM) : MM;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      let h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      let m = date.getMinutes();
      m = m < 10 ? ('0' + m) : m;
      let s = date.getSeconds();
      s = s < 10 ? ('0' + s) : s;
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
    },
  },
}

var mixin_lesson = {
  data() {
    return {
      fj_url: fj_url,
      front_url: front_url,
      front_frame: front_frame,
      types: [
        { 'type': 'text', 'title': '图文', 'icon': 'es-icon-graphic' },
        { 'type': 'video', 'title': '视频', 'icon': 'es-icon-video' },
        { 'type': 'audio', 'title': '音频', 'icon': 'es-icon-audio' },
        { 'type': 'discuss', 'title': '讨论', 'icon': 'es-icon-discuss' },
        { 'type': 'testpaper', 'title': '考试', 'icon': 'es-icon-examination' },
        { 'type': 'homework', 'title': '作业', 'icon': 'es-icon-task' },
        { 'type': 'exercise', 'title': '练习', 'icon': 'es-icon-exercise' },
        { 'type': 'download', 'title': '下载资料', 'icon': 'es-icon-downloadfile' },
        { 'type': 'office', 'title': 'office文档', 'icon': 'es-icon-downloadfile' }
      ]
    }
  },
  methods: {
    status: function (row) {
      //   draft, published, closed
      if ('create' == row.status) {
        return '未发布';
      } else if ('published' == row.status) {
        return '已发布';
      } else if ('closed' == row.status) {
        return '已关闭';
      }
    },
    icon(row) {
      for (var item of this.types) {
        if (row.type == item.type) {
          return '<span class="cd-tag cd-tag-green mrm js-lesson-option-tag ">' +
            '<i class="es-icon ' + item.icon + '"></i></span>';
        }
      }
    },
    img: function (row) {
      if (undefined != row && undefined != row.cover && '' != row.cover) {
        var json = JSON.parse(row.cover);
        var img = json.large;
        if (undefined != img && '' != img) {
          return img;
        }
      }
      return 'img/default/course.png';
    },
    takeLessonIndex(seq) {
      //获取课时序号
      return seq.split('-')[0];
    },
    takeTaskIndex(seq) {
      //获取任务序号
      console.log(seq.split('-'));
      return parseInt(seq.split('-')[1]) - 1;
    },
  },
  filters: {
    //保留2位小数点过滤器 不四舍五入
    number(value) {
      var toFixedNum = Number(value).toFixed(3);
      var realVal = toFixedNum.substring(0, toFixedNum.toString().length - 1);
      return realVal;
    }
  },
}

var mixin_classroom = {
  data() {
    return {
      fj_url: fj_url,
      front_url: front_url
    }
  },
  methods: {
    img: function (row) {
      if (undefined != row && undefined != row.largePicture && '' != row.largePicture) {
        return row.largePicture;
      }
      return '/img/default/classroom.png';
    }
  },
  filters: {
    //保留2位小数点过滤器 不四舍五入
    number(value) {
      var toFixedNum = Number(value).toFixed(3);
      var realVal = toFixedNum.substring(0, toFixedNum.toString().length - 1);
      return realVal;
    },
    status(value) {
      if ('published' == value) {
        return '报名进行中';
      } else if ('draft' == value) {
        return '未发布';
      } else if ('learning' == value) {
        return '学习进行中';
      } else if ('testing' == value) {
        return '考试进行中';
      } else if ('closed' == value) {
        return '已关闭';
      }
      return '未知';
    }
  },
}

var mixin_article = {
  data() {
    return {
      fj_url: fj_url,
      front_url: front_url,
    }
  },
  methods: {
    status: function (status) {
      //   draft, published, closed
      if ('unpublished' == status) {
        return '未发布';
      } else if ('published' == status) {
        return '已发布';
      } else if ('closed' == status) {
        return '已关闭';
      }
      return status;
    },
    img: function (row) {
      if (undefined != row && undefined != row.cover && '' != row.cover) {
        var json = JSON.parse(row.cover);
        var img = json.large;
        if (undefined != img && '' != img) {
          return img;
        }
      }
      return 'img/default/course.png';
    }
  },
  filters: {
    //保留2位小数点过滤器 不四舍五入
    number(value) {
      var toFixedNum = Number(value).toFixed(3);
      var realVal = toFixedNum.substring(0, toFixedNum.toString().length - 1);
      return realVal;
    },
    formatDate: function (value) {
      let date = new Date(value * 1000);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? ('0' + MM) : MM;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      let h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      let m = date.getMinutes();
      m = m < 10 ? ('0' + m) : m;
      let s = date.getSeconds();
      s = s < 10 ? ('0' + s) : s;
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
    },
    percent: function (value) {
      const realVal = parseFloat(value * 100).toFixed(2);
      return realVal;
    }
  },
}

//调训
var DICT_TRAINCLASS_STATUS = [
  { name: 'draft', title: '准备阶段', description: '' },
  { name: 'sign', title: '报道阶段', description: '' },
  { name: 'going', title: '进行阶段', description: '' },
  { name: 'finished', title: '培训结束', description: '' }
];
var mixin_trainclass = {
  data() {
    return {
      fj_url: fj_url,
      front_url: front_url,
    }
  },
  methods: {
  },
  filters: {
    status: function (status) {
      //   draft, published, closed
      if (0 == status) {
        return '未提交';
      } else if (1 == status) {
        return '已提交';
      } else if (2 == status) {
        return '已审核';
      } else if (-2 == status) {
        return '已驳回';
      }
      return status;
    },
    //保留2位小数点过滤器 不四舍五入
    number(value) {
      var toFixedNum = Number(value).toFixed(3);
      var realVal = toFixedNum.substring(0, toFixedNum.toString().length - 1);
      return realVal;
    },
    dateTime: function (value) {
      let date = new Date(value * 1000);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? ('0' + MM) : MM;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      let h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      let m = date.getMinutes();
      m = m < 10 ? ('0' + m) : m;
      let s = date.getSeconds();
      s = s < 10 ? ('0' + s) : s;
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
    },
    percent: function (value) {
      const realVal = parseFloat(value * 100).toFixed(2);
      return realVal;
    }
  },
}

// 调训班操作
var mixin_trainclass_ope = {
  props: ['id', 'classInfo', 'ope', 'status_ope', 'url_current'],
  data() {
    return {
    }
  },
  methods: {
    go(ope, status) {
      // console.log(JSON.stringify(ope)+' --- '+status);
      this.$emit('ope-change', { nav: ope, status: status });
    },
    onInit() {
      var opes = this.opes[this.classInfo.status];
      if (undefined != opes && opes.length > 0) {
        var first = opes[0];
        for (var ope of opes) {
          if (undefined == this.status_ope[ope.name] || 0 == this.status_ope[ope.name]) {
            first = ope;
            break;
          }
        }
        // this.go(first, this.info.status);
        this.$emit('ope-change', { nav: first, status: this.classInfo.status });
      }
    },
    checkStatus() {
      //当前操作检测

      var opes = this.opes[this.classInfo.status];
      if (undefined != opes) {
        for (var ope of opes) {
          if (1 !== this.status_ope[ope.name]) {
            // this.$Message.error("未完成"+ope.title);
            this.$Modal.confirm({
              title: '无法进入下一阶段',
              content: "未完成" + ope.title,
              onOk: () => {
              },
              onCancel: () => {
              }
            });
            return false;
          }
        }
      }
      return true;
    },
    beginRun() {
      if (false == this.checkStatus()) {
        return;
      }
      instance_axios({
        method: 'post',
        url: 'api/manage/train-class/begin-run.do',
        data: {
          id: this.id
        }
      }).then(res => {
        let root = res.data
        if (root.code === 200) {
          this.$Message.success('成功执行');
          this.$emit('data-change', {});
        } else {
          this.$Message.error(root.message)
        }
      }).catch(err => {
        console.error(err)
        this.$Message.error('出现错误，请联系管理员！')
      })
    },
    returnRun() {
      instance_axios({
        method: 'post',
        url: 'api/manage/train-class/begin-run.do',
        data: {
          id: this.id
        }
      }).then(res => {
        let root = res.data
        if (root.code === 200) {
          this.$Message.success('成功执行');
          this.$emit('data-change', {});
        } else {
          this.$Message.error(root.message)
        }
      }).catch(err => {
        console.error(err)
        this.$Message.error('出现错误，请联系管理员！')
      })
    },
    beginFinish() {
      if (false == this.checkStatus()) {
        return;
      }
      instance_axios({
        method: 'post',
        url: 'api/manage/train-class/begin-finish.do',
        data: {
          id: this.id
        }
      }).then(res => {
        let root = res.data
        if (root.code === 200) {
          this.$Message.success('成功执行');
          this.$emit('data-change', {});
        } else {
          this.$Message.error(root.message)
        }
      }).catch(err => {
        console.error(err)
        this.$Message.error('出现错误，请联系管理员！')
      })
    },
    returnDraft() {
      instance_axios({
        method: 'post',
        url: 'api/manage/train-class/begin-draft.do',
        data: {
          id: this.id
        }
      }).then(res => {
        let root = res.data
        if (root.code === 200) {
          this.$Message.success('成功执行');
          this.$emit('data-change', {});
        } else {
          this.$Message.error(root.message)
        }
      }).catch(err => {
        console.error(err)
        this.$Message.error('出现错误，请联系管理员！')
      })
    },
    beginSign() {
      if (false == this.checkStatus()) {
        return;
      }
      instance_axios({
        method: 'post',
        url: 'api/manage/train-class/begin-sign.do',
        data: {
          id: this.id
        }
      }).then(res => {
        let root = res.data
        if (root.code === 200) {
          this.$Message.success('成功执行');
          this.$emit('data-change', {});
        } else {
          this.$Message.error(root.message)
        }
      }).catch(err => {
        console.error(err)
        this.$Message.error('出现错误，请联系管理员！')
      })
    },
    returnSign() {
      instance_axios({
        method: 'post',
        url: 'api/manage/train-class/begin-sign.do',
        data: {
          id: this.id
        }
      }).then(res => {
        let root = res.data
        if (root.code === 200) {
          this.$Message.success('成功执行');
          this.$emit('data-change', {});
        } else {
          this.$Message.error(root.message)
        }
      }).catch(err => {
        console.error(err)
        this.$Message.error('出现错误，请联系管理员！')
      })
    },
  },
  watch: {
    classInfo: {
      handler(new_val, oldName) {
        this.onInit();
      },
      immediate: true
    }
  }
}

var mixin_print = {
  data() {
    return {
      state_loadprint: false,
      LODOP: undefined,
      id_print: ''
    }
  },
  created() {
    this.id_print = this.uuid();
    // this.onPrintInit();
  },
  methods: {
    uuid() {
      function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      }
      return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
    },
    onPrintInit() {
      var _this = this;
      Rap.insertScript('/assets/libs/print/LodopFuncs.js').then(res => {
        this.state_loadprint = true;
        // var content = '<object  id="LODOP_OB" classid="clsid:2105C259-1E0C-4534-8141-A753534CB4CA" width=0 height=0> ' +
        //   ' <embed id="LODOP_EM" type="application/x-print-lodop" width=0 height=0></embed>' +
        //   '</object>';
        // $("body").append(content);
        setTimeout(() => {
          var LODOP = getLodop();
          if (undefined == LODOP) {
            _this.$Message.error("未安装打印控件");
            return;
          }
          if (LODOP.VERSION) {
            _this.LODOP = LODOP;
            // if (LODOP.CVERSION)
            //   alert("当前有WEB打印服务C-Lodop可用!\n C-Lodop版本:" + LODOP.CVERSION + "(内含Lodop" + LODOP.VERSION + ")");
            // else
            //   alert("本机已成功安装了Lodop控件！\n 版本号:" + LODOP.VERSION);
          } else {
            _this.$Message.error("未安装打印控件");
          }

        }, 1000);

      }).catch(err => {
        console.log(err);
      })
    },
    doPrint(html) {
      // this.LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_表单一");
      // this.LODOP.SET_PRINT_STYLE("FontSize", 18);
      // this.LODOP.SET_PRINT_STYLE("Bold", 1);
      // this.LODOP.ADD_PRINT_TEXT(50, 231, 260, 39, "打印页面部分内容");
      // var content = '<link href="assets/vue/iview-4.1.css" type="text/css"  rel="stylesheet">';
      // content += element[0].innerHTML;
      this.LODOP.ADD_PRINT_HTM(0, 0, "100%", "100%", html);
      // LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT","Auto-Width");
      // Full-Page
      LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT", "Full-Page");
      LODOP.PREVIEW();
    }
  },
}

var mixin_live = {
  data: function () {
    return {
      socket: undefined,
      video: undefined,
      stream_two: undefined,
    }
  },
  methods: {

  }
}