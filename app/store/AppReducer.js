import { AppActions } from "./AppActions";

export const AppReducer = (state, action) => {
  switch (action.type) {
    // case AppActions.SET_DATA:
    //   return {
    //     ...state,
    //     url: action.payload.url,
    //     title: action.payload.title,
    //     thumbs: action.payload.thumbs,
    //     slides: action.payload.slides,
    //     slideSize: action.payload.slides.size,
    //   };
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
    default:
      return state;
  }
};
