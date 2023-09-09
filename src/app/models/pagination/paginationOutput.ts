export interface PaginationOutput<T> {
    content: T[]
    pageable: {
      sort: {
          empty: boolean,
          sorted: boolean,
          unsorted: boolean
      },
      offset: number,
      pageNumber: number,
      pageSize: number,
      paged: boolean,
      unpaged: boolean
    },
    last: boolean,
    totalElements: number,
    totalPages: number,
    size: number,
    number: number,
    sort: {
      empty: boolean,
      sorted: boolean,
      unsorted: boolean
    },
    numberOfElements: number,
    first: boolean,
    empty: boolean
  }
  