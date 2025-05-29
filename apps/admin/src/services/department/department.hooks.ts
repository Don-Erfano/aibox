import { useQuery } from '@tanstack/react-query';

import { DepartmentService } from './department.service';

const departmentService = new DepartmentService();

export const useGetAllDepartments = () =>
  useQuery({
    queryKey: ['allDepartments'],
    queryFn: () => departmentService.getAllDepartments(),
  });
