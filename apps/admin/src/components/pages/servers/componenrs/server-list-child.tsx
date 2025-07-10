import { strings } from '@/constant';
import { TableRowDetails, TableRowField } from '@aibox/ui';
import { IDeploymentResult } from '@/services/operation-service/interface';

export const ServerListChild = ({ row }: { row: IDeploymentResult }) => {
  const serverFields: TableRowField<IDeploymentResult>[] = [
    { label: 'image', key: 'image' },
    { label: 'service url', key: 'service_url' },
    { label: strings.pathName, key: 'pvc_name' },
    { label: strings.urlPath, key: 'mount_path' },
    { label: 'port', key: 'port' },
  ];
  return <TableRowDetails data={row} fields={serverFields} />;
};
