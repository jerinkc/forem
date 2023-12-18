import { h } from 'preact';
import PropTypes from 'prop-types';

export function Badge({ badge, onBadgeSelection }) {
  const { title, badge_image } = badge;

  const handleBadgeKeyDown = ({ event, badge }) => {
    if (event.key === 'Enter') {
      onBadgeSelection(badge);
    }
  };

  return (
    <div
      role="button"
      className="badge-container crayons-card media-card"
      onClick={() => onBadgeSelection(badge)}
      onKeyDown={(event) => handleBadgeKeyDown({ event, badge })}
      tabIndex="0"
    >
      <div className="badge-image-container p-3">
        <img
          className="badge-image"
          loading="lazy"
          src={badge_image.url}
          alt={title}
          title={title}
        />
      </div>
      <p
        aria-hidden="true"
        className="title align-center fw-bold fs-s flex lh-base justify-center p-3"
      >
        {title}
      </p>
    </div>
  );
}

Badge.protoTypes = {
  badge: PropTypes.shape({
    title: PropTypes.string.isRequired,
    badge_image: PropTypes.string.isRequired,
  }),
  onBadgeSelection: PropTypes.func.isRequired,
};
