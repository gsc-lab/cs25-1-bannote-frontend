export interface Tag {
  tag_id: string;
  name: string;
  created_by: string;
  created_at: string | null;
}

export interface Group {
  tags: Tag[];
  group_id: string;
  group_code: string;
  group_type_id: string;
  group_name: string;
  group_description: string;
  is_public: boolean;
  is_published: boolean;
  color_default: string;
  color_highlight: string;
  created_at: string | null;
  updated_at: string | null;
  deleted_at: string | null;
  created_by: string;
  updated_by: string;
  deleted_by: string;
}

export interface GroupMemberResponse {
  data: Group[];
}
