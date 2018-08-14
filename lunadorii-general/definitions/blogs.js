const blogCategoriesDefinition = [
	{
		blog_category_id: { column: "blog_category_id", id: true },
		title: { column: "blog_category_title" },
		slug: { column: "blog_category_slug" },
		blogs: [
			{
				blog_id: { column: "blog_id", id: true },
				title: { column: "blog_title" },
				thumbnail_url: { column: "blog_thumbnail_url" },
				content: { column: "blog_content" },
				created_at: { column: "created_at" },
				updated_at: { column: "updated_at" }
			}
		]
	}
]

const blogsDefinition = [
	{
		blog_id: { column: "blog_id", id: true },
		title: { column: "blog_title" },
		thumbnail_url: { column: "blog_thumbnail_url" },
		content: { column: "blog_content" },
		created_at: { column: "created_at" },
		updated_at: { column: "updated_at" },
		blog_categories: [
			{
				blog_category_id: { column: "blog_category_id", id: true },
				title: { column: "blog_category_title" },
				slug: { column: "blog_category_slug" }
			}
		]
	}
]

module.exports = { blogCategoriesDefinition, blogsDefinition }
