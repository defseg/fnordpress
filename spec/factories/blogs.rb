FactoryGirl.define do
  factory :blog do
    path Faker::Lorem.word
    title Faker::Company.name
    tagline Faker::Company.catch_phrase
  end
end
