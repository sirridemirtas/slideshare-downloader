import { AppActions } from "./AppActions";

export const AppReducer = (state, action) => {
  switch (action.type) {
    case AppActions.SET_URL:
      return { ...state, url: action.payload };
    case AppActions.SET_TITLE:
      return { ...state, title: action.payload };
    case AppActions.SET_SLIDE_SIZE:
      return { ...state, slideSize: action.payload };
    case AppActions.SET_THUMBS:
      return { ...state, thumbs: action.payload };
    case AppActions.SET_SLIDES:
      return { ...state, slides: action.payload };
    case AppActions.SET_INVALID_URL:
      return { ...state, invalidUrl: action.payload };
    default:
      return state;
  }
};
