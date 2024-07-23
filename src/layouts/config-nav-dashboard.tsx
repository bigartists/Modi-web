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
            path: paths.dashboard.deployment.root,
          },
        ],
      },
      {
        title: 'Pod',
        path: paths.dashboard.pod.root,
        icon: ICONS.analytics,
        children: [
          {
            title: 'List',
            path: paths.dashboard.pod.root,
          },
        ],
      },
      { title: 'Service', path: paths.dashboard.service, icon: ICONS.dashboard },
      {
        title: 'Product',
        path: paths.dashboard.product.root,
        icon: ICONS.product,
        children: [
          { title: 'List', path: paths.dashboard.product.root },
          { title: 'Details', path: paths.dashboard.product.demo.details },
          { title: 'Create', path: paths.dashboard.product.new },
          { title: 'Edit', path: paths.dashboard.product.demo.edit },
        ],
      },
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
        path: paths.dashboard.secret.root,
        icon: ICONS.kanban,
        children: [
          { title: 'List', path: paths.dashboard.secret.root },
          { title: 'New', path: paths.dashboard.secret.new },
        ],
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
