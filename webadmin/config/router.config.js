export default [
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
          { path: '/basic/account', name: 'account', component: './Basic/AccountList.js' },
          { path: '/basic/department', name: 'department', component: './Basic/DepartmentList.js' },
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
];
