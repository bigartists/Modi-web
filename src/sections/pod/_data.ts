const containers = {
  metadata: {
    name: 'taichu-web-6d65b576d4-7v272',
    generateName: 'taichu-web-6d65b576d4-',
    namespace: 'infra',
    uid: 'd080eeb7-4bdf-45a2-b648-26ca9cc85d14',
    resourceVersion: '139726290',
    creationTimestamp: '2024-06-22T13:34:06Z',
    labels: { app: 'taichu-web', 'pod-template-hash': '6d65b576d4' },
    ownerReferences: [
      {
        apiVersion: 'apps/v1',
        kind: 'ReplicaSet',
        name: 'taichu-web-6d65b576d4',
        uid: '3c4b2339-3192-43ef-b67f-8fa987774634',
        controller: true,
        blockOwnerDeletion: true,
      },
    ],
    managedFields: [
      {
        manager: 'kube-controller-manager',
        operation: 'Update',
        apiVersion: 'v1',
        time: '2024-06-22T13:34:06Z',
        fieldsType: 'FieldsV1',
        fieldsV1: {
          'f:metadata': {
            'f:generateName': {},
            'f:labels': { '.': {}, 'f:app': {}, 'f:pod-template-hash': {} },
            'f:ownerReferences': {
              '.': {},
              'k:{"uid":"3c4b2339-3192-43ef-b67f-8fa987774634"}': {},
            },
          },
          'f:spec': {
            'f:containers': {
              'k:{"name":"taichu-web"}': {
                '.': {},
                'f:env': {
                  '.': {},
                  'k:{"name":"ilogtail"}': { '.': {}, 'f:name': {}, 'f:value': {} },
                },
                'f:image': {},
                'f:imagePullPolicy': {},
                'f:livenessProbe': {
                  '.': {},
                  'f:failureThreshold': {},
                  'f:initialDelaySeconds': {},
                  'f:periodSeconds': {},
                  'f:successThreshold': {},
                  'f:tcpSocket': { '.': {}, 'f:port': {} },
                  'f:timeoutSeconds': {},
                },
                'f:name': {},
                'f:ports': {
                  '.': {},
                  'k:{"containerPort":80,"protocol":"TCP"}': {
                    '.': {},
                    'f:containerPort': {},
                    'f:protocol': {},
                  },
                },
                'f:readinessProbe': {
                  '.': {},
                  'f:failureThreshold': {},
                  'f:initialDelaySeconds': {},
                  'f:periodSeconds': {},
                  'f:successThreshold': {},
                  'f:tcpSocket': { '.': {}, 'f:port': {} },
                  'f:timeoutSeconds': {},
                },
                'f:resources': {
                  '.': {},
                  'f:limits': { '.': {}, 'f:cpu': {}, 'f:memory': {} },
                  'f:requests': { '.': {}, 'f:cpu': {}, 'f:memory': {} },
                },
                'f:terminationMessagePath': {},
                'f:terminationMessagePolicy': {},
                'f:volumeMounts': {
                  '.': {},
                  'k:{"mountPath":"/etc/localtime"}': { '.': {}, 'f:mountPath': {}, 'f:name': {} },
                },
              },
            },
            'f:dnsPolicy': {},
            'f:enableServiceLinks': {},
            'f:imagePullSecrets': { '.': {}, 'k:{"name":"ee"}': {} },
            'f:restartPolicy': {},
            'f:schedulerName': {},
            'f:securityContext': {},
            'f:serviceAccount': {},
            'f:serviceAccountName': {},
            'f:terminationGracePeriodSeconds': {},
            'f:volumes': {
              '.': {},
              'k:{"name":"timezone"}': {
                '.': {},
                'f:hostPath': { '.': {}, 'f:path': {}, 'f:type': {} },
                'f:name': {},
              },
            },
          },
        },
      },
      {
        manager: 'kubelet',
        operation: 'Update',
        apiVersion: 'v1',
        time: '2024-06-22T13:46:54Z',
        fieldsType: 'FieldsV1',
        fieldsV1: {
          'f:status': {
            'f:conditions': {
              'k:{"type":"ContainersReady"}': {
                '.': {},
                'f:lastProbeTime': {},
                'f:lastTransitionTime': {},
                'f:status': {},
                'f:type': {},
              },
              'k:{"type":"Initialized"}': {
                '.': {},
                'f:lastProbeTime': {},
                'f:lastTransitionTime': {},
                'f:status': {},
                'f:type': {},
              },
              'k:{"type":"Ready"}': {
                '.': {},
                'f:lastProbeTime': {},
                'f:lastTransitionTime': {},
                'f:status': {},
                'f:type': {},
              },
            },
            'f:containerStatuses': {},
            'f:hostIP': {},
            'f:phase': {},
            'f:podIP': {},
            'f:podIPs': { '.': {}, 'k:{"ip":"10.42.2.25"}': { '.': {}, 'f:ip': {} } },
            'f:startTime': {},
          },
        },
        subresource: 'status',
      },
    ],
  },
  spec: {
    volumes: [
      { name: 'timezone', hostPath: { path: '/usr/share/zoneinfo/Asia/Shanghai', type: '' } },
      {
        name: 'kube-api-access-fmjp6',
        projected: {
          sources: [
            { serviceAccountToken: { expirationSeconds: 3607, path: 'token' } },
            { configMap: { name: 'kube-root-ca.crt', items: [{ key: 'ca.crt', path: 'ca.crt' }] } },
            {
              downwardAPI: {
                items: [
                  {
                    path: 'namespace',
                    fieldRef: { apiVersion: 'v1', fieldPath: 'metadata.namespace' },
                  },
                ],
              },
            },
          ],
          defaultMode: 420,
        },
      },
    ],
    containers: [
      {
        name: 'taichu-web',
        image: 'swr.cn-central-221.ovaijisuan.com/taichu-studio/taichu-web:48482a5e',
        ports: [{ containerPort: 80, protocol: 'TCP' }],
        env: [{ name: 'ilogtail', value: 'true' }],
        resources: {
          limits: { cpu: '1', memory: '1Gi' },
          requests: { cpu: '500m', memory: '512Mi' },
        },
        volumeMounts: [
          { name: 'timezone', mountPath: '/etc/localtime' },
          {
            name: 'kube-api-access-fmjp6',
            readOnly: true,
            mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
          },
        ],
        livenessProbe: {
          tcpSocket: { port: 80 },
          initialDelaySeconds: 15,
          timeoutSeconds: 1,
          periodSeconds: 20,
          successThreshold: 1,
          failureThreshold: 3,
        },
        readinessProbe: {
          tcpSocket: { port: 80 },
          initialDelaySeconds: 5,
          timeoutSeconds: 1,
          periodSeconds: 10,
          successThreshold: 1,
          failureThreshold: 3,
        },
        terminationMessagePath: '/dev/termination-log',
        terminationMessagePolicy: 'File',
        imagePullPolicy: 'Always',
      },
    ],
    restartPolicy: 'Always',
    terminationGracePeriodSeconds: 30,
    dnsPolicy: 'ClusterFirst',
    serviceAccountName: 'kubeflow-dashboard',
    serviceAccount: 'kubeflow-dashboard',
    nodeName: '192.168.0.226',
    securityContext: {},
    imagePullSecrets: [{ name: 'ee' }],
    schedulerName: 'default-scheduler',
    tolerations: [
      {
        key: 'node.kubernetes.io/not-ready',
        operator: 'Exists',
        effect: 'NoExecute',
        tolerationSeconds: 300,
      },
      {
        key: 'node.kubernetes.io/unreachable',
        operator: 'Exists',
        effect: 'NoExecute',
        tolerationSeconds: 300,
      },
    ],
    priority: 0,
    enableServiceLinks: true,
    preemptionPolicy: 'PreemptLowerPriority',
  },
  status: {
    phase: 'Running',
    conditions: [
      {
        type: 'Initialized',
        status: 'True',
        lastProbeTime: null,
        lastTransitionTime: '2024-06-22T13:34:06Z',
      },
      {
        type: 'Ready',
        status: 'True',
        lastProbeTime: null,
        lastTransitionTime: '2024-06-22T13:46:54Z',
      },
      {
        type: 'ContainersReady',
        status: 'True',
        lastProbeTime: null,
        lastTransitionTime: '2024-06-22T13:46:54Z',
      },
      {
        type: 'PodScheduled',
        status: 'True',
        lastProbeTime: null,
        lastTransitionTime: '2024-06-22T13:34:06Z',
      },
    ],
    hostIP: '192.168.0.226',
    podIP: '10.42.2.25',
    podIPs: [{ ip: '10.42.2.25' }],
    startTime: '2024-06-22T13:34:06Z',
    containerStatuses: [
      {
        name: 'taichu-web',
        state: { running: { startedAt: '2024-06-22T13:46:42Z' } },
        lastState: {
          terminated: {
            exitCode: 0,
            reason: 'Completed',
            startedAt: '2024-06-22T13:38:33Z',
            finishedAt: '2024-06-22T13:44:06Z',
            containerID:
              'docker://ed6899f620d9d145d9d8801162ec2b8da65af1cc7db891ed33cad4f8b2b52fd1',
          },
        },
        ready: true,
        restartCount: 1,
        image: 'swr.cn-central-221.ovaijisuan.com/taichu-studio/taichu-web:48482a5e',
        imageID:
          'docker-pullable://swr.cn-central-221.ovaijisuan.com/taichu-studio/taichu-web@sha256:59ce7b5f74f5054ea3905c2c9ad550e26d48c20d0fcfed13d3d62fd556bf1fe9',
        containerID: 'docker://7cae4e76190a864565914ada932d718194fd0a63ed874b2ff1a445223cf60cdc',
        started: true,
      },
    ],
    qosClass: 'Burstable',
  },
};
