import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`${CONFIG.site.basePath}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  job: icon('ic-job'),
  blog: icon('ic-blog'),
  chat: icon('ic-chat'),
  mail: icon('ic-mail'),
  user: icon('ic-user'),
  file: icon('ic-file'),
  lock: icon('ic-lock'),
  tour: icon('ic-tour'),
  order: icon('ic-order'),
  label: icon('ic-label'),
  blank: icon('ic-blank'),
  kanban: icon('ic-kanban'),
  folder: icon('ic-folder'),
  course: icon('ic-course'),
  banking: icon('ic-banking'),
  booking: icon('ic-booking'),
  invoice: icon('ic-invoice'),
  product: icon('ic-product'),
  calendar: icon('ic-calendar'),
  disabled: icon('ic-disabled'),
  external: icon('ic-external'),
  menuItem: icon('ic-menu-item'),
  ecommerce: icon('ic-ecommerce'),
  analytics: icon('ic-analytics'),
  dashboard: icon('ic-dashboard'),
  parameter: icon('ic-parameter'),
};

// ----------------------------------------------------------------------

export const navData = [
  /**
   * Overview
   */
  {
    subheader: 'Workload',
    items: [
      { title: 'Dashboard', path: paths.dashboard.root, icon: ICONS.course },
      {
        title: 'Deployment',
        path: paths.dashboard.deployment.root,
        icon: ICONS.ecommerce,
        children: [
          {
            title: 'List',
            path: paths.dashboard.deployment.list,
          },
          {
            title: 'Info',
            path: paths.dashboard.deployment.info,
          },
        ],
      },
      { title: 'Pod', path: paths.dashboard.pod, icon: ICONS.analytics },
      { title: 'Service', path: paths.dashboard.service, icon: ICONS.dashboard },
    ],
  },
  /**
   * Management
   */
  {
    subheader: 'Storage',
    items: [
      {
        title: 'ConfigMap',
        path: paths.dashboard.configmap,
        icon: ICONS.folder,
      },
      {
        title: 'Secret',
        path: paths.dashboard.secret,
        icon: ICONS.kanban,
      },
    ],
  },
  {
    subheader: 'Application',
    items: [
      {
        title: 'Application',
        path: paths.dashboard.app.root,
        icon: ICONS.user,
        children: [
          { title: 'List', path: paths.dashboard.app.list },
          { title: 'Info', path: paths.dashboard.app.info },
        ],
      },
    ],
  },
];
