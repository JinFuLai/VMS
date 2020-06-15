// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/user',
          component: '../layouts/UserLayout',
          routes: [
            {
              path: '/user',
              redirect: '/user/login',
            },
            {
              name: 'login',
              icon: 'smile',
              path: '/user/login',
              component: './user/login',
            },
            {
              name: 'register-result',
              icon: 'smile',
              path: '/user/register-result',
              component: './user/register-result',
            },
            {
              name: 'register',
              icon: 'smile',
              path: '/user/register',
              component: './user/register',
            },
            {
              component: '404',
            },
          ],
        },
        {
          path: '/',
          component: '../layouts/BasicLayout',
          Routes: ['src/pages/Authorized'],
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/dashboard/analysis',
            },
            //基本管理
            {
              path: '/dashboard',
              name: 'dashboard',
              icon: 'AppstoreOutlined',
              routes: [
                {
                  name: 'analysis',
                  icon: 'BankOutlined',
                  path: '/dashboard/analysis',
                  component: './dashboard/analysis',
                },
                // {
                //   name: 'monitor',
                //   icon: 'smile',
                //   path: '/dashboard/monitor',
                //   component: './dashboard/monitor',
                // },
                // {
                //   name: 'workplace',
                //   icon: 'smile',
                //   path: '/dashboard/workplace',
                //   component: './dashboard/workplace',
                // },
                {
                  name: 'userinfo',
                  icon: 'UserOutlined',
                  path: '/dashboard/userinfo',
                  component: './dashboard/userinfo',
                },
                {
                  name: 'role',
                  icon: 'TeamOutlined',
                  path: '/dashboard/role',
                  component: './dashboard/role',
                },
                {
                  name: 'company',
                  icon: 'ApartmentOutlined',
                  path: '/dashboard/company',
                  component: './dashboard/company',
                },
                {
                  name: 'department',
                  icon: 'AppstoreAddOutlined',
                  path: '/dashboard/department',
                  component: './dashboard/department',
                },
              ],
            },
            //车辆管理
            {
              path: '/car',
              icon: 'car',
              name: 'car',
              routes: [
                {
                  name: 'carMessage',
                  icon: 'smile',
                  path: '/car/carMessage',
                  component: './car/carMessage',
                },
                {
                  name: 'insurance',
                  icon: 'smile',
                  path: '/car/insurance',
                  component: './car/insurance',
                },
                {
                  name: 'accidentRecords',
                  icon: 'smile',
                  path: '/car/accidentRecords',
                  component: './car/accidentRecords',
                },
                {
                  name: 'claimsRecords',
                  icon: 'smile',
                  path: '/car/claimsRecords',
                  component: './car/claimsRecords',
                },
                {
                  name: 'maintainRecords',
                  icon: 'smile',
                  path: '/car/maintainRecords',
                  component: './car/maintainRecords',
                },
                {
                  name: 'upkeepRecords',
                  icon: 'smile',
                  path: '/car/upkeepRecords',
                  component: './car/upkeepRecords',
                },
                {
                  name: 'securityCheckCondition',
                  icon: 'smile',
                  path: '/car/securityCheckCondition',
                  component: './car/securityCheckCondition',
                },
                {
                  name: 'annualInspectionRecords',
                  icon: 'smile',
                  path: '/car/annualInspectionRecords',
                  component: './car/annualInspectionRecords',
                },
                {
                  name: 'deregulationRecords',
                  icon: 'smile',
                  path: '/car/deregulationRecords',
                  component: './car/deregulationRecords',
                },
                {
                  name: 'scrapRecords',
                  icon: 'smile',
                  path: '/car/scrapRecords',
                  component: './car/scrapRecords',
                },
                {
                  name: 'operatingCost',
                  icon: 'smile',
                  path: '/car/operatingCost',
                  component: './car/operatingCost',
                },
                {
                  name: 'useCarApplyRecords',
                  icon: 'smile',
                  path: '/car/useCarApplyRecords',
                  component: './car/useCarApplyRecords',
                },
                {
                  name: 'maintenanceShopManagement',
                  icon: 'smile',
                  path: '/car/maintenanceShopManagement',
                  component: './car/maintenanceShopManagement',
                },
                {
                  name: 'serveRecords',
                  icon: 'smile',
                  path: '/car/serveRecords',
                  component: './car/serveRecords',
                },
                {
                  name: 'installRecords',
                  icon: 'smile',
                  path: '/car/installRecords',
                  component: './car/installRecords',
                },
              ],
            },
            //数据管理
            {
              path: '/data',
              icon: 'ProjectOutlined',
              name: 'data',
              routes: [
                {
                  name: 'equipmentMessage',
                  icon: 'smile',
                  path: '/data/equipmentMessage',
                  component: './data/equipmentMessage',
                },
                {
                  name: 'equipmentType',
                  icon: 'smile',
                  path: '/data/equipmentType',
                  component: './data/equipmentType',
                },
                {
                  name: 'equipmentManufacturer',
                  icon: 'smile',
                  path: '/data/equipmentManufacturer',
                  component: './data/equipmentManufacturer',
                },
                {
                  name: 'driverMessage',
                  icon: 'smile',
                  path: '/data/driverMessage',
                  component: './data/driverMessage',
                },
                {
                  name: 'positionData',
                  icon: 'smile',
                  path: '/data/positionData',
                  component: './data/positionData',
                },
                {
                  name: 'rail',
                  icon: 'smile',
                  path: '/data/rail',
                  component: './data/rail',
                },
                {
                  name: 'equipmentInformation',
                  icon: 'smile',
                  path: '/data/equipmentInformation',
                  component: './data/equipmentInformation',
                },
                {
                  name: 'SIMCardMessage',
                  icon: 'smile',
                  path: '/data/SIMCardMessage',
                  component: './data/SIMCardMessage',
                },
                {
                  name: 'SIMCardType',
                  icon: 'smile',
                  path: '/data/SIMCardType',
                  component: './data/SIMCardType',
                },
                {
                  name: 'securityCheckProject',
                  icon: 'smile',
                  path: '/data/securityCheckProject',
                  component: './data/securityCheckProject',
                },
                {
                  name: 'machineryEquipmentAndCardStoreManagement',
                  icon: 'smile',
                  path: '/data/machineryEquipmentAndCardStoreManagement',
                  component: './data/machineryEquipmentAndCardStoreManagement',
                },
                {
                  name: 'IncomeAndExpenditureAccountBook',
                  icon: 'smile',
                  path: '/data/IncomeAndExpenditureAccountBook',
                  component: './data/IncomeAndExpenditureAccountBook',
                },
              ],
            },
            //报表统计
            {
              path: '/statement',
              icon: 'PieChartOutlined',
              name: 'statement',
              routes: [
                {
                  name: 'carHistory',
                  icon: 'smile',
                  path: '/statement/carHistory',
                  component: './statement/carHistory',
                },
                {
                  name: 'carAlarm',
                  icon: 'smile',
                  path: '/statement/carAlarm',
                  component: './statement/carAlarm',
                },
              ],
            },
            //系统设置
            {
              path: '/system',
              icon: 'SettingOutlined',
              name: 'system',
              routes: [
                {
                  name: 'personalCenter',
                  icon: 'smile',
                  path: '/system/personalCenter',
                  component: './system/personalCenter',
                },
                {
                  name: 'timezoneSet',
                  icon: 'smile',
                  path: '/system/timezoneSet',
                  component: './system/timezoneSet',
                },
              ],
            },
            // {
            //   path: '/form',
            //   icon: 'form',
            //   name: 'form',
            //   routes: [
            //     {
            //       name: 'basic-form',
            //       icon: 'smile',
            //       path: '/form/basic-form',
            //       component: './form/basic-form',
            //     },
            //     {
            //       name: 'step-form',
            //       icon: 'smile',
            //       path: '/form/step-form',
            //       component: './form/step-form',
            //     },
            //     {
            //       name: 'advanced-form',
            //       icon: 'smile',
            //       path: '/form/advanced-form',
            //       component: './form/advanced-form',
            //     },
            //   ],
            // },
            // {
            //   path: '/list',
            //   icon: 'table',
            //   name: 'list',
            //   routes: [
            //     {
            //       path: '/list/search',
            //       name: 'search-list',
            //       component: './list/search',
            //       routes: [
            //         {
            //           path: '/list/search',
            //           redirect: '/list/search/articles',
            //         },
            //         {
            //           name: 'articles',
            //           icon: 'smile',
            //           path: '/list/search/articles',
            //           component: './list/search/articles',
            //         },
            //         {
            //           name: 'projects',
            //           icon: 'smile',
            //           path: '/list/search/projects',
            //           component: './list/search/projects',
            //         },
            //         {
            //           name: 'applications',
            //           icon: 'smile',
            //           path: '/list/search/applications',
            //           component: './list/search/applications',
            //         },
            //       ],
            //     },
            //     {
            //       name: 'table-list',
            //       icon: 'smile',
            //       path: '/list/table-list',
            //       component: './list/table-list',
            //     },
            //     {
            //       name: 'basic-list',
            //       icon: 'smile',
            //       path: '/list/basic-list',
            //       component: './list/basic-list',
            //     },
            //     {
            //       name: 'card-list',
            //       icon: 'smile',
            //       path: '/list/card-list',
            //       component: './list/card-list',
            //     },
            //   ],
            // },
            // {
            //   path: '/profile',
            //   name: 'profile',
            //   icon: 'profile',
            //   routes: [
            //     {
            //       name: 'basic',
            //       icon: 'smile',
            //       path: '/profile/basic',
            //       component: './profile/basic',
            //     },
            //     {
            //       name: 'advanced',
            //       icon: 'smile',
            //       path: '/profile/advanced',
            //       component: './profile/advanced',
            //     },
            //   ],
            // },
            // {
            //   name: 'result',
            //   icon: 'CheckCircleOutlined',
            //   path: '/result',
            //   routes: [
            //     {
            //       name: 'success',
            //       icon: 'smile',
            //       path: '/result/success',
            //       component: './result/success',
            //     },
            //     {
            //       name: 'fail',
            //       icon: 'smile',
            //       path: '/result/fail',
            //       component: './result/fail',
            //     },
            //   ],
            // },
            // {
            //   name: 'exception',
            //   icon: 'warning',
            //   path: '/exception',
            //   routes: [
            //     {
            //       name: '403',
            //       icon: 'smile',
            //       path: '/exception/403',
            //       component: './exception/403',
            //     },
            //     {
            //       name: '404',
            //       icon: 'smile',
            //       path: '/exception/404',
            //       component: './exception/404',
            //     },
            //     {
            //       name: '500',
            //       icon: 'smile',
            //       path: '/exception/500',
            //       component: './exception/500',
            //     },
            //   ],
            // },
            // {
            //   name: 'account',
            //   icon: 'user',
            //   path: '/account',
            //   routes: [
            //     {
            //       name: 'center',
            //       icon: 'smile',
            //       path: '/account/center',
            //       component: './account/center',
            //     },
            //     {
            //       name: 'settings',
            //       icon: 'smile',
            //       path: '/account/settings',
            //       component: './account/settings',
            //     },
            //   ],
            // },
            // {
            //   name: 'editor',
            //   icon: 'highlight',
            //   path: '/editor',
            //   routes: [
            //     {
            //       name: 'flow',
            //       icon: 'smile',
            //       path: '/editor/flow',
            //       component: './editor/flow',
            //     },
            //     {
            //       name: 'mind',
            //       icon: 'smile',
            //       path: '/editor/mind',
            //       component: './editor/mind',
            //     },
            //     {
            //       name: 'koni',
            //       icon: 'smile',
            //       path: '/editor/koni',
            //       component: './editor/koni',
            //     },
            //   ],
            // },
            {
              component: '404',
            },
          ],
        },
      ],
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
