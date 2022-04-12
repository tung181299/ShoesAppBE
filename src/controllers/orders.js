const Orders = require("../models/orders");

const getOrders = async (req, res) => {
  try {
    const {
      pageSize = 100,
      pageNumber = 1,
      productName = "",
      productBrand = "",
      orderByColumn,
      orderByDirection = "desc",
    } = req.query;
    const filter = {
      $and: [
        {
          productName: {
            $regex: productName,
            $options: "$i",
          },
        },
        {
          productBrand: {
            $regex: productBrand,
            $options: "$i",
          },
        },
      ],
    };
    const orders = await Orders.find(filter)
      .sort(`${orderByDirection === "asc" ? "" : "-"}${orderByColumn}`)
      .limit(pageSize * 1)
      .skip((pageNumber - 1) * pageSize);

    const allOrders = await Orders.find(filter);
    let totalPage = 0;
    if ((allOrders.length / pageSize) % pageSize === 0) {
      totalPage = allOrders.length / pageSize;
    } else {
      totalPage = parseInt(allOrders.length / pageSize) + 1;
    }

    if (orders.length > 0) {
      res.status(200).json({
        total: orders.length,
        totalPage: totalPage,
        orders: orders.reverse(),
      });
    } else {
      res.status(200).json({
        message: "No results",
        orders,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error Occurred!",
    });
  }
};

const getOrderById = (req, res) => {
  try {
    const id = req.params.id;
    Orders.findById(id).then((response) => {
      res.json({
        response,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "An error Occurred!",
    });
  }
};

const addOrder = async (req, res) => {
  try {
    const {
      customerName,
      email,
      phone,
      address,
      productId,
      productName,
      productBrand,
      quantity,
    } = req.body;
    if (
      !customerName ||
      !email ||
      !phone ||
      !address ||
      !productId ||
      !productName ||
      !productBrand ||
      !quantity
    ) {
      res.status(400).json({ message: "Some field not null" });
    }
    let order = new Orders({
      customerName,
      email,
      phone,
      address,
      productId,
      productName,
      productBrand,
      quantity,
      orderStatus: 1,
    });
    order.save();
    res.status(200).json({
      message: "Add order successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: "An error Occurred!",
    });
  }
};

const editOrderStatus = (req, res) => {
  try {
    const { orderStatus } = req.body;
    let id = req.params.id;
    if (!orderStatus) {
      res.status(400).json({ message: "Order status not null" });
    }
    Orders.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(
      (data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Order with id=${id}. Maybe Order was not found!`,
          });
        } else res.send({ message: "Order was updated successfully." });
      }
    );
  } catch (error) {
    res.status(500).json({
      message: "An error Occurred!",
    });
  }
};

const removeOrder = (req, res) => {
  try {
    let id = req.params.id;
    Orders.findByIdAndRemove(id).then(() => {
      res.json({
        message: "Order Deleted Successfully!",
      });
    });
  } catch (error) {
    res.json({
      message: "Order Deleted Unsuccessfully!",
    });
  }
};

module.exports = {
  getOrders,
  getOrderById,
  addOrder,
  editOrderStatus,
  removeOrder,
};
