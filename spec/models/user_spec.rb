require 'spec_helper'

describe User do
  it "has a valid factory" do
    expect(FactoryGirl.create(:user)).to be_valid
  end

  it "requires a username" do
    expect(FactoryGirl.build(:user, username: nil)).to_not be_valid
  end

  it "requires an email address" do
    expect(FactoryGirl.build(:user, email: nil)).to_not be_valid
  end

  it "validates that the password is at least 6 characters long" do
    expect(FactoryGirl.build(:user, password: 'short')).to_not be_valid
  end

  it "can be found by its credentials" do
    mill = FactoryGirl.create(:user, username: "jsmill", password: "utility")
    expect(User.find_by_credentials("jsmill", "utility")).to eq(mill)
  end
end
