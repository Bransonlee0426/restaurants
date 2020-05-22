import {
  post,
} from '../../request-methods';

export const Create = (params, res, err) => post(
  '/api/v2/keyword/subitem/store',
  params,
).then(res).catch(err);

export const Update = (params, res, err) => post(
  '/api/v2/keyword/subitem/update',
  params,
).then(res).catch(err);

export const UpdateSort = (params, res, err) => post(
  '/api/v2/keyword/subitem/update/sort',
  params,
).then(res).catch(err);

export default {
  name: 'keySubItem',
  Create,
  Update,
  UpdateSort,
};
