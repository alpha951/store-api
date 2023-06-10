const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
    const Products = await Product.find({ featured: true });
    res.status(200).json({ msg: 'Product Testiing static route Hit', data: Products });
}

const getAllProducts = async (req, res) => {

    const { featured, company, name, sort, fields, numericFilters } = req.query;
    console.log(featured)
    const customQuery = {};
    if (featured) {
        customQuery.featured = featured === 'true' ? true : false;
    }

    if (company) {
        customQuery.company = company;
    }

    if (name) {
        customQuery.name = { $regex: name, $options: 'i' }
    }


    if (numericFilters) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g;

        let filers = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`);

        console.log(filers)

        const options = ['price', 'rating'];

        filers = filers.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-');

            // check if the field is in the options array i.e, a valid field
            if (options.includes(field)) {
                /*
                square brackets ([]) can be used to access object properties dynamically. The expression customQuery[field] is using the value of the field variable as a key to access or set a property on the customQuery object
                Example :-
                //! Enhacned Object literals

                const keyName = 'name'
                const product = {
                    //! computed property keys
                    [keyName]: 'Mobile',
                    price: 100,
                    buy() {
                        console.log("Method defination shorthand!")
                    }
                }
                
                */
                customQuery[field] = { [operator]: Number(value) }
                console.log(customQuery)
                console.log(typeof customQuery)
            }
        })

        // if you want to pass as query parameters something like price < 50, price > 20 it won't work as expected. It will give back the products with price greater than 20. I solved the problem writing the code like that:
        // if (options.includes(field)) {
        //     if (customQuery[field]) {
        //         customQuery[field][operator] = Number(value)
        //     }
        //     else {
        //         customQuery[field] = { [operator]: Number(value) }
        //     }
        // }


    }

    let result = Product.find(customQuery);

    if (sort) {
        const sortList = sort.split(',').join(' ');  // 'price,name'=> 'price name'
        result = result.sort(sortList);
    }
    else {
        result = result.sort('createdAt');
    }

    if (fields) {
        const fieldsList = fields.split(',').join(' ');
        /* `result.select(fieldsList)` is a method in Mongoose that allows you to specify which fields
        to include or exclude in the query results. */
        result = result.select(fieldsList);
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);
    const Products = await result;

    res.status(200).json({ nbHits: Products.length, msg: 'Product route Hit', data: Products });
}

module.exports = { getAllProductsStatic, getAllProducts }