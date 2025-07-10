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
  IGetAllTicketsResponse,
  ITicketWithLastMessage,
  IUpdateTicketCategoryPathParams,
  IUpdateTicketCategoryPayload,
  IGetTicketDetailResponse,
  IAnswerTicketPathParams,
  IAnswerTicketPayload,
  IAnswerTicketResponse,
} from './interface';
import { INetworkResponse } from '@aibox/services';

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

export const useGetAllTickets = () => {
  const allQueryParams = useQueryParams();

  const {
    data: tickets = [],
    isLoading,
    isFetching,
    refetch,
  } = useQuery<IGetAllTicketsResponse, Error, ITicketWithLastMessage[]>({
    queryKey: ['allTickets', allQueryParams],
    queryFn: async ({ queryKey }) => {
      const params = queryKey[1] as IGetTicketListRequest;
      const resp = await ticketingService.getAllTickets(params);
      return resp.data.data;
    },
    select: (payload) => {
      return payload.results;
    },
    placeholderData: keepPreviousData,
  });

  return { tickets, isLoading, isFetching, refetch };
};

export const useUpdateTicketCategory = () => {
  const queryClient = useQueryClient();

  type Vars = {
    path: IUpdateTicketCategoryPathParams;
    payload: IUpdateTicketCategoryPayload;
  };

  return useMutation<INetworkResponse<ITicket, string>, Error, Vars>({
    mutationFn: async ({ path, payload }: Vars) => {
      const resp = await ticketingService.updateTicketCategory(path, payload);
      return resp.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ticketList'] });
      queryClient.invalidateQueries({ queryKey: ['allTickets'] });
    },
  });
};

export const useGetTicketDetail = (id: string) => {
  return useQuery<IGetTicketDetailResponse, Error>({
    queryKey: ['ticketDetail', id],
    queryFn: async () => {
      const resp = await ticketingService.getTicketDetail({ id });
      return resp.data;
    },
    enabled: !!id,
  });
};

export const useAnswerTicket = () => {
  const queryClient = useQueryClient();

  type Vars = {
    path: IAnswerTicketPathParams;
    payload: IAnswerTicketPayload;
  };

  return useMutation<IAnswerTicketResponse, Error, Vars>({
    mutationFn: async ({ path, payload }: Vars) => {
      const resp = await ticketingService.answerTicket(path, payload);
      return resp.data.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['ticketList'] });
      queryClient.invalidateQueries({ queryKey: ['allTickets'] });
      queryClient.invalidateQueries({
        queryKey: ['ticketDetail', variables.path.id],
      });
    },
  });
};
