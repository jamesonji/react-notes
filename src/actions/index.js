export const FLASH_MESSAGE = 'FLASH_MESSAGE';
export const DISMISS_MESSAGE = 'DISMISS_MESSAGE';

export const sendFlashMessage = (message, className) => {

  return {
    type: FLASH_MESSAGE,
    payload: {
      message,
      className
    }
  }
};

export const dismissMessage = () => {
  return {
    type: DISMISS_MESSAGE,
    payload: {
      message: null,
      className: null
    }
  }
};

