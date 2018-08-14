const careerCategoriesDefinition = [
	{
		career_category_id: { column: "career_category_id", id: true },
		title: { column: "career_category_title" },
		slug: { column: "career_category_slug" },
		careers: [
			{
				career_id: { column: "career_id", id: true },
				slug: { column: "career_slug" },
				title: { column: "career_title" },
				placement: { column: "career_placement" },
				description: { column: "career_description" }
			}
		]
	}
]

const careersDefinition = [
	{
		career_id: { column: "career_id", id: true },
		slug: { column: "career_slug" },
		title: { column: "career_title" },
		placement: { column: "career_placement" },
		description: { column: "career_description" },
		career_categories: [
			{
				career_category_id: { column: "career_category_id", id: true },
				title: { column: "career_category_title" },
				slug: { column: "career_category_slug" }
			}
		]
	}
]

module.exports = { careerCategoriesDefinition, careersDefinition }
