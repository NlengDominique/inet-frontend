export interface Book{
  id:string;
  title:string;
  author:string;
  publicationDate:string;
  summary:string;
  totalCopies:number;
  availableCopies:number;
  minCopiesThreshold:number;
}

export interface BookResponse{
  id:string;
  title:string;
  author:string;
  publicationDate:string;
  summary:string;
  totalCopies:number;
  availableCopies:number;
  minCopiesThreshold:number;
  availableForLoan:boolean;
  imageUrl:string;
  createdAt:string;
}


export interface BookRequest{
  title:string;
  author:string;
  publicationDate:string;
  summary:string;
  totalCopies:number;
  minCopiesThreshold:number;
}

export type UpdateBookRequest = Partial<BookRequest>;
