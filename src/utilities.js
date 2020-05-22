import messages from './toolbox/messages';

export default {
  methods: {
    showPopup(type) {
      this.popType = type;
      this.$root.$emit('bv::show::modal', 'popup');
    },
    verifyEmailFormat(email) {
      // eslint-disable-next-line no-useless-escape
      const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return reg.test(email);
    },
    isInt(val) {
      const reg = /^[0-9]+$/;
      return reg.test(val);
    },
    replaceComma(val) {
      return val.replace(/,/g, '');
    },
    msgContent(type) {
      let errMsg = '';
      messages.msg.forEach((item) => {
        if (type === item.type) {
          errMsg = item.message;
        }
      });
      return errMsg;
    },
    isDataEmpty(data) {
      let isEmpty = false;
      // eslint-disable-next-line no-restricted-syntax
      for (const pair of data.entries()) {
        if (pair[1] === '' || pair[1] === 'undefined' || pair[1] === 'null' || pair[1] === '[]') {
          isEmpty = true;
          return isEmpty;
        }
      }
      return isEmpty;
    },
    // eslint-disable-next-line camelcase
    async promiseAll(APIs_array, res, err) {
      Promise.all(APIs_array).then(res).catch(err);
    },
    copyData(initData) {
      if (Array.isArray(initData)) {
        return Object.assign([], initData);
      }
      return Object.assign({}, initData);
    },
    checkUpdata(data) {
      // 更改 tags 型態
      if (!Array.isArray(data.lastSetData.tags) && Array.isArray(data.dataCopy.tags)) {
        // eslint-disable-next-line no-param-reassign
        data.dataCopy.tags = data.dataCopy.tags.join(',');
      }
      const dataCopyString = JSON.stringify(data.dataCopy);
      const lasTestDataString = JSON.stringify(data.lastSetData);
      return dataCopyString !== lasTestDataString;
    },
  },
};
