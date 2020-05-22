import {
  post,
  patch,
  upload,
} from '../../request-methods';

export const Create = (params, res, err) => upload(
  '/api/v2/restaurant/store',
  params,
).then(res).catch(err);

export const GetAll = (params, res, err) => post(
  '/api/v2/restaurant/all',
  params,
).then(res).catch(err);

export const GetOne = (params, res, err) => post(
  '/api/v2/restaurant/one',
  params,
).then(res).catch(err);

export const Update = (params, res, err) => upload(
  '/api/v2/restaurant/update',
  params,
).then(res).catch(err);

export const UpdateStatus = (params, res, err) => patch(
  '/api/v2/restaurant/update/status',
  params,
).then(res).then(err);

export default {
  name: 'restaurant',
  Create,
  GetAll,
  GetOne,
  Update,
  UpdateStatus,
};
