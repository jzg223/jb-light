var app_version = 12;
var foottitle = '';
var title_manage = '****系统';
var fj_url = 'http://10.128.1.110:901/extra/';
// var whole_server = 'http://10.128.1.110:901/';
var whole_server = 'http://localhost:90/';
function goLogin() {
    window.location.href = '/whole-front/login.html';
}
function takeToken() {
    var str = window.localStorage.getItem('train_token');
    return str;
}
function clearToken() {
    window.localStorage.removeItem('train_token');
}
function setToken(value) {
    window.localStorage.setItem('train_token', value);
}
function setUser(value) {
    window.localStorage.setItem('train_user', value);
}
function takeMToken() {
    var str = window.localStorage.getItem('train_mtoken');
    return str;
}
function clearMToken() {
    window.localStorage.removeItem('train_mtoken');
}
function setMToken(value) {
    window.localStorage.setItem('train_mtoken', value);
}
function setMUser(user){
    window.localStorage.setItem('train_muser', user);
}
function takeMUser(){
    var str = localStorage.getItem("train_muser");
    if(undefined!=str && ''!=str){
        return JSON.parse(str)
    }
}
function goMOut() {
    window.localStorage.removeItem('train_mtoken');
    window.localStorage.removeItem('train_muser');
    window.location.href = '/core-manage/login.html';
}
function goOut() {
    window.localStorage.removeItem('train_token');
    window.location.href = '/whole-front/index.html';
}
function takeLoginType(){
    return localStorage.getItem("loginType")
}
function setLoginType(type){
    localStorage.setItem("loginType",type)
}

var navs = [
    {
        id: 0,
        name: '首页',
        key: 'welcome',
        link: '/whole-front/index.html#pages/welcome'
    },
    {
        id: 1,
        name: '资讯',
        key: 'news',
        link: '/whole-front/index.html#pages/article/index'
        // childs: [
        //     {
        //         id: 1,
        //         name: '新闻动态',
        //         key: 'news12',
        //         link: '/whole-front/index.html#pages/article/index?cid=12'
        //     },
        //     {
        //         id: 2,
        //         name: '通知公告',
        //         key: 'news26',
        //         link: '/whole-front/index.html#pages/article/index?cid=26'
        //     },
        //     {
        //         id: 3,
        //         name: '政策法规',
        //         key: 'news27',
        //         link: '/whole-front/index.html#pages/article/index?cid=27'
        //     }
        // ]
    },
    // {
    //     id: 4,
    //     name: '专题推荐',
    //     key: 'news4',
    //     link: '/whole-front/index.html#pages/topic/index'
    // },
    {
        id: 4,
        name: '训练基地',
        key: 'bases',
        link: '/whole-front/index.html#pages/base/index'
    },
    {
        id: 4,
        name: '教官库',
        key: 'teachers',
        link: '/whole-front/index.html#pages/teacher/index',
        childs1: [
            {
                id: 1,
                name: '教官风采',
                key: 'news12',
                link: '/whole-front/index.html#pages/teacher/index'
            },
            {
                id: 2,
                name: '教学心得',
                key: 'news26',
                link: '/forum/category/2'
            },
        ]
    },
    // {
    //     id: 4,
    //     name: '调训',
    //     key: 'news6',
    //     link: '/whole-front/index.html#pages/trainclass'
    // },
    {
        id: 4,
        name: '课程中心',
        key: 'courses',
        // link: '/edu-front',
        childs: [
            {
                id: 4,
                key: 'courses',
                name: '专业课程',
                link: '/edu-front/index.html#pages/courses',
            }, {
                id: 4,
                key: 'open',
                name: '公开课程',
                link: '/edu-front/index.html#pages/open',
            }
        ]
    },
    {
        id: 4,
        name: '考试中心',
        key: 'exam',
        // link: '/exam-front',
        childs: [
            {
                id: 4,
                name: '试卷',
                key: 'exam-pages',
                link: '/exam-front/index.html#pages/paper/index',
            },
            {
                id: 4,
                name: '考试',
                key: 'exam-exam',
                link: '/exam-front/index.html#pages/exam',
            },
            {
                id: 4,
                name: '考试记录',
                key: 'exam-records',
                link: '/exam-front/index.html#pages/exam/records',
            }
        ]
    },
    {
        id: 4,
        name: '练习中心',
        key: 'exec',
        link: '/exam-front/index.html#pages/exerc/index',
    },
    {
        id: 4,
        name: '资源中心',
        key: 'doc',
        link: '/doc-front/index.html#pages/welcome',
    }
];

var navs_personal = [
    { 'name': '', title: '工作区', link: '/core-manage/index.html#pages/main', icon: '/assets/svg/personal.svg' },
    // { 'name': '', title: '大屏可视化', link: '/visual-show/demo', icon: '/assets/svg/personal.svg' },
    { 'name': '', title: '个人资料', link: '/core-manage/index.html#pages/personal/info', icon: '/assets/svg/personal.svg' },
    // { 'name': '', title: '消息', link: '/whole-manage/index.html#sys/message', icon: '/assets/svg/message.svg' },
    // { 'name': '', title: '通知', link: '/whole-manage/index.html#sys/notify', icon: '/assets/svg/task.svg' },
    { 'name': '', title: '修改密码', link: '/core-manage/index.html#pages/personal/setpass', icon: '/assets/svg/setting.svg' },
    { 'name': '', title: '注销', link: 'javascript:goMOut()', icon: '/assets/svg/logout.svg' },
];