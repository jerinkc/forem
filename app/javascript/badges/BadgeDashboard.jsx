import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import { CategoryBadges } from './CategoryBadges';
import { BadgeModal } from './Modal';

export function BadgeDashboard() {
  const [badges, setBadges] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState();
  const [selectedBadge, setSelectedBadge] = useState();

  useEffect(() => {
    const allBadgesCategory = { id: null, name: 'All Badges' };
    const container = document.getElementById('badges-container');
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const dataBadges = JSON.parse(container.dataset.badges);
    const dataCategories = JSON.parse(container.dataset.categories);
    const paramBadgeSlug = slugify(urlParams.get('badge'));
    const badgeFromParamSlug = dataBadges.find(
      (badge) => badge.slug == paramBadgeSlug,
    );

    setBadges(dataBadges);
    setCategories([allBadgesCategory, ...dataCategories]);
    setCurrentCategory(allBadgesCategory);
    setSelectedBadge(badgeFromParamSlug);
  }, []);

  const slugify = (str) => {
    return String(str)
      .normalize('NFKD') // split accented characters into their base characters and diacritical marks
      .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
      .trim() // trim leading or trailing whitespace
      .toLowerCase() // convert to lowercase
      .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
      .replace(/\s+/g, '-') // replace spaces with hyphens
      .replace(/-+/g, '-'); // remove consecutive hyphens
  };

  const currentCategoryBadges = () => {
    if (!currentCategory.id) return badges;

    return badges.filter(
      (badge) => badge.badge_category_id == currentCategory.id,
    );
  };

  const reorderBadges = (orderByKey) => {
    const badgesCopy = [...badges];
    const sortFunctions = {
      recent: () =>
        badgesCopy.sort(
          (badge1, badge2) =>
            new Date(badge2.created_at) - new Date(badge1.created_at),
        ),
      alphabetical: () =>
        badgesCopy.sort((badge1, badge2) =>
          badge1.title.localeCompare(badge2.title),
        ),
    };

    const updatedOrder = sortFunctions[orderByKey]
      ? sortFunctions[orderByKey]()
      : badgesCopy;
    setBadges(updatedOrder);
  };

  const handleBadgeSelection = (badge) => {
    setSelectedBadge(badge);
  };

  const handleBadgeModalClose = () => {
    setSelectedBadge(null);
  };

  const handleCategorySelectKeyDown = ({ event, category }) => {
    if (event.key === 'Enter') {
      setCurrentCategory(category);
    }
  };

  return (
    <Fragment>
      {selectedBadge ? (
        <BadgeModal badge={selectedBadge} onClose={handleBadgeModalClose} />
      ) : null}
      <nav
        className="-mx-3 m:mx-0 s:flex items-center justify-between pl-1"
        aria-label="View badges by"
      >
        <ul className="crayons-navigation crayons-navigation--horizontal fw-t">
          {categories.map((category) => {
            return (
              <li key={category.id}>
                <span
                  role="button"
                  tabIndex="0"
                  onClick={() => setCurrentCategory(category)}
                  onKeyDown={(event) =>
                    handleCategorySelectKeyDown({ event, category })
                  }
                  className={`crayons-navigation__item cursor-pointer
                      ${
                        currentCategory.id === category.id
                          ? ' crayons-navigation__item--current'
                          : ''
                      }`}
                >
                  {category.name}
                </span>
              </li>
            );
          })}
        </ul>
      </nav>
      {currentCategory ? (
        <CategoryBadges
          category={currentCategory}
          badges={currentCategoryBadges()}
          onSortOrderChange={reorderBadges}
          onBadgeSelection={handleBadgeSelection}
        />
      ) : null}
    </Fragment>
  );
}
