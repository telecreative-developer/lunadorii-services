const addressesDefinition = [
  {
    user_address_id: { column: "user_address_id", id: true },
    label: { column: "label" },
    recepient: { column: "recepient" },
    phone: { column: "phone" },
    longitude: { column: "longitude" },
    latitude: { column: "latitude" },
    city_id: { column: "city_id", id: true },
    city: { column: "city" },
    province_id: { column: "province_id", id: true },
    province: { column: "province" },
    postal_code: { column: "postal_code" },
    detail_address: { column: "detail_address" },
    address_default: { column: "address_default" },
    created_at: { column: "created_at" },
    updated_at: { column: "updated_at" }
  }
]

module.exports = addressesDefinition
