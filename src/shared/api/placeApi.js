import api from './index';

const getMainList = () => api.get('main');

const getSearchCondition = params => {
  return api.get(
    `search/condition?weather=${params.weather}&category=${params.category}&num=${params.num}&gender=${params.gender}`,
  );
};

const getSearchConditionList = params => api.get(`${params}`);
const getPlaceDetail = params => api.get(`posts/${params}`);

/* post 좋아요 */
const postFavoritesPost = params =>
  api.post(`posts/${params.postId}/favorites`);

/* post 좋아요 삭제 */
const deleteFavoritesPost = params =>
  api.delete(`posts/${params.postId}/favorites`);

/* post 가본곳 추가 */
const postVisitedPost = params =>
  api.post(`posts/${params.postId}/visitedPosts`);

/* post 가본곳 삭제 */
const deleteVisitedPost = params =>
  api.delete(`posts/${params.postId}/visitedPosts`);

// 리뷰
const getReviewPostInfo = params => api.get(`/posts/${params}/reviews/write`);
// 최신순
const getReviewList = params =>
  api.get(
    `/posts/${params.postId}/reviews/pages/${params.pageNumbr}/orders/latest`,
  );
const getReviewLikesList = params =>
  api.get(
    `/posts/${params.postId}/reviews/pages/${params.pageNumbr}/orders/likes`,
  );
const addReview = (params, config) =>
  api.post(`/posts/${params.postId}/reviews`, params.data, config);

const updateReview = (params, config) =>
  api.put(
    `/posts/${params.postId}/reviews/${params.reviewId}`,
    params.data,
    config,
  );

const deleteReview = params =>
  api.delete(`/posts/${params.postId}/reviews/${params.reviewId}`);

const reviewLike = params =>
  api.post(`/posts/${params.postId}/reviews/${params.reviewId}/likes`);

export {
  getMainList,
  getSearchCondition,
  getPlaceDetail,
  getSearchConditionList,
  postFavoritesPost,
  deleteFavoritesPost,
  postVisitedPost,
  deleteVisitedPost,
  getReviewPostInfo,
  getReviewList,
  getReviewLikesList,
  addReview,
  updateReview,
  deleteReview,
  reviewLike,
};
