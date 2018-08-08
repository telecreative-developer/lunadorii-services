const reportsDefinition = [
	{
		report_id: { column: "report_id", id: true },
		name: { column: "name" },
		email: { column: "email" },
		subject: { column: "report_subject" },
		content: { column: "report_content" },
		read: { column: "read" },
		created_at: { column: "report_created_at" },
		updated_at: { column: "report_updated_at" },
		reply: [
			{
				report_reply_id: { column: "report_reply_id", id: true },
				subject: { column: "report_reply_subject" },
				content: { column: "report_reply_content" },
				created_at: { column: "report_reply_created_at" },
				updated_at: { column: "report_reply_updated_at" }
			}
		]
	}
]

module.exports = reportsDefinition
