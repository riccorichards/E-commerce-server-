import ProductsSchema from "../moduls/Product.js";


export const getProducts = async (req, res) => {
	const qNew = req.query.new
	const qCategory = req.query.Category
	try {
		if (qNew) {
			const products = await ProductsSchema.find().sort({ createdAt: -1 }).limit(1)
			return res.json(products)
		} else if (qCategory) {
			console.log(qCategory)
			const products = await ProductsSchema.find({ category: { $in: [qCategory] } })
			return res.json(products)
		} else {
			const products = await ProductsSchema.find()
			return res.json(products)
		}

	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: "Something wents wrong..." })
	}
}

export const OneProduct = async (req, res) => {
	const productId = req.params.id
	try {
		const product = await ProductsSchema.findById(productId)

		res.status(200).json(product)
	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: "Something wents wrong..." })
	}
}

export const createProducts = async (req, res) => {
	const produts = req.body;
	try {
		const doc = new ProductsSchema(produts)

		await doc.save()

		res.status(201).json(doc)
	} catch (err) {
		if (err.keyPattern.title > 0) {
			return res.status(404).json({ message: "Product the same name is alredy exist" })
		}
		return res.status(500).json({ message: "Something wents wrong..." })
	}
}

export const deleteProducts = async (req, res) => {
	const deleteId = req.params.id
	try {
		await ProductsSchema.findByIdAndDelete(deleteId)
		res.status(200).json({ message: "Product successfully deleted..." })
	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: "Something wents wrong..." })
	}
}

export const updateProducts = async (req, res) => {
	const productId = req.params.id
	const updating = req.body
	try {
		const updated = await ProductsSchema.findByIdAndUpdate(productId, {
			$set: updating
		}, { new: true })
		res.status(200).json(updated)
	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: "Something wents wrong..." })
	}
}