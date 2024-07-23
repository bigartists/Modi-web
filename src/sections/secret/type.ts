export type ISecret = {
  Name: string;
  Namespace: string;
  CreateTime: string;
  Type: string;
};

export type ISecretFormType = {
  name: string;
  namespace: string;
  type: ISecretType.Opaque;
  items: Array<{
    key: string;
    value: string;
  }>;
};

export type IProductTableFilterValue = string | string[];

export type IProductTableFilters = {
  stock: string[];
  publish: string[];
};

export enum ISecretType {
  Opaque = 'Opaque',
  // key 与 value保持一致
  'kubernetes.io/service-account-token' = 'kubernetes.io/service-account-token',
  'kubernetes.io/dockercfg' = 'kubernetes.io/dockercfg',
  'kubernetes.io/dockerconfigjson' = 'kubernetes.io/dockerconfigjson',
  'kubernetes.io/basic-auth' = 'kubernetes.io/basic-auth',
  'kubernetes.io/ssh-auth' = 'kubernetes.io/ssh-auth',
  'kubernetes.io/tls' = 'kubernetes.io/tls',
  'bootstrap.kubernetes.io/token' = 'bootstrap.kubernetes.io/token',
}

export const SecretTypeLacale = {
  [ISecretType.Opaque]: '自定义类型',
  [ISecretType['kubernetes.io/service-account-token']]: '服务账号令牌',
  [ISecretType['kubernetes.io/dockercfg']]: 'docker配置',
  [ISecretType['kubernetes.io/dockerconfigjson']]: 'docker配置(JSON)',
  [ISecretType['kubernetes.io/basic-auth']]: 'Basic认证凭据',
  [ISecretType['kubernetes.io/ssh-auth']]: 'SSH凭据',
  [ISecretType['kubernetes.io/tls']]: 'TLS凭据',
  [ISecretType['bootstrap.kubernetes.io/token']]: '启动引导令牌数据',
};

export const SecretTypeOptions = Object.keys(ISecretType).map((key: string) => ({
  label: SecretTypeLacale[key as ISecretType],
  value: key,
}));
