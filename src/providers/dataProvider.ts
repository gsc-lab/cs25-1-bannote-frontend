import { DataProvider, fetchUtils } from "react-admin";
import { stringify } from "query-string";

// const apiUrl = "http://210.101.236.160:8201/api";
const apiUrl = "http://localhost:8080/api";

// 쿠키를 자동으로 포함하는 httpClient
const httpClient = (url: string, options: fetchUtils.Options = {}) => {
  return fetchUtils.fetchJson(url, {
    ...options,
    credentials: "include", // 쿠키 자동 포함
  });
};

// 리소스별 ID 필드 매핑
const ID_FIELD_MAP: Record<string, string> = {
  departments: "department_code",
  studentclasses: "student_class_code",
  users: "user_code",
  // 필요한 리소스 추가
};

// 백엔드 응답을 React Admin 형식으로 변환
const transformResponse = (resource: string, data: any) => {
  const idField = ID_FIELD_MAP[resource] || "id";

  if (Array.isArray(data)) {
    return data.map((item) => ({
      id: item[idField],
      ...item,
    }));
  }

  return {
    id: data[idField],
    ...data,
  };
};

export const dataProvider: DataProvider = {
  getList: (resource, params) => {
    const { page, perPage } = params.pagination;
    // const { field, order } = params.sort;
    const query: any = {
      page: page - 1,
      size: perPage,
    };

    // 필터 추가
    if (params.filter) {
      Object.keys(params.filter).forEach((key) => {
        query[key] = params.filter[key];
      });
    }

    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url).then(({ json }) => {
      // 백엔드 응답: { departments: [...], total_count: 1 }
      const items = json[resource] || json.data || [];
      const total = json.total || json.total_count;

      return {
        data: transformResponse(resource, items),
        total: total,
      };
    });
  },

  getOne: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
      data: transformResponse(resource, json),
    })),

  getMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    const url = `${apiUrl}/${resource}/many?${stringify(query)}`;
    return httpClient(url).then(({ json }) => ({ data: json }));
  },

  getManyReference: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify({
        ...params.filter,
        [params.target]: params.id,
      }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url).then(({ headers, json }) => ({
      data: json,
      total: parseInt(
        (headers.get("content-range") || "0").split("/").pop() || "0",
        10,
      ),
    }));
  },

  update: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "PATCH",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json })),

  updateMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json }));
  },

  create: (resource, params) =>
    httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: { ...params.data, id: json.id } as any,
    })),

  delete: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "DELETE",
    }).then(({ json }) => ({ data: json })),

  deleteMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
      method: "DELETE",
    }).then(({ json }) => ({ data: json }));
  },
};
