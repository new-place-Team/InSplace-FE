import api from './index';

const getMainList = () => api.get('main');

const getSearchCondition = params => {
  return api.get(
    `search/condition?weather=${params.weather}&category=${params.category}&num=${params.num}&gender=${params.gender}`,
  );
};

const getSearchConditionList = params => api.get(`${params}`);
const getPlaceDetail = params => api.get(`posts/${params}`);

const postFavoritesPost = params =>
  api.post(`posts/${params.postId}/favorites`);

const deleteFavoritesPost = params =>
  api.delete(`posts/${params.postId}/favorites`);

// 리뷰 포스트 정보
const getReviewPostInfo = params => api.get(`/posts/${params}/reviews/write`);
// 리뷰 최신순 조회
const getReviewList = params =>
  api.get(
    `/posts/${params.postId}/reviews/pages/${params.pageNumbr}/orders/latest`,
  );
// 리뷰 추천순 조회
const getReviewLikesList = params =>
  api.get(
    `/posts/${params.postId}/reviews/pages/${params.pageNumbr}/orders/likes`,
  );
// 리뷰 CRUD
const addReview = (params, config) =>
  api.post(`/posts/${params.postId}/reviews`, params.data, config);
const getReviewEdit = params =>
  api.get(`/posts/${params.postId}/reviews/${params.reviewId}/edit`);
const updateReview = (params, config) =>
  api.put(
    `/posts/${params.postId}/reviews/${params.reviewId}`,
    params.data,
    config,
  );
const deleteReview = params =>
  api.delete(`/posts/${params.postId}/reviews/${params.reviewId}`);

// 리뷰 좋아요
const reviewLike = params =>
  api.post(`/posts/${params.postId}/reviews/${params.reviewId}/likes`);
// 리뷰 좋아요 취소
const reviewLikeCancel = params =>
  api.delete(`/posts/${params.postId}/reviews/${params.reviewId}/likes`);

export {
  getMainList,
  getSearchCondition,
  getPlaceDetail,
  getSearchConditionList,
  postFavoritesPost,
  deleteFavoritesPost,
  getReviewPostInfo,
  getReviewList,
  getReviewLikesList,
  addReview,
  getReviewEdit,
  updateReview,
  deleteReview,
  reviewLike,
  reviewLikeCancel,
};
