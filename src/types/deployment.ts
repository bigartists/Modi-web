export type IDeploymentItem = {
  CreateTime: string;
  Images: string;
  IsComplete: boolean;
  Message: string;
  Name: string;
  Namespace: string;
  Pods: any;
  Replicas: number[];
};

export type IPodItem = {
  Name: string;
  Images: string;
  NodeName: string;
  Namespace: string;
  DeploymentName: string;
  CreateTime: string;
  Phase: string;
  Message: string;
  IsReady: boolean;
};
