import {
  get,
  post,
  patch,
  upload,
} from './request-methods';

export const createDish = (params, res, err) => upload(
  '/api/v1/dish/store',
  params,
).then(res).catch(err);

export const creatSet = (params, res, err) => upload(
  '/api/v1/dish/set/store',
  params,
).then(res).catch(err);

export const getDishTypeList = (res, err) => get(
  '/api/v1/dish/type/all',
).then(res).catch(err);

export const getTagList = (res, err) => get(
  '/api/v1/tag/all',
).then(res).catch(err);

export const getDishCategoryList = (res, err) => get(
  '/api/v1/dish/category/all',
).then(res).catch(err);

export const getDishList = (params, res, err) => post(
  '/api/v1/dish/all',
  params,
).then(res).catch(err);

export const getSetList = (params, res, err) => post(
  '/api/v1/dish/set/all',
  params,
).then(res).catch(err);

export const getDishDetail = (params, res, err) => post(
  '/api/v1/dish/single',
  params,
).then(res).catch(err);

export const getSetDetail = (params, res, err) => post(
  '/api/v1/dish/set/single',
  params,
).then(res).catch(err);

export const updateDishDetail = (params, res, err) => upload(
  '/api/v1/dish/update',
  params,
).then(res).catch(err);

export const updateSetDetail = (params, res, err) => upload(
  '/api/v1/dish/set/update',
  params,
).then(res).catch(err);

export const updateDishStatus = (params, res, err) => patch(
  '/api/v1/dish/update/status',
  params,
).then(res).catch(err);

export const updateSetStatus = (params, res, err) => patch(
  '/api/v1/dish/set/update/status',
  params,
).then(res).catch(err);

// 餐廳相關
export const getRestaurantList = (params, res, err) => post(
  '/api/v1/restaurant/all',
  params,
).then(res).catch(err);

export const updateRestaurantStatus = (params, res, err) => patch(
  '/api/v1/restaurant/update/status',
  params,
).then(res).catch(err);

export const getRestaurantTypeList = (res, err) => get(
  '/api/v1/restaurant/type/all',
).then(res).catch(err);

export const createRestaurant = (params, res, err) => upload(
  '/api/v1/restaurant/store',
  params,
).then(res).catch(err);

export const getRestaurantDetail = (params, res, err) => post(
  '/api/v1/restaurant/single',
  params,
).then(res).catch(err);

export const updateRestaurantDetail = (params, res, err) => upload(
  '/api/v1/restaurant/update',
  params,
).then(res).catch(err);

export const login = (params, res, err) => post(
  '/api/v1/auth/login',
  params,
).then(res).catch(err);

export default {
  createDish,
  creatSet,
  getTagList,
  getDishTypeList,
  getDishCategoryList,
  getDishList,
  getSetList,
  getDishDetail,
  getSetDetail,
  updateDishDetail,
  updateSetDetail,
  updateDishStatus,
  updateSetStatus,
  // 餐廳相關
  getRestaurantList,
  updateRestaurantStatus,
  getRestaurantTypeList,
  createRestaurant,
  getRestaurantDetail,
  updateRestaurantDetail,
  login,
};
