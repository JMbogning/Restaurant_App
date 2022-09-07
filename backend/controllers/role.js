const asyncHandler = require("express-async-handler");
const Role = require("../models").Role;
const { Op } = require("sequelize");


//@desc     Create a role
//@route    POST /api/roles
//@access   Private/user
exports.createRole = asyncHandler(async (req, res) => {
    const name = req.body.name;
    const createdRole = await Role.create({ name });
    res.status(201).json(createdRole);
});

//@desc     Get all roles with pagination
//@route    GET /api/roles
//@access   Private/user
exports.getRoles = asyncHandler(async (req, res) => {
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword ? req.query.keyword : null;

    /* SEARCH OPTIONS */
    let options = {
        attributes: {
            exclude: ["updatedAt"],
        },
        offset: pageSize * (page - 1),
        limit: pageSize,
    };

    /* CHECK IF THERE IS A KEYWORD */
    if (keyword) {
        options = {
            ...options,
            where: {
                [Op.or]: [
                    { id: { [Op.like]: `%${keyword}%` } },
                    { name: { [Op.like]: `%${keyword}%` } },
                ],
            },
        };
    }

    /* QUERY */
    const count = await Role.count({ ...options });
    const roles = await Role.findAll({
        ...options,
    });

    /* RESPONSE */
    res.json({ roles, page, pages: Math.ceil(count / pageSize) });
});
