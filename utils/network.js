const NEWS_URL = "https://test-miniprogram.com/api/news";
const NEWS_LIST_URL = NEWS_URL + "/list";
const NEWS_DETAIL_URL = NEWS_URL + "/detail";

function get(url, params) {
  let promise = new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: params,
      method: 'GET',
      success: resolve,
      fail: reject,
    })
  })

  return promise;
}

function formatTime(isoString) {
  const date = new Date(isoString)
  return `${new Intl.DateTimeFormat('chinese').format(date)} ${date.getHours()}:${date.getMinutes()}`
}

export function getNewsList(newsType) {
  return get(NEWS_LIST_URL, {"type": newsType})
            .then(res => res.data.result.map(item => {
              item.date = formatTime(item.date)
              return item;
            }));
}

export function getNewDetail(id) {
  return get(NEWS_DETAIL_URL, {"id": id})
          .then(res => res);
}