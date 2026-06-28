const { PRODUCTS_DB } = require('../../models/ProductModel')

exports.getProducts = async () => {
    const allProducts = await PRODUCTS_DB.find({})
    return { status: 200, Products: allProducts }
}

exports.addProduct = async (productData, imageurl) => {
    const findProduct = await PRODUCTS_DB.findOne({ PRODUCT_id: productData.PRODUCT_id })
    if (findProduct) {
        return { status: 409, message: 'already exist' }
    }

    const addproduct = await PRODUCTS_DB({ ...productData, Status: 'available', Product_img_url: `${imageurl}`, uploaded_at: 'Latest' })
    await addproduct.save()

    await PRODUCTS_DB.updateOne({ PRODUCT_id: productData.PRODUCT_id }, {
        $set: {
            Colors: [{
                img_url: imageurl,
                color: productData.Product_Color,
                hexcode: productData.Product_Hexcode,
                stocks: productData.stocks
            }]
        }
    })

    return { status: 200, message: 'Sucess' }
}

exports.addColor = async (productData, imageurl) => {
    const findp = await PRODUCTS_DB.findOne({ PRODUCT_id: productData.PRODUCT_id })
    if (!findp) return { status: 404, message: 'Product Does not exist' }

    await PRODUCTS_DB.updateOne(
        { PRODUCT_id: productData.PRODUCT_id },
        {
            $push: {
                Colors: {
                    img_url: `${imageurl}`,
                    color: productData.color,
                    hexcode: productData.hexcode,
                    stocks: productData.stocks
                }
            }
        }
    );

    return { status: 200, message: 'Updated' }
}

exports.updateProducts = async ({ values, id }) => {
    await PRODUCTS_DB.updateOne({ PRODUCT_id: id }, {
        $set: {
            Product_name: values.product_name,
            Price: values.price,
            Discounted_Price: values.discounted_price
        }
    })
    return { status: 200 }
}
