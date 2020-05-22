import {
  patch,
  post, upload,
} from '../../request-methods';

export const Create = (params, res, err) => upload(
  '/api/v2/dishSet/store',
  params,
).then(res).catch(err);

export const GetAll = (params, res, err) => post(
  '/api/v2/dishSet/all',
  params,
).then(res).catch(err);

export const GetOne = (params, res, err) => post(
  '/api/v2/dishSet/one',
  params,
).then(res).catch(err);

export const Update = (params, res, err) => upload(
  '/api/v2/dishSet/update',
  params,
).then(res).catch(err);

export const UpdateStatus = (params, res, err) => patch(
  '/api/v2/dishSet/update/status',
  params,
).then(res).catch(err);

export default {
  name: 'dishSet',
  Create,
  GetAll,
  GetOne,
  Update,
  UpdateStatus,
};
