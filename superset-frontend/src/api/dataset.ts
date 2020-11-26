import { SupersetClient, JsonResponse } from '@superset-ui/core';
import rison from 'rison';

export const get = async (userId: number) => {
  const queryParams = rison.encode({
    filters: [
      {
        col: 'owners',
        opr: 'rel_m_m',
        value: userId,
      },
    ],
    order_column: 'changed_on_delta_humanized',
    order_direction: 'desc',
  });
  const endpoint = `/api/v1/dataset?q=${queryParams}`;
  const data: JsonResponse = await SupersetClient.get({
    endpoint,
  });
  return data.json.result;
};
