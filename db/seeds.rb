# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "Creating users..."
User.create(name: "Tam Nguyen", username: "admin", email: "ntamvl@gmail.com", password: "password", password_confirmation: "password")
User.create(name: "Duy Nguyen", username: "duy", email: "duynguyen@gmail.com", password: "password", password_confirmation: "password")
User.create(name: "Tam", username: "tam", email: "tam@gmail.com", password: "password", password_confirmation: "password")

(1..20).each do|index|
  puts "Creating... #{index}"
  User.create(name: "Tam #{index}", username: "tam_#{index}", email: "tam_#{index}@gmail.com", password: "password", password_confirmation: "password");
end
