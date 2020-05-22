import {
  get,
  post,
} from '../../request-methods';

export const GetAll = (res, err) => get(
  '/api/v2/tag/category/all',
).then(res).catch(err);

export const Create = (params, res, err) => post(
  '/api/v2/tag/category/store',
  params,
).then(res).catch(err);

export const Update = (params, res, err) => post(
  '/api/v2/tag/category/update',
  params,
).then(res).catch(err);

export const UpdateSort = (params, res, err) => post(
  '/api/v2/tag/category/update/sort',
  params,
).then(res).catch(err);

export default {
  name: 'tagCategories',
  GetAll,
  Create,
  Update,
  UpdateSort,
};
