export interface Collection {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  english_name: string;
  is_active: boolean;
  rank: number;
  picture: string;
}

export interface CollectionInfo {
  name: string;
  english_name: string;
  api_order_by: string;
  rank: number;
  api_query: string;
  picture: File;
  is_active: string;
  description: string;
}

export interface CollectionSeo {
  title: string;
  meta_description: string;
  meta_keywords: string;
  canoncial: string;
  robots: string;
  image: string;
}
