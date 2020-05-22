import {
  post,
  patch, upload,
} from '../../request-methods';

export const Create = (params, res, err) => upload(
  '/api/v2/dish/store',
  params,
).then(res).catch(err);

export const GatAll = (params, res, err) => post(
  '/api/v2/dish/all',
  params,
).then(res).catch(err);

export const GetOne = (params, res, err) => post(
  '/api/v2/dish/one',
  params,
).then(res).catch(err);

export const Update = (params, res, err) => upload(
  '/api/v2/dish/update',
  params,
).then(res).catch(err);

export const UpdateStatus = (params, res, err) => patch(
  '/api/v2/dish/update/status',
  params,
).then(res).catch(err);

export default {
  name: 'dish',
  Create,
  GatAll,
  GetOne,
  Update,
  UpdateStatus,
};
