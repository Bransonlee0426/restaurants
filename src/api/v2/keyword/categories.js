import {
  get,
  post,
} from '../../request-methods';


export const GetAll = (res, err) => get(
  '/api/v2/keyword/category/all',
).then(res).catch(err);

export const Create = (params, res, err) => post(
  '/api/v2/keyword/category/store',
  params,
).then(res).catch(err);

export const Update = (params, res, err) => post(
  '/api/v2/keyword/category/update',
  params,
).then(res).catch(err);

export const UpdateSort = (params, res, err) => post(
  '/api/v2/keyword/category/update/sort',
  params,
).then(res).catch(err);

export default {
  name: 'keyCategories',
  GetAll,
  Create,
  Update,
  UpdateSort,
};
