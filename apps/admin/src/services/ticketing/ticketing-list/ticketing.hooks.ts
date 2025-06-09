import TicketingService from './ticketing.service';
import { useQueryParams } from '@/hooks/useQueryParams';
import {
  keepPreviousData,
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {
  IGetTicketListRequest,
  ITicket,
  IPostTicketRequest,
  IAssignTicketPathParams,
  IAssignTicketRequest,
  IAssignTicketResponse,
  IUpdateTicketStatusRequest,
  IUpdateTicketStatusResponsePayload,
  IGetTicketListResponse,
} from './interface';

const ticketingService = new TicketingService();

export const useGetTicketList = () => {
  const allQueryParams = useQueryParams();

  let totalPages = 0;
  let totalItems = 0;

  const {
    data: tickets = [],
    isLoading,
    isFetching,
    refetch,
  } = useQuery<IGetTicketListResponse, Error, ITicket[]>({
    queryKey: ['ticketList', allQueryParams],
    queryFn: async ({ queryKey }) => {
      const { page, ...rest } = queryKey[1] as IGetTicketListRequest & {
        page?: number;
      };
      const params: IGetTicketListRequest = {
        page_number: page ?? 1,
        page_size: 10,
        ...rest,
      };
      const resp = await ticketingService.getTicketList(params);
      return resp.data.data;
    },
    select: (payload) => {
      totalPages = payload.page_count;
      totalItems = payload.total_count;
      return payload.data;
    },
    placeholderData: keepPreviousData,
  });

  return { tickets, totalItems, totalPages, isLoading, isFetching, refetch };
};

export const useCreateTicket = () => {
  const queryClient = useQueryClient();

  return useMutation<ITicket, Error, IPostTicketRequest>({
    mutationFn: async (payload) => {
      const resp = await ticketingService.postTicket(payload);
      return resp.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ticketList'] });
    },
  });
};

export const useAssignTicket = () => {
  const queryClient = useQueryClient();

  type Vars = {
    path: IAssignTicketPathParams;
    payload: IAssignTicketRequest;
  };

  return useMutation<IAssignTicketResponse, Error, Vars>({
    mutationFn: async ({ path, payload }: Vars) => {
      const resp = await ticketingService.assignTicket(path, payload);
      return resp.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ticketList'] });
    },
  });
};

export const useUpdateTicketStatus = () => {
  const queryClient = useQueryClient();

  return useMutation<
    IUpdateTicketStatusResponsePayload,
    Error,
    IUpdateTicketStatusRequest
  >({
    mutationFn: async (payload) => {
      const resp = await ticketingService.updateTicketStatus(payload);
      return resp.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ticketList'] });
    },
  });
};
