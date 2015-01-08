require 'spec_helper'

describe Blog do
  it 'has a valid factory' do
    expect(FactoryGirl.create(:blog)).to be_valid
  end

  it 'has a path' do
    expect(FactoryGirl.build(:blog, path: nil)).to_not be_valid
  end

  it 'has a title' do
    expect(FactoryGirl.build(:blog, title: nil)).to_not be_valid
  end

  it 'caps path length at 30' do
    path = '1234567890123456789012345678901'
    expect(FactoryGirl.build(:blog, path: path)).to_not be_valid
  end
end
