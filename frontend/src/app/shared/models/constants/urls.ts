const BASE_URL = 'http://localhost:5000';


export const CLOTHES_URL = BASE_URL + '/api/clothes';
export const CLOTHES_TAGS_URL = CLOTHES_URL + '/tags';
export const CLOTHES_BY_SEARCH_URL = CLOTHES_URL + '/search/';
export const CLOTHES_BY_TAG_URL = CLOTHES_URL + '/tag/';
export const CLOTHES_BY_ID_URL = CLOTHES_URL + '/';


export const USER_LOGIN_URL = BASE_URL + '/api/users/login';
export const USER_REGISTER_URL = BASE_URL +'/api/users/register';


export const ORDERS_URL = BASE_URL + '/api/orders';
export const ORDER_CREATE_URL = ORDERS_URL + '/create';

export const ORDER_NEW_FOR_CURRENT_USER_URL = ORDERS_URL + '/newOrderForCurrentUser';

export const ORDER_TRACK_URL = ORDERS_URL + '/track/';

