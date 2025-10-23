interface IResource {
  scope: string;
  total: number;
  free: number;
}

interface IGetResourcesResponsePayload {
  resources: IResource[];
}

interface IResourceDetail {
  gpu_info: string;
  profile: string;
  total: number;
  free: number;
}

interface IResourceDetailResponsePayload {
  resources: IResourceDetail[];
  profiles: string[];
  page_count: number;
  total_count: number;
}

interface IModels {
  resources: IResourceDetail[];
  profiles: string[];
}

interface IResourceDetailRequestPayload {
  profile: string;
  page: number;
  page_size: number;
  search: string;
  ordering: string;
}

interface INode {
  status: string;
  node_name: string;
  pod_name: string;
}

interface IGetNodesResponsePayload {
  nodes: INode[];
  page_count: number;
  total_count: number;
}

interface IGetNodesRequestPayload {
  page: number;
  page_size: number;
  search: string;
  status: string;
}

export type {
  INode,
  IModels,
  IResource,
  IResourceDetail,
  IGetNodesRequestPayload,
  IGetNodesResponsePayload,
  IGetResourcesResponsePayload,
  IResourceDetailRequestPayload,
  IResourceDetailResponsePayload,
};
