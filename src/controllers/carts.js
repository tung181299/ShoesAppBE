const Carts = require("../models/carts");

const getProductsByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const filter = {
      $and: [
        {
          userId: {
            $regex: userId,
            $options: "$i",
          },
        },
      ],
    };
    const products = await Carts.find(filter);
    if (products.length > 0) {
      res.status(200).json({
        total: products.length,
        products: products.reverse(),
      });
    } else {
      res.status(200).json({
        message: "No results",
        products,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error Occurred!",
    });
  }
};

const addProductToCart = async (req, res) => {
  try {
    const { userId, productId, productName, productBrand, image, price, quantity } =
      req.body;
    if (
      !userId ||
      !productId ||
      !productName ||
      !productBrand ||
      !image ||
      !quantity ||
      !price
    ) {
      res.status(400).json({ message: "Some field not null" });
    }
    let product = new Carts({
      userId,
      productId,
      productName,
      productBrand,
      image,
      quantity,
      price,
    });
    product.save();
    res.status(200).json({
      message: "Add product to cart successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: "An error Occurred!",
    });
  }
};

const removeProductByUserId = (req, res) => {
  try {
    let id = req.params.id;
    Carts.findByIdAndRemove(id).then(() => {
      res.json({
        message: "Deleted product from cart successfully!",
      });
    });
  } catch (error) {
    res.json({
      message: "Deleted product from cart unsuccessfully!",
    });
  }
};

module.exports = {
  getProductsByUserId,
  addProductToCart,
  removeProductByUserId,
};
