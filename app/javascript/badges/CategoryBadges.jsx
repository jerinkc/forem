import { h } from 'preact';
import PropTypes from 'prop-types';
import { Badge } from './Badge';

export function CategoryBadges({
  badges,
  onSortOrderChange,
  category,
  onBadgeSelection,
}) {
  const { description } = category;

  return (
    <div id="root" className="sticker-book crayons-card p-6">
      <div className="flex justify-end fw-bold sort">
        <span className="mr-4">Sort</span>
        <select
          id="sortOrder"
          onChange={(e) => onSortOrderChange(e.target.value)}
          className="crayons-select"
          style="width: auto"
        >
          <option value="recent"> Recent </option>
          <option value="alphabetical"> Alphabetical </option>
        </select>
      </div>
      <div className="mt-4 l:mt-7 p-3 s:px-3 m:px-6 l:px-6 xl:px-8">
        <p className="crayons-subtitle-2 description badge-subtitle all-description">
          {description}
        </p>
      </div>
      <div
        className="mt-4 p-3 s:p-3 m:p-6 l:p-6 xl:p-8 grid gap-3 m:gap-4 l:gap-4 l:gap-6 grid-cols-2
          s:grid-cols-2 m:grid-cols-3 l:grid-cols-4 xl:grid-cols-5 mb-6 badge-root"
      >
        {badges.map((badge) => (
          <Badge
            key={badge.slug}
            badge={badge}
            onBadgeSelection={onBadgeSelection}
          />
        ))}
      </div>
    </div>
  );
}

CategoryBadges.protoTypes = {
  badges: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSortOrderChange: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
  onBadgeSelection: PropTypes.func.isRequired,
};
