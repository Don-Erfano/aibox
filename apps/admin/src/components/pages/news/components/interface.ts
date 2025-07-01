import { NewsSchemaType } from '../schema';

export interface UserFormProps {
  title: string;
  initialData?: Partial<NewsSchemaType>;
  onSubmit: (data: NewsSchemaType) => void;
  isLoading?: boolean;
}
