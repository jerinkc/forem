import { h } from 'preact';
import PropTypes from 'prop-types';

import { Modal as CrayonsModal } from '@crayons';

export function BadgeModal({ badge, onClose }) {
  const { title, description, badge_image } = badge;

  const handleCloseKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onClose();
    }
  };

  return (
    <CrayonsModal showHeader={false} title="">
      <div className="h-100 w-100">
        <div className="badge_details">
          <div className="badge-image-container p-3">
            <img
              className="badge-image"
              src={badge_image.url}
              alt={title}
              title={title}
              loading="lazy"
            />
          </div>

          <div className="badge_text_content">
            <h4 className="title fw-800 fs-l">{title}</h4>
            <p className="description">{description}</p>
            <button
              className="got-it-btn items-start c-btn c-btn--primary mb-1"
              onClick={() => onClose()}
            >
              Got it
            </button>
          </div>
          <div
            className="close"
            role="button"
            tabIndex="0"
            onClick={() => onClose()}
            onKeyDown={(event) => handleCloseKeyDown(event)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="close_icon"
            >
              <title>Close</title>
              <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636l4.95 4.95z" />
            </svg>
          </div>
        </div>
      </div>
    </CrayonsModal>
  );
}

BadgeModal.protoTypes = {
  badge: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    badge_image: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};
