const tool = [{
  type: 'add',
  event: 'add',
}, {
  type: 'on-store',
  event: 'on-store',
}, {
  type: 'off-store',
  event: 'off-store',
}, {
  type: 'delete',
  event: 'delete',
}];

const onstore = [{
  type: 'cancel',
  event: 'cancel',
}, {
  type: 'on-store',
  event: 'on-store',
}];

const offstore = [{
  type: 'cancel',
  event: 'cancel',
}, {
  type: 'off-store',
  event: 'off-store',
}];

const deleteType = [{
  type: 'cancel',
  event: 'cancel',
}, {
  type: 'delete',
  event: 'delete',
}];


export default {
  tool,
  onstore,
  offstore,
  deleteType,
};
