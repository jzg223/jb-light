// const { Rap } = require("./assets/vue/rap.1.3.2");

//代码写在onload里防止阻塞页面渲染
window.onload = function () {
    Rap.config({
        debug: true,
        // router_model: 'history',
        // history_base: 'huma/',
        default_page: "pages/welcome",
        app_version: app_version,
        comp_version: { 'test_page6': 1 },
        css: [
        ],
        filePostfix: 'html',//默认后缀为 html
        script: [
        ], onPageLoadError: function (page, e) {
            //页面加载错误
        }, onRouterChange: function (e) {
            console.log(this.router);
            console.log(e);
        }
    }).ready(function () {
        if (!Rap.debug) {
        }
    }).then(function () {
        return Rap.loadMod(['skin/top2','/components/table','/skin/card','/skin/imgcard','/skin/panel',
            '/skin/two39','/skin/two48','/skin/card2',
            '/skin/header','/skin/nav2','/components/edit','/skin/title']);
    }).then(function (res) {
    }).then(function (res) {

        const store = new Vuex.Store({
            state: {
                user: {},//账号信息
                uid: 0,
                org: {},//机构信息
                regions: {},//地域信息
                dicts: {}, //字典项存储
                roles: [],//角色
                appRoles: []//应用内角色
            },
            mutations: {
                putDict(state, dict) {
                    if (undefined != dict) {
                        state.dicts[dict.name] = dict.values;
                    }
                },
                fill(state, json) {
                    state.user = json.user;
                    state.uid = json.user.uid;
                    state.org = json.org;
                    state.roles = json.roles;
                    state.appRoles = json.appRoles;
                    if(undefined != json.roles && json.roles.length>0){
                        state.currentRoleType = 'g';
                        state.currentRoleName = json.roles[0].name;
                    }else if(undefined != json.appRoles && json.appRoles.length>0){
                        state.currentRoleType = 'a';
                        state.currentRoleName = json.appRoles[0].name;
                    }
                },
                fillUi(state, json) {
                    state.uifunctions = json.functions;
                    state.uimodules = json.modules;
                },
                setRegions(state, regions) {
                    state.regions = regions;
                }
            }
        });

        window.APP = Rap.app({
            el: '#container',store,
            mixins: [mixin_common],
            data: function () {
                return {
                    keep_include: ['bank_index'],
                    state_load: false,
                }
            },
            computed: {
            },
            created() {
                this.showLoading("正在加载资源");
                whole_axios({
                    url: 'api/out/user/check.do',
                    data: {
                        app: appName
                    },
                    method: 'POST'
                }).then(res => {
                    this.hideLoading();
                    
                    var root = res.data;
                    if (200 === root.code) {
                        this.state_load = true;
                        this.$store.commit("fill", {
                            user: root.user,
                            org: root.org,
                            roles: root.roles,
                            appRoles: root.appRoles
                        });
                    }else if (202 === root.code) {
                        this.$Modal.warning({
                            title: '权限验证',
                            content: root.message
                        });
                        return
                    }else {
                        Rap.showPopup('/skin/nologin', {
                            data: {
                            },
                            methods: {
                                ok() {
                                    goMOut();
                                }
                            }
                        });
                    }
                }).catch(err => {
                    this.hideLoading();
                    this.state_load = true;
                    this.$Message.error('提取菜单失败: ' + err);
                });
            },
            init() {
                
            },
            methods: {
            }
        });
    });
}