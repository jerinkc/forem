class BadgesController < ApplicationController
  def index
    @badges = Badge.order(created_at: :desc)
      .to_json(only: %i[title slug description badge_image created_at badge_category_id])
    @badge_categories = BadgeCategory.order(:name)
      .where.not(badges: nil)
      .to_json(only: %i[id name description])
  end
end
