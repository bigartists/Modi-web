// 定义 KindStore
export type IKind = {
  namespace: string;
};

export type IKindActions = {
  updateNamespace: (kind: IKind['namespace']) => void;
};

export const kindStore = (set: any, get: any) => ({
  namespace: '',
  updateNamespace: (namespace: IKind['namespace']) => set({ namespace }),
});
