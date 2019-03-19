8.times do 
  department = Department.create(
    name: Faker::Commerce.department)
    25.times do
      Item.create(
        name: Faker::Commerce.product_name,
        price: Faker::Commerce.price.to_f,
        description: Faker::Lorem.sentence,
        department_id: department.id)
    end
  end
  puts "8 departments seeded with 25 items each."
