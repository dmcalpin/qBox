test "extending default settings", ->
	qBox = new QBox({
		html: "yay!"
	})
	settings = qBox.settings()

	# expect 1 assertion
	expect 1

	equal settings.html, "yay!"

test "showing the modal", ->
	qBox = new QBox({
		html: "yay!"
	})

	expect 2

	# the modal element is NOT on the page
	element = document.getElementsByClassName("qb-mask")
	equal element.length, 0

	qBox.show()

	# the modal element IS on the page
	element = document.getElementsByClassName("qb-mask")
	equal element.length, 1

	# cleanup
	qBox.hide()

test "hiding the modal", ->
	qBox = new QBox({
		html: "yay!"
	})
	qBox.show()

	expect 2

	# the modal element IS on the page
	element = document.getElementsByClassName("qb-mask")
	equal element.length, 1

	qBox.hide()

	# the modal element is NOT on the page
	element = document.getElementsByClassName("qb-mask")
	equal element.length, 0