import {
  post,
  patch, upload,
} from '../../request-methods';

export const GetAll = (params, res, err) => post(
  '/api/v2/dietitians/dishSet/all',
  params,
).then(res).catch(err);

export const GetOne = (params, res, err) => post(
  '/api/v2/dietitians/dishSet/one',
  params,
).then(res).catch(err);

export const Update = (params, res, err) => upload(
  '/api/v2/dietitians/dishSet/update',
  params,
).then(res).catch(err);

export const UpdateStatus = (params, res, err) => patch(
  '/api/v2/dietitians/dishSet/update/status',
  params,
).then(res).catch(err);

export default {
  name: 'dishSetNutritionist',
  GetAll,
  GetOne,
  Update,
  UpdateStatus,
};
