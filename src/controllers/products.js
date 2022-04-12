const Products = require("../models/products");

const addProduct = async (req, res, next) => {
  try {
    const { name, brand, price, type, quantity } = req.body;
    if (!name || !brand || !type || !price || !quantity) {
      res.status(400).json({ message: "Some fields not null" });
    }
    let product = new Products(req.body);
    product.save().then((response) => {
      res.json({
        message: "Added product Successfully!",
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "An error Occurred!",
    });
  }
};

const getProducts = async (req, res, next) => {
  try {
    const {
      pageSize = 100,
      pageNumber = 1,
      name = "",
      brand = "",
      type = "",
      orderByColumn,
      orderByDirection = "desc",
    } = req.query;
    const filter = {
      $and: [
        {
          name: {
            $regex: name,
            $options: "$i",
          },
        },
        {
          brand: {
            $regex: brand,
            $options: "$i",
          },
        },
        {
          type: {
            $regex: type,
            $options: "$i",
          },
        },
      ],
    };
    const products = await Products.find(filter)
      .sort(`${orderByDirection === "asc" ? "" : "-"}${orderByColumn}`)
      .limit(pageSize * 1)
      .skip((pageNumber - 1) * pageSize);
    const allProducts = await Products.find(filter);
    let totalPage = 0;
    if ((allProducts.length / pageSize) % pageSize === 0) {
      totalPage = allProducts.length / pageSize;
    } else {
      totalPage = parseInt(allProducts.length / pageSize) + 1;
    }

    if (products.length > 0) {
      res.status(200).json({
        total: products.length,
        totalPage: totalPage,
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

const getProductById = async (req, res, next) => {
  try {
    const productID = req.params.id
    Products.findById(productID)
      .then(response => {
        res.json({
          response
        })
      })
  } catch (error) {
    res.status(500).json({
      message: 'An error Occurred!'
    })
  }
};

const editProduct = (req, res, next) => {
  try {
    let productID = req.params.id;
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!",
      });
    }
    Products.findByIdAndUpdate(productID, req.body, {
      useFindAndModify: false,
    }).then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Product with id=${id}. Maybe Product was not found!`,
        });
      } else res.send({ message: "Updated product successfully." });
    });
  } catch (error) {
    res.status(500).json({
      message: "An error Occurred!",
    });
  }
};

const removeProductById = (req, res, next) => {
  try {
    const productID = req.params.id
    Products.findByIdAndRemove(productID).then(() => {
      res.json({
        message: "Deleted product successfully!",
      });
    });
  } catch (error) {
    res.json({
      message: "Deleted product unsuccessfully!",
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  editProduct,
  removeProductById,
};
