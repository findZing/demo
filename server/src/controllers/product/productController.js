
import db from '../../models'
import { Op } from 'sequelize'
// import uniqid from 'uniqid';
import { v4 } from 'uuid';

const productController = {
    getAllProducts: async (req, res) => {
        try {
            const response = await db.Product.findAll({
                raw: true,
                nest: true,
                include: [
                    {model: db.Image, as: 'images', attributes: ['image']}
                ],
                attributes: ['id','name','price','store','imageId']
            })

            // const res = await db.Image.findOne({
            //     where: {imageId: 0},
            //     raw: true
            // })
            console.log(response[0].images.image)
            res.status(200).json({
                err: 0,
                response
            })
        } catch (err) {
            res.status(200).json(err)
        }
    },
    setProduct: async (req, res) => {
        try {
            const checkProduct = await db.Product.findOne({
                where: {name: req.body.name},
                raw: true
            })

            if(checkProduct) return res.status(404).json('Product has been created')

            const id = v4()
            const newProduct = await db.Product.create({
                name: req.body.name,
                price: req.body.price,
                store: req.body.store,
                imageId: id,
            })
            
            // console.log(req.body.image)
            // const array = req.body.image.trim().substr(1, req.body.image.length - 2)
            // const images = array.split(',')
            // console.log(images)

            const images = req.body.image

            images.map(async (item) => {
                console.log(typeof item)
                await db.Image.create({
                    // id,
                    image: item,
                    imageId: id
                })
            })

            return res.status(200).json({
                err: 0,

            })
        } catch (err) {
            res.status(200).json(err)
        }
    },
    updateProduct: async (req, res) => {
        try {
            const checkProduct = await db.Product.findOne({
                where: {name: req.body.name},
                raw: true
            })

            if(checkProduct) return res.status(404).json('Product has been created')

            const id = v4()
            await db.Image.destroy({
                where: {imageId: req.body.imageId}
            })

            const newProduct = await db.Product.update({
                name: req.body.name,
                price: req.body.price,
                store: req.body.store,
                imageId: id,
            },{where: {id: req.body.id}})

            const images = req.body.image

            images.map(async (item) => {
                console.log(typeof item)
                await db.Image.create({
                    // id,
                    image: item,
                    imageId: id
                })
            })

            return res.status(200).json({
                err: 0,

            })
        } catch (err) {
            res.status(200).json(err)
        }
    },
    deleteProduct: async (req, res) => {
        try {
            await db.Image.destroy({
                where: {imageId: req.body.imageId}
            })

            await db.Product.destroy({
                where: {id: req.body.id}
            })

            return res.status(200).json({
                err: 0,
            })

        } catch (err) {
            res.status(200).json(err)
            
        }
    },
    getProduct: async (req, res) => {
        try {
            const id = req.query.productId

            const product = await db.Product.findOne({where: {id}})
            
            res.status(200).json({
                product
            })
        } catch (err) {
            res.status(200).json(err)
        }
    },
    getAllImagesProduct: async (req, res) => {
        try {
            const allImages = await db.Image.findAll({
                raw: true,
                nest: true,
                where: {
                    imageId: req.body.imageId
                },
                attributes: ['image']
            })

            res.status(200).json({
                images: allImages
            })
        } catch (err) {
            res.status(500).json(err)
        }
    },
    searchProduct: async (req, res) => {
        const name = req.query.name

        try {
            const response = await db.Product.findAll({
                raw: true,
                nest: true,
                where:{
                    name: {
                        [Op.substring]: name
                    }
                },
                include: [
                    {model: db.Image, as: 'images', attributes: ['image']}
                ],
                attributes: ['id','name','price','store','imageId']
            })

            
            // console.log(response[0].images.image)

            res.status(200).json({
                err: 0,
                response
            })
        } catch (err) {
            res.status(200).json(err)
        }
    }
}

export default productController