import { IConfig, IPlugin } from 'umi-types';
import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import slash from 'slash2';
import themePluginConfig from './themePluginConfig';
const { pwa } = defaultSettings;

// preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;
const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site';
const plugins: IPlugin[] = [
  ['umi-plugin-antd-icon-config', {}],
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
            },
          }
        : false,
      // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
      //   exclude: ['@babel/runtime', 'netlify-lambda'],
      // },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
];

if (isAntDesignProPreview) {
  // 针对 preview.pro.ant.design 的 GA 统计代码
  plugins.push([
    'umi-plugin-ga',
    {
      code: 'UA-72788897-6',
    },
  ]);
  plugins.push(['umi-plugin-antd-theme', themePluginConfig]);
}

export default {
  plugins,
  hash: true,
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/zh/guide/router.html
  //路由配置
  routes:[
    // // user
    // {
    //     path: '/user',
    //     component: '../layouts/UserLayout',
    //     routes: [
    //         { path: '/user', redirect: '/user/login' },
    //         { path: '/user/login', component: './User/Login' },
    //         { path: '/user/register', component: './User/Register' },
    //         { path: '/user/register-result', component: './User/RegisterResult' },
    //     ],
    // },
    //app
    {
      path: '/',
      component: '../layouts/BasicLayout',
      Routes: ['src/pages/Authorized'],
      authority: ['admin', 'user'],
      routes: [
        {
          path: '/basic',
          name: 'basic',
          icon: 'appstore',
          routes: [
            { path: '/basic/index', name: 'index', component: './404' },
            { path: '/basic/user', name: 'user', component: './Basic/UserList.js' },
            { path: '/basic/role', name: 'role', component: './Basic/RoleList.js' },
            { path: '/basic/account', name: 'account', component: './Basic/UserList.js' },
            { path: '/basic/department', name: 'department', component: './Basic/UserList.js' },
          ],
        },
        {
          path: '/vehicle',
          name: 'vehicle',
          icon: 'car',
          routes: [
            {
              path: '/vehicle/vehicle-information',
              name: 'vehicle-information',
              component: './Welcome',
            },
            { path: '/vehicle/insurance', name: 'insurance', component: './Welcome' },
            { path: '/vehicle/accident', name: 'accident', component: './Welcome' },
            { path: '/vehicle/claims-settlement', name: 'claims-settlement', component: './Welcome' },
            { path: '/vehicle/repair', name: 'repair', component: './Welcome' },
            { path: '/vehicle/maintain', name: 'maintain', component: './Welcome' },
            {
              path: '/vehicle/regular-inspection',
              name: 'regular-inspection',
              component: './Welcome',
            },
            { path: '/vehicle/annual-inspection', name: 'annual-inspection', component: './Welcome' },
            { path: '/vehicle/violation', name: 'violation', component: './Welcome' },
            { path: '/vehicle/scrap', name: 'scrap', component: './Welcome' },
            { path: '/vehicle/operational-costs', name: 'operational-costs', component: './Welcome' },
            { path: '/vehicle/vehicle-request', name: 'vehicle-request', component: './Welcome' },
            {
              path: '/vehicle/repair-plantSchema',
              name: 'repair-plantSchema',
              component: './Welcome',
            },
            { path: '/vehicle/service', name: 'service', component: './Welcome' },
            { path: '/vehicle/install', name: 'install', component: './Welcome' },
          ],
        },
        {
          path: '/data',
          name: 'data',
          icon: 'database',
          routes: [
            { path: '/data/device', name: 'device', component: './Welcome' },
            { path: '/data/manufactor', name: 'manufactor', component: './Welcome' },
            { path: '/data/driver', name: 'driver', component: './Welcome' },
            { path: '/data/location', name: 'location', component: './Welcome' },
            { path: '/data/enclosure', name: 'enclosure', component: './Welcome' },
            { path: '/data/message', name: 'message', component: './Welcome' },
            { path: '/data/simcard', name: 'simcard', component: './Welcome' },
            { path: '/data/simcard-type', name: 'simcard-type', component: './Welcome' },
            { path: '/data/security-check', name: 'security-check', component: './Welcome' },
            { path: '/data/machine', name: 'machine', component: './Welcome' },
            { path: '/data/income-expenditure', name: 'income-expenditure', component: './Welcome' },
          ],
        },
        {
          path: '/statement-statistics',
          name: 'statement-statistics',
          icon: 'bar-chart',
          routes: [
            {
              path: '/statement-statistics/vehicle-history',
              name: 'vehicle-history',
              component: './Welcome',
            },
            {
              path: '/statement-statistics/vehicle-alarm',
              name: 'vehicle-alarm',
              component: './Welcome',
            },
          ],
        },
        {
          path: '/operation-management',
          name: 'operation-management',
          icon: 'smile',
          routes: [{ path: '/operation-management/circle', name: 'circle', component: './Welcome' }],
        },
        {
          path: '/system-settings',
          name: 'system-settings',
          icon: 'setting',
          routes: [
            {
              path: '/system-settings/personal-center',
              name: 'personal-center',
              component: './Welcome',
            },
            { path: '/system-settings/my-circle', name: 'my-circle', component: './Welcome' },
            { path: '/system-settings/time-zone', name: 'time-zone', component: './Welcome' },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // routes: [
  //   {
  //     path: '/user',
  //     component: '../layouts/UserLayout',
  //     routes: [
  //       {
  //         name: 'login',
  //         path: '/user/login',
  //         component: './user/login',
  //       },
  //     ],
  //   },
  //   {
  //     path: '/',
  //     component: '../layouts/SecurityLayout',
  //     routes: [
  //       {
  //         path: '/',
  //         component: '../layouts/BasicLayout',
  //         authority: ['admin', 'user'],
  //         routes: [
  //           {
  //             path: '/',
  //             redirect: '/welcome',
  //           },
  //           {
  //             path: '/welcome',
  //             name: 'welcome',
  //             icon: 'smile',
  //             component: './Welcome',
  //           },
  //           {
  //             path: '/admin',
  //             name: 'admin',
  //             icon: 'crown',
  //             component: './Admin',
  //             authority: ['admin'],
  //           },
  //           {
  //             name: 'list.table-list',
  //             icon: 'table',
  //             path: '/list',
  //             component: './ListTableList',
  //           },
  //           {
  //             component: './404',
  //           },
  //         ],
  //       },
  //       {
  //         component: './404',
  //       },
  //     ],
  //   },
  //   {
  //     component: './404',
  //   },
  // ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
  },
  define: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (
      context: {
        resourcePath: string;
      },
      _: string,
      localName: string,
    ) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
          .map((a: string) => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  }, // chainWebpack: webpackPlugin,
  // proxy: {
  //   '/server/api/': {
  //     target: 'https://preview.pro.ant.design/',
  //     changeOrigin: true,
  //     pathRewrite: { '^/server': '' },
  //   },
  // },
} as IConfig;
