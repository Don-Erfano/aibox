import { useMutation } from '@tanstack/react-query';
import UploadService from './upload.service';
import { toast } from '@aibox/ui';
import { IUploadThumbnailNewsResponse } from './interface';

const uploadService = new UploadService();

export const useUploadFile = () =>
  useMutation<IUploadThumbnailNewsResponse, Error, FormData>({
    mutationKey: ['uploadFile'],
    mutationFn: async (file) => {
      const response = await uploadService.uploadThumbnailNews(file);
      return response.data.data;
    },
    onSuccess: (payload) => {
      toast.success('فایل مورد نظر با موفقیت آپلود شد.');
      console.log(payload);
    },
  });
