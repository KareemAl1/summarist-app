export default function Skeleton() {
  return (
    <div className="skeleton">
      <div className="skeleton__shimmer"></div>
    </div>
  );
}

export function BookSkeleton() {
  return (
    <div className="book-skeleton">
      <div className="skeleton book-skeleton__image"></div>
      <div className="skeleton book-skeleton__title"></div>
      <div className="skeleton book-skeleton__author"></div>
      <div className="skeleton book-skeleton__subtitle"></div>
      <div className="skeleton book-skeleton__rating"></div>
    </div>
  );
}

export function SelectedBookSkeleton() {
  return (
    <div className="selected-book-skeleton">
      <div className="skeleton selected-book-skeleton__subtitle"></div>
      <div className="selected-book-skeleton__separator"></div>
      <div className="selected-book-skeleton__content">
        <div className="skeleton selected-book-skeleton__image"></div>
        <div className="selected-book-skeleton__text">
          <div className="skeleton selected-book-skeleton__title"></div>
          <div className="skeleton selected-book-skeleton__author"></div>
          <div className="skeleton selected-book-skeleton__duration"></div>
        </div>
      </div>
    </div>
  );
}

export function BookDetailSkeleton() {
  return (
    <div className="book-detail-skeleton">
      <div className="book-detail-skeleton__header">
        <div className="book-detail-skeleton__content">
          <div className="skeleton book-detail-skeleton__title"></div>
          <div className="skeleton book-detail-skeleton__author"></div>
          <div className="skeleton book-detail-skeleton__subtitle"></div>
          <div className="book-detail-skeleton__stats">
            <div className="skeleton book-detail-skeleton__stat"></div>
            <div className="skeleton book-detail-skeleton__stat"></div>
            <div className="skeleton book-detail-skeleton__stat"></div>
          </div>
        </div>
        <div className="skeleton book-detail-skeleton__image"></div>
      </div>
      <div className="skeleton book-detail-skeleton__description"></div>
      <div className="skeleton book-detail-skeleton__description"></div>
    </div>
  );
}