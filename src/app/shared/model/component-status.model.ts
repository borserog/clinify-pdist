export interface ListingStatus {
  loading: boolean;
  statusMessage: string;
}

export const listingStatusInitialState: ListingStatus = {
  loading: false,
  statusMessage: ''
};

export const createListingStatusErrorState = (message: string): ListingStatus => {
  return { loading: false, statusMessage: message } ;
};

export const createListingStatusLoadingState = (message: string): ListingStatus => {
  return { loading: true, statusMessage: message } ;
};

export const createListingStatusLoadedState = (message: string): ListingStatus => {
  return { loading: false, statusMessage: message } ;
};
